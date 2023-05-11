import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { v4 as uuidv4 } from 'uuid';


type initialStateType = {
    id: String;
 };
 const initialState: initialStateType = {
    id:""
};


export const authen = createSlice({
    name: 'authen',
    initialState,
    reducers: {
      changeText: (state, action: PayloadAction<String>) => {
        state.id = action.payload
      },
     
    },
  });
export const { changeText } = authen.actions;
export default authen.reducer;

