//////////////////////////////////////////////////////////////////////////////
//
//  Angel.js
//
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------
//
//  JSDoc type definitions
//

/**
 * 
 * @typedef {[number, number]} Vec2
 * @typedef {[number, number, number]} Vec3
 * @typedef {[number, number, number, number]} Vec4
 * @typedef {Vec2 | Vec3 | Vec4} RegVec
 * 
 * @typedef {number[] | RegVec} Vec
 * 
 * @typedef {[[number, number], [number, number]]} Pmat2
 * @typedef {[[number, number, number], [number, number, number], [number, number, number]]} Pmat3
 * @typedef {[[number, number, number, number], [number, number, number, number], [number, number, number, number], [number, number, number, number]]} Pmat4
 * 
 * @typedef {Pmat2 & { matrix: boolean }} Mat2
 * @typedef {Pmat3 & { matrix: boolean }} Mat3
 * @typedef {Pmat4 & { matrix: boolean }} Mat4
 * @typedef {Mat2 | Mat3 | Mat4} RegMat
 * 
 * @typedef {(number[][] & { matrix: boolean }) | RegMat} Mat
 * 
 */

//----------------------------------------------------------------------------
//
//  Helper functions
//

/**
 * 
 * @param {IArguments} args 
 */
function _argumentsToArray(args) {
  return [].concat.apply([], Array.prototype.slice.apply(args));
}

//----------------------------------------------------------------------------

/**
 * 
 * @param {number} degrees 
 */
export function radians(degrees) {
  return degrees * Math.PI / 180.0;
}

//----------------------------------------------------------------------------
//
//  Vector Constructors
//

/**
 * @returns {Vec2}
 */
export function vec2() {
  const result = _argumentsToArray(arguments);

  switch (result.length) {
    case 0: result.push(0.0);
    case 1: result.push(0.0);
  }

  return result.splice(0, 2);
}

/**
 * @returns {Vec3}
 */
export function vec3() {
  const result = _argumentsToArray(arguments);

  switch (result.length) {
    case 0: result.push(0.0);
    case 1: result.push(0.0);
    case 2: result.push(0.0);
  }

  return result.splice(0, 3);
}

/**
 * @return {Vec4}
 */
export function vec4() {
  const result = _argumentsToArray(arguments);

  switch (result.length) {
    case 0: result.push(0.0);
    case 1: result.push(0.0);
    case 2: result.push(0.0);
    case 3: result.push(1.0);
  }

  return result.splice(0, 4);
}

//----------------------------------------------------------------------------
//
//  Matrix Constructors
//

/**
 * @returns {Mat2}
 */
export function mat2() {
  const v = _argumentsToArray(arguments);

  /** @type {any} */
  let m = [];

  switch (v.length) {
    case 0:
      v[0] = 1;
    case 1:
      m = [
        vec2(v[0], 0.0),
        vec2(0.0, v[0])
      ];
      break;

    default:
      m.push(vec2(v)); v.splice(0, 2);
      m.push(vec2(v));
      break;
  }

  m.matrix = true;

  return m;
}

//----------------------------------------------------------------------------

/**
 * @returns {Mat3}
 */
export function mat3() {
  const v = _argumentsToArray(arguments);

  /** @type {any} */
  let m = [];

  switch (v.length) {
    case 0:
      v[0] = 1;
    case 1:
      m = [
        vec3(v[0], 0.0, 0.0),
        vec3(0.0, v[0], 0.0),
        vec3(0.0, 0.0, v[0])
      ];
      break;

    default:
      m.push(vec3(v)); v.splice(0, 3);
      m.push(vec3(v)); v.splice(0, 3);
      m.push(vec3(v));
      break;
  }

  m.matrix = true;

  return m;
}

//----------------------------------------------------------------------------

/**
 * @return {Mat4}
 */
