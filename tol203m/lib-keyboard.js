export const KEY_ARROW_LEFT = 37;
export const KEY_ARROW_UP = 38;
export const KEY_ARROW_RIGHT = 39;
export const KEY_ARROW_DOWN = 40;

export const KEY_A = 65;
export const KEY_W = 87;
export const KEY_D = 68;
export const KEY_S = 83;


const keys = [];

window.addEventListener("keydown", (ev) => { keys[ev.keyCode] = true; });
window.addEventListener("keyup", (ev) => { keys[ev.keyCode] = false; });


/** 
 * Determine if key with key code `keyCode` is pressed.
 * 
 * @param {number} keyCode 
 */
export function isKeyDown(keyCode) {
  return !!keys[keyCode];
}


/**
 * Determine if any key with any of the key codes in array `keyCodes` is
 * pressed.
 *
 * @param {number[]} keyCodes 
 */
export function isOneKeyDown(keyCodes) {
  for (let i = 0; i < keyCodes.length; ++i) {
    const keyCode = keyCodes[i];
    if (isKeyDown(keyCode)) return true;
  }
  return false;
}