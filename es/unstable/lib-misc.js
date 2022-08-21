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
  /** @type {undefined | number} */
  let timeoutID;
  return () => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
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

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

export function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

/**
 * 
 * @param {number} p 
 * @param {number} q 
 * @param {number} t 
 * @returns 
 */
export function hue2rgb(p, q, t) {
  if (t < 0) {
    t += 1;
  } else if (t > 1) {
    t -= 1;
  }

  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  } else if (t < 1 / 2) {
    return q;
  } else if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  } else {
    return p;
  }
}

/**
 * 
 * @param {number} h 
 * @param {number} s 
 * @param {number} l 
 * @returns 
 */
export function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * 
 * @param {number} r 
 * @param {number} g 
 * @param {number} b 
 * @returns 
 */
export function rgbToHex(r, g, b) {

  var rh = r.toString(16);
  rh = (rh.length < 2) ? "0" + rh : rh;

  var gh = g.toString(16);
  gh = (gh.length < 2) ? "0" + gh : gh;

  var bh = b.toString(16);
  bh = (bh.length < 2) ? "0" + bh : bh;

  return "#" + rh + gh + bh;
}

/**
 * 
 * @param {number} a 
 * @param {number} b 
 * @returns 
 */
export function hypot(a, b) {
  return Math.sqrt(a * a + b * b);
}

/**
 * 
 * @param {any} object 
 * @returns 
 */
export function listOwnObjects(object) {
  var list = [];
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      list.push(object[key]);
    }
  }
  return list;
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} x1 
 * @param {number} y1 
 * @param {number} x2 
 * @param {number} y2 
 * @returns 
 */
export function inRectangularBounds(x, y, x1, y1, x2, y2) {
  var t;

  if (x1 > x2) {
    t = x1;
    x1 = x2;
    x2 = t;
  }

  if (y1 > y2) {
    t = y1;
    y1 = y2;
    y2 = t;
  }

  return (x >= x1 && x <= x2) && (y >= y1 && y <= y2);
}

/**
 * 
 * @param {number | string} str 
 * @param {string} pad 
 * @returns 
 */
export function leftpad(str, pad) {
  return String(pad + str).slice(-pad.length);
}

/**
 * @template A
 * @param {undefined | A} x 
 * @returns 
 */
export function unwrap_undefined(x) {
  assert(x !== undefined);
  return x;
}



/**
 * @template A
 * @param {null | A} x 
 * @returns 
 */
export function unwrap_null(x) {
  assert(x !== null);
  return x;
}