export function mat4() {
  const v = _argumentsToArray(arguments);

  /** @type {any} */
  let m = [];

  switch (v.length) {
    case 0:
      v[0] = 1;
    case 1:
      m = [
        vec4(v[0], 0.0, 0.0, 0.0),
        vec4(0.0, v[0], 0.0, 0.0),
        vec4(0.0, 0.0, v[0], 0.0),
        vec4(0.0, 0.0, 0.0, v[0])
      ];
      break;

    default:
      m.push(vec4(v)); v.splice(0, 4);
      m.push(vec4(v)); v.splice(0, 4);
      m.push(vec4(v)); v.splice(0, 4);
      m.push(vec4(v));
      break;
  }

  m.matrix = true;

  return m;
}

//----------------------------------------------------------------------------
//
//  Generic Mathematical Operations for Vectors and Matrices
//


/**
 * @type {<T extends (Mat | Vec)>(u: T, v: T) => boolean}
 */
export function equal(param_u, param_v) {
  if (param_u.length != param_v.length) { return false; }

  if (param_u.hasOwnProperty("matrix")) {
    /** @type {any} */
    const obfs_u = param_u;
    
    /** @type {any} */
    const obfs_v = param_v;

    /** @type {Mat} */
    const u = obfs_u;

    /** @type {Mat} */
    const v = obfs_v;

    if (u.matrix && v.matrix) {
      for (var i = 0; i < u.length; ++i) {
        if (u[i].length != v[i].length) { return false; }
        for (var j = 0; j < u[i].length; ++j) {
          if (u[i][j] !== v[i][j]) { return false; }
        }
      }
    }
    else if (u.matrix && !v.matrix || !u.matrix && v.matrix) {
      return false;
    }
  } else {
    const u = param_u;
    const v = param_v;
    for (var i = 0; i < u.length; ++i) {
      if (u[i] !== v[i]) { return false; }
    }
  }

  return true;
}

//----------------------------------------------------------------------------

/** @type {<T extends (Vec | Mat)>(u: T, v: T) => T} */
export function add(u, v) {
  const result = [];

  // @ts-ignore
  if (u.matrix && v.matrix) {
    if (u.length != v.length) {
      throw "add(): trying to add matrices of different dimensions";
    }

    for (var i = 0; i < u.length; ++i) {
      // @ts-ignore
      if (u[i].length != v[i].length) {
        throw "add(): trying to add matrices of different dimensions";
      }
      result.push([]);

      // @ts-ignore
      for (var j = 0; j < u[i].length; ++j) {
        result[i].push(u[i][j] + v[i][j]);
      }
    }

    // @ts-ignore
    result.matrix = true;

    // @ts-ignore
    return result;
  }
  // @ts-ignore
  else if (u.matrix && !v.matrix || !u.matrix && v.matrix) {
    throw "add(): trying to add matrix and non-matrix variables";
  }
  else {
    if (u.length != v.length) {
      throw "add(): vectors are not the same dimension";
    }

    for (var i = 0; i < u.length; ++i) {
      // @ts-ignore
      result.push(u[i] + v[i]);
    }

    // @ts-ignore
    return result;
  }
}

//----------------------------------------------------------------------------

/** @type {<T extends (Vec | Mat)>(u: T, v: T) => T} */
export function subtract(u, v) {
  var result = [];

  // @ts-ignore
  if (u.matrix && v.matrix) {
    if (u.length != v.length) {
      throw "subtract(): trying to subtract matrices" +
      " of different dimensions";
    }

    for (var i = 0; i < u.length; ++i) {
      // @ts-ignore
      if (u[i].length != v[i].length) {
        throw "subtract(): trying to subtact matrices" +
        " of different dimensions";
      }
      result.push([]);
      // @ts-ignore
      for (var j = 0; j < u[i].length; ++j) {
        result[i].push(u[i][j] - v[i][j]);
      }
    }

    // @ts-ignore
    result.matrix = true;

    // @ts-ignore
    return result;
  }
  // @ts-ignore
  else if (u.matrix && !v.matrix || !u.matrix && v.matrix) {
    throw "subtact(): trying to subtact  matrix and non-matrix variables";
  }
  else {
    if (u.length != v.length) {
      throw "subtract(): vectors are not the same length";
    }

    for (var i = 0; i < u.length; ++i) {
      // @ts-ignore
      result.push(u[i] - v[i]);
    }

    // @ts-ignore
    return result;
  }
}

