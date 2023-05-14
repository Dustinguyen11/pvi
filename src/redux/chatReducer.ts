import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { v4 as uuidv4 } from 'uuid';
import { ChatSession, ChatSessionStatus, UpdateChatRequest } from '@app/types';


type initialStateType = {
    id: string;
    sessions: ChatSession[];
    currentSession: ChatSession | null | undefined
};
 
 const initialState: initialStateType = {
    id:"",
    sessions: Array<ChatSession>(),
    currentSession: null
};


export const chat = createSlice({
    name: 'chat',
    initialState,
    reducers: {
      newChat: (state, action: PayloadAction<string>) => {
        let id = uuidv4()
        let name = action.payload
        let listSesison = state.sessions
        let session: ChatSession = {
            id: id,
            name: name,
            createdAt: new Date(),
            status: ChatSessionStatus.open 
        } 
        listSesison.push(session) 
      //  state = {...state, sessions: listSesison, currentSession : session }
      state.sessions = listSesison
      state.currentSession = session
      }, 
      updateChat : (state, action: PayloadAction<UpdateChatRequest>) => {
        const findSession = (id: string) : (ChatSession | null)  =>{
            for (var session of state.sessions) {
                    if (session.id == id) 
                    return session
            }

            return null;
        }
        const updateSession = (id: string, value: ChatSession, list: ChatSession[] ) : (ChatSession[])  =>{
            for (var k in  list) {
                    if (list[k].id == id) 
                     {
                        list[k] = value;
                        break;
                     }
            } 
            return list;
        }
        
        let listSesison = state.sessions
        let session = findSession(action.payload.id);
        if (session == null) {
            return
        } 
        session.name = action.payload.name 
        //state = {...state, sessions: updateSession(action.payload.id, session, listSesison) }

        state.sessions = updateSession(action.payload.id, session, listSesison)
      },
     
     
    },
  });
export const { newChat , updateChat} = chat.actions;
export default chat.reducer;

