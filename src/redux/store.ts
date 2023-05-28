import { configureStore , combineReducers } from '@reduxjs/toolkit';
import authenReducer from './authenReducer';
import chatReducer from './chatReducer';
import  layoutReducer from './layoutReducer';
import bookReducer from './bookReducer';
import storage from 'redux-persist/lib/storage'
import { setupListeners } from '@reduxjs/toolkit/query'

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['book', 'chat'],
}

export const rootReducers = combineReducers({
  authen: authenReducer,
  chat: chatReducer,
  layout: layoutReducer,
  book: bookReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false 
  }),

});
 
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;