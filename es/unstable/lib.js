// TODO: add the ability to check whether two items are equivalent and are identical.

/**
 * 
 * @param {unknown} condition 
 * @param {string=} message 
 */
export function assert(condition, message = "Assertion failed!") {
  if (!condition) {
    throw new Error(message);
  }
}

/**
 * 
 * @param {unknown} x 
 */
export function isArray(x) {
  return Array.isArray(x);
}

/**
 * 
 * @param {unknown} x 
 */
export function isNull(x) {
  return x === null;
}

/**
 * 
 * @param {unknown} x 
 */
export function isPromise(x) {
  if (Promise && Promise.resolve) {
    return Promise.resolve(x) == x;
  } else {
    throw new Error("Promises not supported.");
  }
}

/**
 * 
 * @param {unknown} x 
 */
export function isUndefined(x) {
  return typeof x === "undefined";
}

/**
 * 
 * @param {unknown} x 
 */
export function isObject(x) {
  return (typeof x === "object") && !isArray(x) && !isNull(x);
}

/**
 * 
 * @param {unknown} x 
 */
export function isString(x) {
  return typeof x === "string";
}

/**
 * 
 * @param {unknown} x 
 */
export function isNaN(x) {
  return typeof x === "number" && Number.isNaN(x);
}

/**
 * 
 * @param {unknown} x 
 */
export function isNumber(x) {
  return typeof x === "number" && Number.isFinite(x);
}

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

/**
 * 
 * @param {any} target 
 */
export function isFunction(target) {
  return typeof target === "function";
}

/**
 * 
 * @param {unknown} x 
 */
export function isBoolean(x) {
  return typeof x === "boolean";
}

/**
 * 
 * @param {unknown} x 
 */
export function isTruthy(x) {
  return !!x;
}

/**
 * 
 * @param {unknown} x 
 */
export function isFalsy(x) {
  return !x;
}

/**
 * 
 * @param {unknown} x
 * @param {string|number|symbol} v 
 */
export function hasOwnProperty(x, v) {
  return Object.prototype.hasOwnProperty.call(x, v);
}

/**
 * 
 * @param {any} x 
 * @param {string|number|symbol} v 
 */
export function hasProperty(x, v) {
  return v in x;
}

/**
 * 
 * @param {unknown} x 
 * @param {Object} v 
 */
export function isPrototypeOf(x, v) {
  return Object.prototype.isPrototypeOf.call(x, v);
}

/**
 * 
 * @param {unknown} x 
 * @param {string|number|symbol} v 
 */
export function isEnumerable(x, v) {
  return {}.propertyIsEnumerable.call(x, v)
}
