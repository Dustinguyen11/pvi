import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { v4 as uuidv4 } from 'uuid';
import { UserHistoryDTO, UserInfomationDTO } from '@app/network/model/user.model';

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
    idToken: string |  null | undefined
    userInfo: UserInfomationDTO | null | undefined
    histories: UserHistoryDTO[] 
 };
 const initialState: initialStateType = {
    id:"me",
    userEmail: "",
    instanceId: "user6_13",
    accessToken: "",
    idToken: "",
    userInfo: null,
    histories: []
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
        state.id =  action.payload.email
     },
     userLogout:(state, action: PayloadAction<null>) => { 
      state.id =  ""
      state.userEmail = ""
      state.accessToken = ""
      state.idToken = ""
      state.userInfo  = null
     },
     setUserInfo:(state, action: PayloadAction<UserInfomationDTO>) => { 
      state.userInfo = action.payload
     },
     setUserHistory:(state, action: PayloadAction<UserHistoryDTO[]>) => { 
      state.histories = action.payload.reverse()
      //console.log(state.histories)
     }
    }
  });
export const {
  changeText , 
  updateLogin, 
  userLogout,
  setUserInfo,
  setUserHistory
} = authen.actions;
export default authen.reducer;

