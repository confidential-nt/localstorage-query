type Store = {
  [key: string]: unknown;
};

const localStorageMock = () => {
  let store: Store = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: unknown) {
      store[key] = String(value);
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
};
export default localStorageMock;
