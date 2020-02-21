/**
 * 
 * @param {RequestInfo} input 
 * @param {RequestInit=} init 
 */
export async function fetchAsText(input, init) {
  const response = await fetch(input, init);
  if (!response.ok) throw new Error(`Failed to fetch: ${input}`);
  const text = await response.text();
  return text;
}

/**
 * 
 * @param {RequestInfo} input 
 * @param {RequestInit=} init 
 */
export async function fetchAsJSON(input, init) {
  const response = await fetch(input, init);
  if (!response.ok) throw new Error(`Failed to fetch: ${input}`);
  const json = await response.json();
  return json;
}
