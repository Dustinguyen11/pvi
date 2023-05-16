import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { v4 as uuidv4 } from 'uuid';
import { ChatSession, ChatSessionStatus, UpdateChatRequest } from '@app/types';
import { MessageModel } from '@app/network/model/message.model';


type initialStateType = {
    id: string;
    sessions: ChatSession[];
    currentSession: ChatSession | null | undefined,
    messages: MessageModel[],
    isSending: boolean
};
 
 const initialState: initialStateType = {
    id:"",
    sessions: Array<ChatSession>(),
    currentSession: null,
    messages: Array<MessageModel>(),
    isSending: false,
};


export const chat = createSlice({
    name: 'chat',
    initialState,
    reducers: {
      cleanMessages:(state, action: PayloadAction<undefined>) => {
        state.messages = []
      },
      postAIMessage:(state, action: PayloadAction<MessageModel>) => {
        let messages = [...state.messages]
        messages.push(action.payload) 
        state.isSending = true
        state.messages = messages
      }, 
      revcAIMessage:(state, action: PayloadAction<MessageModel>) => {
        let messages = [...state.messages]
        messages.push(action.payload) 
        state.isSending = false
        state.messages = messages
      },
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
export const { newChat , updateChat, postAIMessage, revcAIMessage, cleanMessages} = chat.actions;
export default chat.reducer;

