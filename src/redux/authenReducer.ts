import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { v4 as uuidv4 } from 'uuid';


type initialStateType = {
    id: string
    userEmail: string
    instanceId: string
 };
 const initialState: initialStateType = {
    id:"me",
    userEmail: "tuanna712@gmail.com",
    instanceId: "da410606-6fcc-45ad-acbc-d3d6f26e93e7"
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

