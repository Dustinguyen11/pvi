import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { v4 as uuidv4 } from 'uuid';


type initialStateType = {
    showLeft: boolean;
 };
 const initialState: initialStateType = {
    showLeft: false
};


export const layout = createSlice({
    name: 'layout',
    initialState,
    reducers: {
      changeShowLeft: (state, action: PayloadAction<boolean>) => { 
        state.showLeft =  action.payload
      },
     
    },
  });
export const { changeShowLeft } = layout.actions;
export default layout.reducer;

