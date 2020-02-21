// WARNING: HIGHLY UNSTABLE LIBRARY

/**
 * Creates a 32-bit floating point array with `size` nr. of entries and the
 * default value of each entry is `defaultValue`.
 * 
 * @param {number} size Nr. of entries in array.
 * @param {number=} defaultValue Default value for entry.
 */
export function createFloat32Array(size, defaultValue = 0) {
  return new Float32Array([...Array(size)].map(() => defaultValue));
}