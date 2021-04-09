/**
 *
 * @param {unknown} x
 */
export function isInteger(x) {
  return typeof x === "number" && Number.isSafeInteger(x);
}

/**
 *
 * @param {unknown} x
 */
export function isNonNegativeInteger(x) {
  return isInteger(x) && x >= 0;
}

/**
 *
 * @param {unknown} x
 */
export function isNegativeInteger(x) {
  return isInteger(x) && x < 0;
}

/**
 *
 * @param {unknown} x
 */
export function isPositiveInteger(x) {
  return isInteger(x) && x > 0;
}
