/**
 * Takes a snapshot of the JSON element `element`, i.e. creates a copy of the
 * JSON element.
 *
 * @param {any} element
 * @param {any=} defaultValue
 *
 * @throws Will throw an error if `JSON.stringify` fails to stringify the
 * element `element`.
 */
export function snapshot(element, defaultValue = undefined) {
  if (typeof element === "undefined") {
    return defaultValue;
  }
  return JSON.parse(JSON.stringify(element));
}

/**
 * If `source` and `target` are JavaScript objects (and not null) then
 * properties from `source` are inserted into `target`, and overwriting
 * pre-existing properties in `target` if they have the same property key.
 *
 * @param {any} source
 * @param {any} target
 */
export function mixin(source, target, overwrite = true) {
  if (typeof source !== "object" || source === null) {
    return;
  }

  if (typeof target === "object" && target !== null) {
    if (overwrite) {
      Object.keys(source).forEach((key) => {
        target[key] = source[key];
      });
    } else {
      throw new Error("Not implemented!");
    }
  }
}

/**
 *
 * @param {any} x
 */
export function isEmpty(x) {
  return typeof x === "undefined" || x === null;
}

/**
 *
 * @param {any} this
 * @param {() => void} fn
 * @param {number} ms
 */
export function debounce(this, fn, ms) {
  /** @type {number} */
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

/**
 *
 */
export function createEmittableMessenger() {
  /** @type {string[]} */
  const message = [];

  /**
   *
   * @param  {...any} args
   */
  function emit(...args) {
    for (let i = 0; i < args.length; ++i) {
      message.push("" + args[i]);
    }
  }

  /**
   *
   * @param  {...any} args
   */
  function emitln(...args) {
    for (let i = 0; i < args.length; ++i) {
      message.push("" + args[i] + "\n");
    }
  }

  return { message, emit, emitln };
}
