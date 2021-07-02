import { assert, isPromise } from "../../es/unstable/lib.js";
import { formatDate, formatTime } from "../../es/unstable/lib-time.js";
import { resolveFilePath } from "./lib-misc.js";

import * as path from "https://deno.land/std/path/mod.ts";

/**
 *
 * @param {string} filePath
 */
 export function resolveFilePath(filePath) {
  return path.resolve(filePath);
}

/**
 * Reads file into string.
 * 
 * @param {string} filePath
 */
export async function readFileIntoString(filePath, encoding = "UTF-8") {
  const bytes = await Deno.readFile(filePath);
  const decoder = new TextDecoder(encoding);
  const s = decoder.decode(bytes);
  return s;
}

/**
 *
 * @param {string} sourcePath
 * @param {string} targetPath
 * @param {boolean=} overwrite
 * @param {boolean=} recursive
 * 
 * @throws
 */
export async function copyFile(sourcePath, targetPath, overwrite = false, recursive = false) {
  assert(
    await filePathExists(sourcePath),
    `Expected path to exist: ${sourcePath}`
  );

  if (await filePathExists(targetPath)) {
    if (!overwrite) {
      throw new Error(
        `Target path already exists and overwrite is not set to true: ${targetPath}`
      );
    } else {
      if (await isDirectory(targetPath)) {
        if (recursive) {
          await Deno.remove(targetPath, { recursive: true });
        } else {
          throw new Error(
            `Deleting directory, must set recursive to true: ${targetPath}`
          );
        }
      } else {
        await Deno.remove(targetPath);
      }
    }
  }

  // At this point `targetPath` should not exist!

  if (await isDirectory(sourcePath)) {
    if (!recursive) {
      throw new Error(
        `Source path is a directory and recursive is set to false: ${sourcePath}`
      );
    } else {
      await Deno.mkdir(targetPath);
      await copyDirContents(sourcePath, targetPath);
    }
  } else {
    // Is regular file
    await Deno.copyFile(sourcePath, targetPath);
  }
}

/**
 * Copies everything from directory at `sourceDirPath` into directory at
 * `targetDirPath`.
 *
 * @param {string} sourceDirPath
 * @param {string} targetDirPath
 * @param {boolean=} overwrite
 */
export async function copyDirContents(sourceDirPath, targetDirPath, overwrite) {
  assert(await filePathExists(sourceDirPath));
  assert(await isDirectory(sourceDirPath));
  assert(await filePathExists(targetDirPath));
  assert(await isDirectory(targetDirPath));

  const filePaths = await listDirectory(sourceDirPath);

  for (const filePath of filePaths) {
    const sourceFilePath = path.join(sourceDirPath, filePath);
    const targetFilePath = path.join(targetDirPath, filePath);
    await copyFile(sourceFilePath, targetFilePath, overwrite, true);
  }
}

/**
 * Returns `true` if directory didn't exist or was able to delete directory,
 * otherwise returns `false` if user didn't want to delete directory.
 *
 * @param {string} dirPath
 * @param {boolean=} force If `true`, does not ask user to delete directory.
 *
 * @throws If path is not a directory.
 */
export async function removeDirIfExists(dirPath, force = false) {
  if (await filePathExists(dirPath)) {
    if (await isDirectory(dirPath)) {
      if (force) {
        await Deno.remove(dirPath, { recursive: true });
        return true;
      } else {
        // Prompt use to delete directory
        const answer = await prompt(
          `Delete directory ${dirPath} (${path.resolve(dirPath)})? (y/n)`
        );
        if (answer.trim() === "y") {
          await Deno.remove(dirPath, { recursive: true });
          return true;
        } else {
          return false;
        }
      }
    } else {
      throw new Error(`Expected dist to be a directory, but isn't.`);
    }
  }

  return true;
}

/**
 *
 * @param {string} filePath
 * @param {string} text
 */
export async function writeFile(filePath, text) {
  const encoder = new TextEncoder();
  const file = await Deno.open(filePath, "a+");

  await file.write(encoder.encode(text));

  file.close();
}

/**
 *
 * @param {string} dirPath
 * @param {boolean=} includeDirPath
 */
export async function listDirectory(dirPath, includeDirPath = false) {
  /** @type {string[]} */
  const filePaths = [];

  const fileInfoList = await Deno.readDir(dirPath);

  for (const fileInfo of fileInfoList) {
    const { name } = fileInfo;
    if (typeof name === "string") {
      if (includeDirPath) filePaths.push(path.join(dirPath, name));
      else filePaths.push(name);
    }
  }

  return filePaths;
}

/**
 *
 * @param {string} filename
 *
 * @returns {Promise<string>}
 *
 * @throws
 */
export async function readFileToString(filename) {
  const decoder = new TextDecoder("utf-8");
  const bytes = await Deno.readFile(filename);
  const text = decoder.decode(bytes);
  return text;
}

