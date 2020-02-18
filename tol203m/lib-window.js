/** @type {Promise<void>} */
export const promiseWindowLoaded = new Promise((resolve) => {
  const listener = () => {
    window.removeEventListener("load", listener);
    resolve();
  };
  window.addEventListener("load", listener);
});
