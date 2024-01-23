const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export { saveToLocalStorage, getFromLocalStorage };