//----------------------------------------------------------------------------

/** @type {<T extends (Vec | Mat)>(u: T, v: T) => T} */
export function mult(u, v) {
  var result = [];

  // @ts-ignore
  if (u.matrix && v.matrix) {
    if (u.length != v.length) {
      throw "mult(): trying to add matrices of different dimensions";
    }

    for (var i = 0; i < u.length; ++i) {
      // @ts-ignore
      if (u[i].length != v[i].length) {
        throw "mult(): trying to add matrices of different dimensions";
      }
    }

    for (var i = 0; i < u.length; ++i) {
      result.push([]);

      for (var j = 0; j < v.length; ++j) {
        var sum = 0.0;
        for (var k = 0; k < u.length; ++k) {
          sum += u[i][k] * v[k][j];
        }
        result[i].push(sum);
      }
    }

    // @ts-ignore
    result.matrix = true;

    // @ts-ignore
    return result;
  }

  // @ts-ignore
  if (u.matrix && (u.length == v.length)) {
    for (var i = 0; i < v.length; i++) {
      var sum = 0.0;
      for (var j = 0; j < v.length; j++) {
        // @ts-ignore
        sum += u[i][j] * v[j];
      }
      result.push(sum);
    }
    // @ts-ignore
    return result;
  }

  else {
    if (u.length != v.length) {
      throw "mult(): vectors are not the same dimension";
    }

    for (var i = 0; i < u.length; ++i) {
      // @ts-ignore
      result.push(u[i] * v[i]);
    }

    // @ts-ignore
    return result;
  }
}

//----------------------------------------------------------------------------
//
//  Basic Transformation Matrix Generators
//

/**
 * 
 * @param {number | number[]} x 
 * @param {number=} y 
 * @param {number=} z 
 */
export function translate(x, y, z) {
  if (Array.isArray(x) && x.length == 3) {
    z = x[2];
    y = x[1];
    x = x[0];
  }

  var result = mat4();
  // @ts-ignore
  result[0][3] = x;
  result[1][3] = y;
  result[2][3] = z;

  return result;
}

//----------------------------------------------------------------------------

/**
 * 
 * @param {number} angle 
 * @param {number | number[]} axis 
 * @param {number=} optArg1 
 * @param {number=} optArg2 
 */
export function rotate(angle, axis, optArg1, optArg2) {
  if (!Array.isArray(axis)) {
    axis = [arguments[1], arguments[2], arguments[3]];
  }

  var v = normalize(axis);

  var x = v[0];
  var y = v[1];
  var z = v[2];

  var c = Math.cos(radians(angle));
  var omc = 1.0 - c;
  var s = Math.sin(radians(angle));

  var result = mat4(
    vec4(x * x * omc + c, x * y * omc - z * s, x * z * omc + y * s, 0.0),
    vec4(x * y * omc + z * s, y * y * omc + c, y * z * omc - x * s, 0.0),
    vec4(x * z * omc - y * s, y * z * omc + x * s, z * z * omc + c, 0.0),
    vec4()
  );

  return result;
}

/**
 * 
 * @param {number} theta 
 */
export function rotateX(theta) {
  var c = Math.cos(radians(theta));
  var s = Math.sin(radians(theta));
  var rx = mat4(1.0, 0.0, 0.0, 0.0,
    0.0, c, -s, 0.0,
    0.0, s, c, 0.0,
    0.0, 0.0, 0.0, 1.0);
  return rx;
}

