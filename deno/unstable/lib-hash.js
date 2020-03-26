import { sha1 } from "https://deno.land/x/sha1/mod.ts";
import { sha256 } from "https://deno.land/x/sha256/mod.ts";
import { sha512 } from "https://deno.land/x/sha512/mod.ts";


/**
 * SHA1
 * 
 * NOT RECOMMENDED
 * 
 * shasum -a 1
 * 
 * @param {string} text 
 * @param {string=} encoding
 */
export function hashWithSHA1(text, encoding = "utf8") {
  return sha1(text, encoding, "hex");
}


/**
 * SHA2-256
 * 
 * shasum -a 256
 * 
 * @param {string} text 
 * @param {string=} encoding
 */
export function hashWithSHA2_256(text, encoding = "utf8") {
  return sha256(text, encoding, "hex");
}


/**
 * SHA2-512
 * 
 * shasum -a 512
 * 
 * @param {string} text 
 * @param {string=} encoding
 */
export function hashWithSHA2_512(text, encoding = "utf8") {
  return sha512(text, encoding, "hex");
}
