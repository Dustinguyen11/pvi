import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { v4 as uuidv4 } from 'uuid';
import {   Rendition } from 'epubjs'
import { MessageDocuments } from "@app/network/model/message.model"

type initialStateType = {
    showBook: boolean;
    redentionBook: any
    currentBook: MessageDocuments | null,
    bookLocation: string | number | null,
    books:MessageDocuments[]
 };
 const initialState: initialStateType = {
    showBook: false,
    redentionBook: null,
    currentBook: null,
    bookLocation: null,
    books:[
      {
        title: "Quyển số 1",
        url: "https://react-reader.metabits.no/files/alice.epub",
        id:"1"
    } 
    ]
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
       }, 200)
        state.bookLocation = action.payload
      },
      setRedentionBook :  (state, action: PayloadAction<any>)=> {
        state.redentionBook = action.payload
        
      },
      setBook :  (state, action: PayloadAction<MessageDocuments>)=> {
        state.currentBook = action.payload
      }, 
    },
  });
export const { changeShowBook, setRedentionBook ,  bookJumpTo, setBook} = book.actions;
export default book.reducer;