/**
 * 
 * @param {number} theta 
 */
export function rotateY(theta) {
  var c = Math.cos(radians(theta));
  var s = Math.sin(radians(theta));
  var ry = mat4(c, 0.0, s, 0.0,
    0.0, 1.0, 0.0, 0.0,
    -s, 0.0, c, 0.0,
    0.0, 0.0, 0.0, 1.0);
  return ry;
}

/**
 * 
 * @param {number} theta 
 */
export function rotateZ(theta) {
  var c = Math.cos(radians(theta));
  var s = Math.sin(radians(theta));
  var rz = mat4(c, -s, 0.0, 0.0,
    s, c, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0);
  return rz;
}


//----------------------------------------------------------------------------

/**
 * 
 * @param {number | number[]} x 
 * @param {number=} y 
 * @param {number=} z 
 */
export function scalem(x, y, z) {

  /** @type {number} */
  let _x;

  if (Array.isArray(x)) {
    if (x.length == 3) {
      z = x[2];
      y = x[1];
      _x = x[0];
    }
  } else {
    _x = x;
  }

  const result = mat4();
  result[0][0] = _x;
  result[1][1] = y;
  result[2][2] = z;

  return result;
}

//----------------------------------------------------------------------------
//
//  ModelView Matrix Generators
//

/**
 * 
 * @param {Vec3} eye 
 * @param {Vec3} at 
 * @param {Vec3} up 
 */
export function lookAt(eye, at, up) {
  if (!Array.isArray(eye) || eye.length != 3) {
    throw "lookAt(): first parameter [eye] must be an a vec3";
  }

  if (!Array.isArray(at) || at.length != 3) {
    throw "lookAt(): first parameter [at] must be an a vec3";
  }

  if (!Array.isArray(up) || up.length != 3) {
    throw "lookAt(): first parameter [up] must be an a vec3";
  }

  if (equal(eye, at)) {
    return mat4();
  }

  let v = normalize(subtract(at, eye));  // view direction vector
  // @ts-ignore
  const n = normalize(cross(v, up));       // perpendicular vector
  // @ts-ignore
  const u = normalize(cross(n, v));        // "new" up vector

  v = negate(v);

  const result = mat4(
    vec4(n, -dot(n, eye)),
    vec4(u, -dot(u, eye)),
    vec4(v, -dot(v, eye)),
    vec4()
  );

  return result;
}

//----------------------------------------------------------------------------
//
//  Projection Matrix Generators
//

/**
 * 
 * @param {number} left 
 * @param {number} right 
 * @param {number} bottom 
 * @param {number} top 
 * @param {number} near 
 * @param {number} far 
 */
export function ortho(left, right, bottom, top, near, far) {
  if (left == right) { throw "ortho(): left and right are equal"; }
  if (bottom == top) { throw "ortho(): bottom and top are equal"; }
  if (near == far) { throw "ortho(): near and far are equal"; }

  const w = right - left;
  const h = top - bottom;
  const d = far - near;

  const result = mat4();
  result[0][0] = 2.0 / w;
  result[1][1] = 2.0 / h;
  result[2][2] = -2.0 / d;
  result[0][3] = -(left + right) / w;
  result[1][3] = -(top + bottom) / h;
  result[2][3] = -(near + far) / d;

  return result;
}

//----------------------------------------------------------------------------

/**
 * 
 * @param {number} fovy 
 * @param {number} aspect 
 * @param {number} near 
 * @param {number} far 
 */
export function perspective(fovy, aspect, near, far) {
  const f = 1.0 / Math.tan(radians(fovy) / 2);
  const d = far - near;

  const result = mat4();
  result[0][0] = f / aspect;
  result[1][1] = f;
  result[2][2] = -(near + far) / d;
  result[2][3] = -2 * near * far / d;
  result[3][2] = -1;
  result[3][3] = 0.0;

  return result;
}

