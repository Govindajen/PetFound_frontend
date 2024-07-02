'use client';
export const saveState = (state) => {
  try {
    if (typeof window !== 'undefined') {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('petfound_data', serializedState);
    }
  } catch (e) {
    console.warn('Unable to save state:', e);
  }
};

export const loadState = () => {
  try {
    if (typeof window === 'undefined') {
      return undefined; // On server-side, return undefined
    }
    const serializedState = localStorage.getItem('petfound_data');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Unable to load state:', e);
    return undefined;
  }
};

export const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  saveState(store.getState());
  return result;
};