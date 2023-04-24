export function setLocalStorage(value, key) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorage = (key) => {
  const storageItem = localStorage.getItem(key);
  if (!storageItem) {
    return null;
  }

  return JSON.parse(storageItem);
};
