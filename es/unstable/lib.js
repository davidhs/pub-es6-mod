/// <reference path="./lib.types.d.ts" />

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
 * Returns `true` if the input has the value of undefined.
 * 
 * @param {unknown} x
 */
export function isUndefined(x) {
  // Assumption: `typeof x` can only return a fixed set of strings thus I assume
  //             `typeof x === "undefined"` can optimized so it doesn't do a
  //             string comparison.
  return typeof x === "undefined";
}

/**
 * Returns `true` if the input is a null.
 * 
 * @param {unknown} x
 */
export function isNull(x) {
  return x === null;
}

/**
 * Returns `true` if the input is a boolean.
 * 
 * @param {unknown} x
 */
export function isBoolean(x) {
  // Assumption: `typeof x` can only return a fixed set of strings thus I assume
  //             `typeof x === "boolean"` can optimized so it doesn't do a
  //             string comparison.
  return typeof x === "boolean";
}

/**
 * Returns `true` if the input is truthy.
 * 
 * @param {unknown} x
 */
export function isTruthy(x) {
  return !!x;
}

/**
 * Returns `true` if the input is falsy.
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
 * Returns `true` if the input is a string.
 * 
 * @param {unknown} x
 */
export function isString(x) {
  // Assumption: `typeof x` can only return a fixed set of strings thus I assume
  //             `typeof x === "strings"` can optimized so it doesn't do a
  //             string comparison.
  return typeof x === "string";
}

/**
 * Returns `true` if the input is an array.
 * 
 * @param {unknown} x
 */
export function isArray(x) {
  return Array.isArray(x);
}

/**
 * Returns `true` if the input is an object such that it is not `null` and not an array.
 * 
 * @param {unknown} x
 */
export function isObject(x) {
  // Assumption: `typeof x` can only return a fixed set of strings thus I assume
  //             `typeof x === "object"` can optimized so it doesn't do a
  //             string comparison.
  return typeof x === "object" && x !== null && !Array.isArray(x);;
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
  return Object.propertyIsEnumerable.call(x, v);
}

/**
 *
 * @param {unknown} x
 */
export function isNumber(x) {
  // Assumption: `typeof x` can only return a fixed set of strings thus I assume
  //             `typeof x === "number"` can optimized so it doesn't do a
  //             string comparison.
  return typeof x === "number" && Number.isFinite(x);
}

/**
 *
 * @param {unknown} x
 */
export function isNaN(x) {
  // Assumption: `typeof x` can only return a fixed set of strings thus I assume
  //             `typeof x === "number"` can optimized so it doesn't do a
  //             string comparison.
  return typeof x === "number" && Number.isNaN(x);
}

/**
 * Returns `true` if the input has the type of a function.
 * 
 * @param {unknown} x
 */
export function isFunction(x) {
  // Assumption: `typeof x` can only return a fixed set of strings thus I assume
  //             `typeof x === "function"` can optimized so it doesn't do a
  //             string comparison.
  return typeof x === "function";
}
