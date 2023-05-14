import { configureStore } from '@reduxjs/toolkit';
import authenReducer from './authenReducer';
import chatReducer from './chatReducer';
import  layoutReducer from './layoutReducer';
import bookReducer from './bookReducer';

export const store = configureStore({
  reducer: {
    authen: authenReducer,
    chat: chatReducer,
    layout: layoutReducer,
    book: bookReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;