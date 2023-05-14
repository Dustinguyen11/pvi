import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { v4 as uuidv4 } from 'uuid';


type initialStateType = {
    showBook: boolean;
 };
 const initialState: initialStateType = {
    showBook: false
};


export const book = createSlice({
    name: 'book',
    initialState,
    reducers: {
      changeShowBook: (state, action: PayloadAction<boolean>) => { 
        state.showBook =  action.payload
      },
     
    },
  });
export const { changeShowBook } = book.actions;
export default book.reducer;

