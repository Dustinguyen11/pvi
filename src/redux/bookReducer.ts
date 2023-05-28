import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { v4 as uuidv4 } from 'uuid';
import {   Rendition } from 'epubjs'


type initialStateType = {
    showBook: boolean;
    redentionBook: any
    bookName: string
    bookLocation: string | number | null
 };
 const initialState: initialStateType = {
    showBook: false,
    redentionBook: null,
    bookName: "",
    bookLocation: null
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
     
        var redenttion  = state.redentionBook as Rendition

        redenttion.display(action.payload)
      
       setTimeout(()=> {
        redenttion.display(action.payload)
       }, 100)
        state.bookLocation = action.payload
      },
      setRedentionBook :  (state, action: PayloadAction<any>)=> {
        state.redentionBook = action.payload
        
      },
      setBookName :  (state, action: PayloadAction<string>)=> {
        state.bookName = action.payload
      }, 
    },
  });
export const { changeShowBook, setRedentionBook ,  bookJumpTo, setBookName} = book.actions;
export default book.reducer;

