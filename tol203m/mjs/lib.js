/**
 * If condition `condition` is falsy an exception is raise with the message
 * `message`.
 * 
 * @param {any} condition 
 * @param {string=} message 
 * 
 * @throws
 */
export function assert(condition, message) {
  if (!condition) throw new Error(message);
}
