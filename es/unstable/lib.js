/// <reference path="lib.types.d.ts" />

// TODO: add the ability to check whether two items are equivalent and are identical.

/**
 *
 * @param {unknown} condition
 * @param {string=} message
 */
function assert_function(condition, message = "") {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

/**
 * Asserts the condition.  If the condition is falsy then the assertion fails
 * and an error is thrown with a given message.
 *
 * @param {any} condition If the condition is falsy then the assertion fails.
 * @param {string=} message The text to display if the assertion failed.
 * @returns {void}
 *
 * @type {declared_assert_function}
 */
// HACK: this is a hack so I can get `assert` to behave like a TypeScript
//       assertion function.  This is so I can use `assert(condition)` in my code and
//       get the same type checking I get when I would use
//       `if (!condition) throw new Error()`.
export const assert = assert_function;

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
export function isNull(x) {
  return x === null;
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
export function isString(x) {
  return typeof x === "string";
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
export function isObject(x) {
  return typeof x === "object" && !isArray(x) && !isNull(x);
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
  return {}.propertyIsEnumerable.call(x, v);
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
export function isNaN(x) {
  return typeof x === "number" && Number.isNaN(x);
}

/**
 *
 * @param {unknown} x
 */
export function isFunction(x) {
  return typeof x === "function";
}
