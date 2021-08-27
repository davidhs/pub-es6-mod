/**
 * Fisher-Yates shuffle, creates a copy.
 *
 * @type {<T>(arr: T[]) => T[]}
 */
export function getShuffled(arr) {
  // TODO: add ability to provide own uniform random number generator.
  const copy = [...arr]; // Copy array
  return shuffleInPlace(copy);
}

/**
 * Fisher-Yates in-place shuffle.
 *
 * @type {<T>(arr: T[]) => T[]}
 */
export function shuffleInPlace(arr) {
  // TODO: add ability to provide own uniform random number generator.
  const n = arr.length;
  for (let i = 0; i < n; i += 1) {
    // Math.random() in [0, 1), hence k * Math.random() gives [0, k) and
    // Math.floor(k * Math.random()) gives { 0, 1, ..., k - 2, k - 1}.
    const j = Math.floor(Math.random() * (i + 1));
    if (j !== i) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  return arr;
}
