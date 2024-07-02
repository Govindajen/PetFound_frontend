import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './reducers/account';
import { localStorageMiddleware, loadState } from './middleware';

// Conditionally load state only in the client-side context
const preloadedState = typeof window !== 'undefined' ? loadState() : undefined;

export const store = configureStore({
  reducer: {
    account: accountReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});