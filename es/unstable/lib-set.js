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