/**
 * Checks whether a file exists.
 * 
 * @param {string} filePath
 */
 export async function exists(filePath) {
  try {
    // Attempt to resolve the file path to determine its existance.
    await Deno.lstat(filePath);
    return true;
  } catch (e) {
    // An exception is raised if the file doesn't exist, check
    // for that exception.
    if (e instanceof Deno.errors.NotFound) {
      return false;
    }

    // For all other exceptions, propagation error up.
    throw e;
  }
}

/**
 *
 * @param {string} filePath
 *
 * @returns {Promise<boolean>}
 */
export async function isDirectory(filePath) {
  const lstat = await Deno.lstat(filePath);
  return lstat.isDirectory();
}

/**
 * Walks a file system tree starting at `filePath` and for each node of
 * the tree the callback is invoked with the node.  If the callback
 * returns a promise then the promise is awaited before continuing.
 * 
 * The callback is supplied with the file path of the node, the lstat
 * information about it, the estimated walk progress and the depth of 
 * the node w.r.t. to the root `filePath`.
 * 
 * @typedef {{ filePath: string, info: Deno.FileInfo, progress: number, depth: number }} CallbackNode
 *
 * @param {string} filePath
 * @param {((node: CallbackNode) => void) | ((node: CallbackNode) => Promise<void>)} callback
 */
export async function walk(filePath, callback) {
  const cb = callback;

  // TODO: check if filePath even exists!

  const afp = resolveFilePath(filePath);

  /**
   *
   * @param {string} fp File path
   * @param {number} pf Progress from
   * @param {number} pt Progress to
   * @param {number} d Depth
   */
  async function internalWalk(fp, pf, pt, d) {
    const lstat = await Deno.lstat(fp);

    const result = cb({
      filePath: fp,
      info: lstat,
      progress: pf,
      depth: d,
    });

    if (isPromise(result)) {
      await result;
    }

    if (lstat.isDirectory()) {
      const fileInfoList = await Deno.readDir(fp);

      const n = fileInfoList.length;

      if (n > 0) {
        // Child progress increment
        const cpi = (pt - pf) / n;

        for (let i = 0; i < n; i += 1) {
          const fileInfo = fileInfoList[i];
          const { name } = fileInfo;
          const cfp = resolveFilePath(path.join(fp, name));

          const cpf = pf + i * cpi;
          const cpt = pf + (i + 1) * cpi;

          await internalWalk(cfp, cpf, cpt, d + 1);
        }
      }
    }
  }

  await internalWalk(afp, 0, 1, 0);
}

/**
 * Deduplicates files that have the same SHA2-256 digest.
 *
 * @param {string[]} targetFilePaths
 */
export async function dedup(targetFilePaths) {
  /**
   * Absolute file paths of files / folders THAT DO EXIST.
   *
   * @type {string[]}
   */
  const filePaths = [];

  {
    /** @type {Set<string>} */
    const dedupSet = new Set();

    // resolveFilePath
    for (const filePath of targetFilePaths) {
      /** @type {string} */
      const absoluteFilePath = resolveFilePath(filePath);
      assert(typeof absoluteFilePath === "string");

      if (!(await exists(absoluteFilePath))) continue;

      if (dedupSet.has(absoluteFilePath)) continue;

      // TODO: at some point find a way to remove entries which belong to other
      // entries here.

      dedupSet.add(absoluteFilePath);
    }

    const dedupArr = Array.from(dedupSet);
    dedupArr.forEach((filePath) => {
      filePaths.push(filePath);
    });
  }

  /** @type {Set<string>} */
  const hash_set = new Set();

  {
    const timeStarted = Date.now();

    const n = filePaths.length;

    for (let i = 0; i < n; i += 1) {
      const filePath = filePaths[i];

      await walk(filePath, async (node) => {
        const { filePath, info, progress } = node;

        if (info.isDirectory()) return;
        if (info.isSymlink()) return;

        const bytes = await Deno.readFile(filePath);
        const hasher = hashWithSHA2_256;
        const hash = hasher(bytes);

        const totalProgress = (progress + i) / n;

        const tps = `${(totalProgress * 100).toFixed(3)}%`;

        const timeNow = Date.now();

        const elapsedTime = timeNow - timeStarted;

        const estimatedTotalTime = elapsedTime / totalProgress;

        const estimatedTimeRemaining = estimatedTotalTime - elapsedTime;

        const estimatedTimeComplete = timeStarted + estimatedTotalTime;

        const etr = formatTime(estimatedTimeRemaining);

        const etc = formatDate(estimatedTimeComplete);

        const msg = `PROGRESS(${tps}), ETA(${etc}), ETE(${etr}), HASH(${hash}), FILEPATH(${filePath})`;

        if (hash_set.has(hash)) {
          console.info(`DEDUP, ${msg}`);
          await Deno.remove(filePath, { recursive: false });
        } else {
          console.info(`${msg}`);
          hash_set.add(hash);
        }
      });
    }
  }
}