//----------------------------------------------------------------------------
//
//  Matrix Functions
//

/**
 * @type {<T extends Mat>(m: T) => T}
 */
export function transpose(m) {
  if (!m.matrix) {
    throw new Error("transpose(): trying to transpose a non-matrix");
    // return "transpose(): trying to transpose a non-matrix";
  }

  /** @type {any} */
  const result = [];

  for (var i = 0; i < m.length; ++i) {
    result.push([]);
    for (var j = 0; j < m[i].length; ++j) {
      result[i].push(m[j][i]);
    }
  }

  result.matrix = true;

  return result;
}

//----------------------------------------------------------------------------
//
//  Vector Functions
//

/**
 * @type {<T extends Vec>(u: T, v: T) => number}
 */
export function dot(u, v) {
  if (u.length != v.length) {
    throw "dot(): vectors are not the same dimension";
  }

  var sum = 0.0;
  for (var i = 0; i < u.length; ++i) {
    sum += u[i] * v[i];
  }

  return sum;
}

//----------------------------------------------------------------------------

/**
 * 
 * @param {Vec} u 
 */
export function negate(u) {
  var result = [];
  for (var i = 0; i < u.length; ++i) {
    result.push(-u[i]);
  }

  return result;
}

//----------------------------------------------------------------------------

/**
 * 
 * @param {Vec3} u 
 * @param {Vec3} v 
 */
export function cross(u, v) {
  if (!Array.isArray(u) || u.length < 3) {
    throw "cross(): first argument is not a vector of at least 3";
  }

  if (!Array.isArray(v) || v.length < 3) {
    throw "cross(): second argument is not a vector of at least 3";
  }

  /** @type {Vec3} */
  const result = [
    u[1] * v[2] - u[2] * v[1],
    u[2] * v[0] - u[0] * v[2],
    u[0] * v[1] - u[1] * v[0]
  ];

  return result;
}

//----------------------------------------------------------------------------

/**
 * 
 * @param {Vec} u 
 */
export function length(u) {
  return Math.sqrt(dot(u, u));
}

//----------------------------------------------------------------------------

/**
 * 
 * @param {Vec} u 
 * @param {boolean=} excludeLastComponent 
 */
export function normalize(u, excludeLastComponent) {
  if (excludeLastComponent) {
    var last = u.pop();
  }

  var len = length(u);

  if (!isFinite(len)) {
    throw "normalize: vector " + u + " has zero length";
  }

  for (var i = 0; i < u.length; ++i) {
    u[i] /= len;
  }

  if (excludeLastComponent) {
    u.push(last);
  }

  return u;
}

//----------------------------------------------------------------------------

/**
 * @type {<T extends Vec>(u: T, v: T, s: number) => T}
 */
export function mix(u, v, s) {
  if (typeof s !== "number") {
    throw "mix: the last paramter " + s + " must be a number";
  }

  if (u.length != v.length) {
    throw "vector dimension mismatch";
  }

  var result = [];
  for (var i = 0; i < u.length; ++i) {
    result.push((1.0 - s) * u[i] + s * v[i]);
  }

  // @ts-ignore
  return result;
}

//----------------------------------------------------------------------------
//
// Vector and Matrix functions
//

/**
 * 
 * @param {number} s 
 * @param {Vec} u 
 */
export function scale(s, u) {
  if (!Array.isArray(u)) {
    throw "scale: second parameter " + u + " is not a vector";
  }

  var result = [];
  for (var i = 0; i < u.length; ++i) {
    result.push(s * u[i]);
  }

  return result;
}

//----------------------------------------------------------------------------
//
//
//

/**
 * TODO: type signature might be incorrect
 * 
 * @param {Vec | Mat | number[] | number[][]} v 
 */
