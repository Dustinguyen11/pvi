import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { v4 as uuidv4 } from 'uuid';


type initialStateType = {
    showBook: boolean;
    redentionBook: any 
 };
 const initialState: initialStateType = {
    showBook: false,
    redentionBook: null
};


export const book = createSlice({
    name: 'book',
    initialState,
    reducers: {
      changeShowBook: (state, action: PayloadAction<boolean>) => { 
        state.showBook =  action.payload
      },
      bookJumpTo : (state, action: PayloadAction<string>) =>{
        if (state.redentionBook == null) {
            return
        }
        state.showBook = true
        state.redentionBook.display(action.payload)
      },
      setRedentionBook :  (state, action: PayloadAction<any>)=> {
        state.redentionBook = action.payload
      }
    },
  });
export const { changeShowBook, setRedentionBook ,  bookJumpTo} = book.actions;
export default book.reducer;

