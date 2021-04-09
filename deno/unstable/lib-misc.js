import * as path from "https://deno.land/std/path/mod.ts";

/**
 *
 * @param {string} filePath
 */
export function resolveFilePath(filePath) {
  return path.resolve(filePath);
}