export function flatten(v) {
  // @ts-ignore
  if (v.matrix === true) {
    // @ts-ignore
    v = transpose(v);
  }

  var n = v.length;
  var elemsAreArrays = false;

  if (Array.isArray(v[0])) {
    elemsAreArrays = true;
    n *= v[0].length;
  }

  var floats = new Float32Array(n);

  if (elemsAreArrays) {
    var idx = 0;
    for (var i = 0; i < v.length; ++i) {
      // @ts-ignore
      for (var j = 0; j < v[i].length; ++j) {
        floats[idx++] = v[i][j];
      }
    }
  }
  else {
    for (var i = 0; i < v.length; ++i) {
      // @ts-ignore
      floats[i] = v[i];
    }
  }

  return floats;
}

//----------------------------------------------------------------------------

export const sizeof = {
  'vec2': new Float32Array(flatten(vec2())).byteLength,
  'vec3': new Float32Array(flatten(vec3())).byteLength,
  'vec4': new Float32Array(flatten(vec4())).byteLength,
  'mat2': new Float32Array(flatten(mat2())).byteLength,
  'mat3': new Float32Array(flatten(mat3())).byteLength,
  'mat4': new Float32Array(flatten(mat4())).byteLength
};

// new functions 5/2/2015

// printing

/**
 * 
 * @param {RegMat} m 
 */
export function printm(m) {
  if (m.length == 2)
    for (var i = 0; i < m.length; i++)
      console.log(m[i][0], m[i][1]);
  else if (m.length == 3)
    for (var i = 0; i < m.length; i++)
      console.log(m[i][0], m[i][1], m[i][2]);
  else if (m.length == 4)
    for (var i = 0; i < m.length; i++)
      console.log(m[i][0], m[i][1], m[i][2], m[i][3]);
}
// determinants

/**
 * 
 * @param {Mat2} m 
 */
