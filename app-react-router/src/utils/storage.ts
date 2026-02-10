const getFromStorage = (key: string, defaultValue: unknown, storage: 'localStorage' | 'sessionStorage') => {
  if (typeof window === 'undefined') return defaultValue;
  const item = window[storage].getItem(key);
  if (item) return JSON.parse(item);
  return defaultValue;
};

export const getFromLocalStorage = (key: string, defaultValue: unknown) =>
  getFromStorage(key, defaultValue, 'localStorage');

export const getFromSessionStorage = (key: string, defaultValue: unknown) =>
  getFromStorage(key, defaultValue, 'sessionStorage');

const setToStorage = (key: string, value: unknown, storage: 'localStorage' | 'sessionStorage') => {
  if (typeof window === 'undefined') return;
  window[storage].setItem(key, JSON.stringify(value));
};

export const setToLocalStorage = (key: string, value: unknown) => setToStorage(key, value, 'localStorage');

export const setToSessionStorage = (key: string, value: unknown) => setToStorage(key, value, 'sessionStorage');
