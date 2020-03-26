import { BufReader } from "https://deno.land/std/io/mod.ts";
import { TextProtoReader } from "https://deno.land/std/textproto/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";

/**
 * 
 * @param {unknown} condition 
 * @param {string=} message 
 * 
 * @throws
 */
function assert(condition, message = "Assertion failed!") {
  if (!condition) {
    console.error(message);
    throw new Error(message);
  }
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
 * Tests whether or not given directory exists or not.
 * 
 * @param {string} filePath 
 * 
 * @returns {Promise<boolean>}
 */
export async function filePathExists(filePath) {
  try {
    await Deno.lstat(filePath);
    return true;
  } catch (e) {
    return false;
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
 * @returns {Promise<string>}
 */
export async function readLine() {
  const tpr = new TextProtoReader(new BufReader(Deno.stdin));
  /** @type {string | Deno.EOF} */
  const line = await tpr.readLine();
  if (typeof line === "string") return line;
  else return "";
}

/**
 * 
 * @param {string} question 
 */
export async function prompt(question) {
  console.info(question);
  const answer = await readLine();
  return answer;
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
 * @param {string} sourcePath 
 * @param {string} targetPath 
 * @param {boolean=} overwrite 
 * @param {boolean=} recursive 
 */
export async function copyFile(sourcePath, targetPath, overwrite = false, recursive = false) {
  assert(await filePathExists(sourcePath), `Expected path to exist: ${sourcePath}`);

  if (await filePathExists(targetPath)) {
    if (!overwrite) {
      throw new Error(`Target path already exists and overwrite is not set to true: ${targetPath}`);
    } else {
      if (await isDirectory(targetPath)) {
        if (recursive) {
          await Deno.remove(targetPath, { recursive: true })
        } else {
          throw new Error(`Deleting directory, must set recursive to true: ${targetPath}`);
        }
      } else {
        await Deno.remove(targetPath)
      }
    }
  }

  // At this point `targetPath` should not exist!

  if (await isDirectory(sourcePath)) {
    if (!recursive) {
      throw new Error(`Source path is a directory and recursive is set to false: ${sourcePath}`);
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
        const answer = await prompt(`Delete directory ${dirPath} (${path.resolve(dirPath)})? (y/n)`)
        if (answer.trim() === "y") {
          await Deno.remove(dirPath, { recursive: true });
          return true;
        } else {
          return false;
        }
      }
    } else {
      throw new Error(`Expected dist to be a directory, but isn't.`)
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

