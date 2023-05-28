import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { v4 as uuidv4 } from 'uuid';

type LoginParams = {
  accessToken: string
  idToken: string
    email: string
  };
type initialStateType = {
    id: string
    userEmail: string
    instanceId: string
    accessToken: string
    idToken: string
 };
 const initialState: initialStateType = {
    id:"me",
    userEmail: "",
    instanceId: "da410606-6fcc-45ad-acbc-d3d6f26e93e7",
    accessToken: "",
    idToken: "",
};


export const authen = createSlice({
    name: 'authen',
    initialState,
    reducers: {
      changeText: (state, action: PayloadAction<string>) => {
        state.id = action.payload
      },
      updateLogin: (state, action: PayloadAction<LoginParams>) => {
        state.userEmail = action.payload.email
        state.accessToken = action.payload.accessToken
        state.idToken = action.payload.idToken 
     },
     userLogout:(state, action: PayloadAction<null>) => { 
      state.userEmail = ""
      state.accessToken = ""
      state.idToken = ""
     }
    }
  });
export const { changeText , updateLogin, userLogout} = authen.actions;
export default authen.reducer;

