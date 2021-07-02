import { BufReader } from "https://deno.land/std/io/mod.ts";
import { TextProtoReader } from "https://deno.land/std/textproto/mod.ts";

/**
 * @returns {Promise<string>}
 */
export async function readLine() {
  const tpr = new TextProtoReader(new BufReader(Deno.stdin));
  ///** @type {string | Deno.EOF} */
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