export function det2(m) {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

/**
 * 
 * @param {Mat3} m 
 */
export function det3(m) {
  const d = m[0][0] * m[1][1] * m[2][2]
    + m[0][1] * m[1][2] * m[2][0]
    + m[0][2] * m[2][1] * m[1][0]
    - m[2][0] * m[1][1] * m[0][2]
    - m[1][0] * m[0][1] * m[2][2]
    - m[0][0] * m[1][2] * m[2][1]
    ;
  return d;
}

/**
 * 
 * @param {Mat4} m 
 */
export function det4(m) {
  /** @type {Mat3} */
  // @ts-ignore
  const m0 = [
    vec3(m[1][1], m[1][2], m[1][3]),
    vec3(m[2][1], m[2][2], m[2][3]),
    vec3(m[3][1], m[3][2], m[3][3])
  ];
  /** @type {Mat3} */
  // @ts-ignore
  const m1 = [
    vec3(m[1][0], m[1][2], m[1][3]),
    vec3(m[2][0], m[2][2], m[2][3]),
    vec3(m[3][0], m[3][2], m[3][3])
  ];
  /** @type {Mat3} */
  // @ts-ignore
  const m2 = [
    vec3(m[1][0], m[1][1], m[1][3]),
    vec3(m[2][0], m[2][1], m[2][3]),
    vec3(m[3][0], m[3][1], m[3][3])
  ];
  /** @type {Mat3} */
  // @ts-ignore
  const m3 = [
    vec3(m[1][0], m[1][1], m[1][2]),
    vec3(m[2][0], m[2][1], m[2][2]),
    vec3(m[3][0], m[3][1], m[3][2])
  ];
  return m[0][0] * det3(m0) - m[0][1] * det3(m1)
    + m[0][2] * det3(m2) - m[0][3] * det3(m3);

}

/**
 * 
 * @param {RegMat} m 
 */
export function det(m) {
  if (m.matrix != true) console.log("not a matrix");
  if (m.length == 2) return det2(m);
  if (m.length == 3) return det3(m);
  if (m.length == 4) return det4(m);
}

//---------------------------------------------------------

// inverses

/** @type {<T extends Mat2>(m: T) => T} */
export function inverse2(m) {
  var a = mat2();
  var d = det2(m);
  a[0][0] = m[1][1] / d;
  a[0][1] = -m[0][1] / d;
  a[1][0] = -m[1][0] / d;
  a[1][1] = m[0][0] / d;
  a.matrix = true;
  // @ts-ignore
  return a;
}

/** @type {<T extends Mat3>(m: T) => T} */
export function inverse3(m) {
  var a = mat3();
  var d = det3(m);

  var a00 = [
    vec2(m[1][1], m[1][2]),
    vec2(m[2][1], m[2][2])
  ];
  var a01 = [
    vec2(m[1][0], m[1][2]),
    vec2(m[2][0], m[2][2])
  ];
  var a02 = [
    vec2(m[1][0], m[1][1]),
    vec2(m[2][0], m[2][1])
  ];
  var a10 = [
    vec2(m[0][1], m[0][2]),
    vec2(m[2][1], m[2][2])
  ];
  var a11 = [
    vec2(m[0][0], m[0][2]),
    vec2(m[2][0], m[2][2])
  ];
  var a12 = [
    vec2(m[0][0], m[0][1]),
    vec2(m[2][0], m[2][1])
  ];
  var a20 = [
    vec2(m[0][1], m[0][2]),
    vec2(m[1][1], m[1][2])
  ];
  var a21 = [
    vec2(m[0][0], m[0][2]),
    vec2(m[1][0], m[1][2])
  ];
  var a22 = [
    vec2(m[0][0], m[0][1]),
    vec2(m[1][0], m[1][1])
  ];

  // @ts-ignore
  a[0][0] = det2(a00) / d;
  // @ts-ignore
  a[0][1] = -det2(a10) / d;
  // @ts-ignore
  a[0][2] = det2(a20) / d;
  // @ts-ignore
  a[1][0] = -det2(a01) / d;
  // @ts-ignore
  a[1][1] = det2(a11) / d;
  // @ts-ignore
  a[1][2] = -det2(a21) / d;
  // @ts-ignore
  a[2][0] = det2(a02) / d;
  // @ts-ignore
  a[2][1] = -det2(a12) / d;
  // @ts-ignore
  a[2][2] = det2(a22) / d;

  // @ts-ignore
  return a;

}

/** @type {<T extends Mat4>(m: T) => T} */
export function inverse4(m) {
  var a = mat4();
  var d = det4(m);

  var a00 = [
    vec3(m[1][1], m[1][2], m[1][3]),
    vec3(m[2][1], m[2][2], m[2][3]),
    vec3(m[3][1], m[3][2], m[3][3])
  ];
  var a01 = [
    vec3(m[1][0], m[1][2], m[1][3]),
    vec3(m[2][0], m[2][2], m[2][3]),
    vec3(m[3][0], m[3][2], m[3][3])
  ];
  var a02 = [
    vec3(m[1][0], m[1][1], m[1][3]),
    vec3(m[2][0], m[2][1], m[2][3]),
    vec3(m[3][0], m[3][1], m[3][3])
  ];
  var a03 = [
    vec3(m[1][0], m[1][1], m[1][2]),
    vec3(m[2][0], m[2][1], m[2][2]),
    vec3(m[3][0], m[3][1], m[3][2])
  ];
  var a10 = [
    vec3(m[0][1], m[0][2], m[0][3]),
    vec3(m[2][1], m[2][2], m[2][3]),
    vec3(m[3][1], m[3][2], m[3][3])
  ];
  var a11 = [
    vec3(m[0][0], m[0][2], m[0][3]),
    vec3(m[2][0], m[2][2], m[2][3]),
    vec3(m[3][0], m[3][2], m[3][3])
  ];
  var a12 = [
    vec3(m[0][0], m[0][1], m[0][3]),
    vec3(m[2][0], m[2][1], m[2][3]),
    vec3(m[3][0], m[3][1], m[3][3])
  ];
  var a13 = [
    vec3(m[0][0], m[0][1], m[0][2]),
    vec3(m[2][0], m[2][1], m[2][2]),
    vec3(m[3][0], m[3][1], m[3][2])
  ];
  var a20 = [
    vec3(m[0][1], m[0][2], m[0][3]),
    vec3(m[1][1], m[1][2], m[1][3]),
    vec3(m[3][1], m[3][2], m[3][3])
  ];
  var a21 = [
    vec3(m[0][0], m[0][2], m[0][3]),
    vec3(m[1][0], m[1][2], m[1][3]),
    vec3(m[3][0], m[3][2], m[3][3])
  ];
  var a22 = [
    vec3(m[0][0], m[0][1], m[0][3]),
    vec3(m[1][0], m[1][1], m[1][3]),
    vec3(m[3][0], m[3][1], m[3][3])
  ];
  var a23 = [
    vec3(m[0][0], m[0][1], m[0][2]),
    vec3(m[1][0], m[1][1], m[1][2]),
    vec3(m[3][0], m[3][1], m[3][2])
  ];

  var a30 = [
    vec3(m[0][1], m[0][2], m[0][3]),
    vec3(m[1][1], m[1][2], m[1][3]),
    vec3(m[2][1], m[2][2], m[2][3])
  ];
  var a31 = [
    vec3(m[0][0], m[0][2], m[0][3]),
    vec3(m[1][0], m[1][2], m[1][3]),
    vec3(m[2][0], m[2][2], m[2][3])
  ];
  var a32 = [
    vec3(m[0][0], m[0][1], m[0][3]),
    vec3(m[1][0], m[1][1], m[1][3]),
    vec3(m[2][0], m[2][1], m[2][3])
  ];
  var a33 = [
    vec3(m[0][0], m[0][1], m[0][2]),
    vec3(m[1][0], m[1][1], m[1][2]),
    vec3(m[2][0], m[2][1], m[2][2])
  ];



  // @ts-ignore
  a[0][0] = det3(a00) / d;
  // @ts-ignore
  a[0][1] = -det3(a10) / d;
  // @ts-ignore
  a[0][2] = det3(a20) / d;
  // @ts-ignore
  a[0][3] = -det3(a30) / d;
  // @ts-ignore
  a[1][0] = -det3(a01) / d;
  // @ts-ignore
  a[1][1] = det3(a11) / d;
  // @ts-ignore
  a[1][2] = -det3(a21) / d;
  // @ts-ignore
  a[1][3] = det3(a31) / d;
  // @ts-ignore
  a[2][0] = det3(a02) / d;
  // @ts-ignore
  a[2][1] = -det3(a12) / d;
  // @ts-ignore
  a[2][2] = det3(a22) / d;
  // @ts-ignore
  a[2][3] = -det3(a32) / d;
  // @ts-ignore
  a[3][0] = -det3(a03) / d;
  // @ts-ignore
  a[3][1] = det3(a13) / d;
  // @ts-ignore
  a[3][2] = -det3(a23) / d;
  // @ts-ignore
  a[3][3] = det3(a33) / d;

  // @ts-ignore
  return a;
}

/**
 * 
 * @param {RegMat} m 
 */
export function inverse(m) {
  if (m.matrix != true) console.log("not a matrix");
  if (m.length == 2) return inverse2(m);
  if (m.length == 3) return inverse3(m);
  if (m.length == 4) return inverse4(m);
}

/**
 * TODO: type signature might not be correct!
 * 
 * @param {Mat4} m 
 * @param {boolean} flag 
 */
export function normalMatrix(m, flag) {
  var a = mat4();
  // @ts-ignore
  a = inverse(transpose(m));
  if (flag != true) return a;
  else {
    var b = mat3();
    for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) b[i][j] = a[i][j];
    return b;
  }
}
