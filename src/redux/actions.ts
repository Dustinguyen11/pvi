import { configureStore } from '@reduxjs/toolkit';
import authenReducer from './authenReducer';
export const store = configureStore({
    reducer: {
      book: authenReducer,
    },
  });