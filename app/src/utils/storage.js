const getFromStorage = (key, defaultValue, storage) => {
  if (!!window[storage].getItem(key)) return JSON.parse(window[storage].getItem(key));
  return defaultValue;
};

export const getFromLocalStorage = (key, defaultValue) =>
  getFromStorage(key, defaultValue, "localStorage");

export const getFromSessionStorage = (key, defaultValue) =>
  getFromStorage(key, defaultValue, "sessionStorage");

const setToStorage = (key, value, storage) => {
  window[storage].setItem(key, JSON.stringify(value));
};

export const setToLocalStorage = (key, value) => setToStorage(key, value, "localStorage");

export const setToSessionStorage = (key, value) => setToStorage(key, value, "sessionStorage");
