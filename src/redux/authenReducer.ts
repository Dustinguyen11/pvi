import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { v4 as uuidv4 } from 'uuid';


type initialStateType = {
    id: string;
 };
 const initialState: initialStateType = {
    id:"me"
};


export const authen = createSlice({
    name: 'authen',
    initialState,
    reducers: {
      changeText: (state, action: PayloadAction<string>) => {
        state.id = action.payload
      },
     
    },
  });
export const { changeText } = authen.actions;
export default authen.reducer;

