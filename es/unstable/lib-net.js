/**
 * 
 * @param {RequestInfo} input 
 * @param {RequestInit=} init 
 */
export async function fetchAsText(input, init) {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${input}`);
  }
  const result = await response.text();
  return result;
}


/**
 * 
 * @param {RequestInfo} input 
 * @param {RequestInit=} init 
 */
export async function fetchAsJSON(input, init) {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${input}`);
  }
  const result = await response.json();
  return result;
}


/**
 * 
 * @param {RequestInfo} input 
 * @param {RequestInit=} init 
 */
export async function fetchAsArrayBuffer(input, init) {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${input}`);
  }
  const result = await response.arrayBuffer();
  return result;
}


/**
 * 
 * @param {RequestInfo} input 
 * @param {RequestInit=} init 
 */
export async function fetchAsBlob(input, init) {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${input}`);
  }
  const result = await response.blob();
  return result;
}


/**
 * 
 * @param {RequestInfo} input 
 * @param {RequestInit=} init 
 */
export async function fetchAsFormData(input, init) {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${input}`);
  }
  const result = await response.formData();
  return result;
}
