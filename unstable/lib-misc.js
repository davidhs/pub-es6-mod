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

/**
 * a u b
 * 
 * @type {<A, B>(a: Set<A>, b: Set<B>) => Set<A | B>}
 *
 * @param {Set<any>} a
 * @param {Set<any>} b
 */
export function getSetUnion(a, b) {
  const union = new Set([...a, ...b]);
  return union;
}

/**
 * a n b
 *
 * @param {Set<any>} a
 * @param {Set<any>} b
 */
export function getSetIntersection(a, b) {
  const intersection = new Set([...a].filter((x) => b.has(x)));
  return intersection;
}

/**
 * a - b OR a \ b
 *
 * @param {Set<any>} a
 * @param {Set<any>} b
 */
export function getSetDifference(a, b) {
  const difference = new Set([...a].filter((x) => !b.has(x)));
  return difference;
}

/**
 *
 * @param {Set<any>} a
 * @param {Set<any>} b
 */
export function getSetSymmetricDifference(a, b) {
  const x = getSetDifference(a, b);
  const y = getSetDifference(b, a);
  return getSetUnion(x, y);
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
 *
 * @param {string} str
 */
export function copyToClipboard(str) {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

// Throttle call to function

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
 * @param {string} filename
 * @param {string} text
 */
export function download(filename, text) {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

