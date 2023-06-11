import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { v4 as uuidv4 } from 'uuid';
import { ChatSession, ChatSessionStatus, UpdateChatRequest } from '@app/types';
import { MessageDTOModel, MessageModel } from '@app/network/model/message.model';
import { MapToAnswer, MapToQuestion, UserHistoryDTO } from '@app/network/model/user.model';
import { send } from 'process';


type initialStateType = {
    id: string;
    sessions: ChatSession[];
    currentSession: ChatSession | null | undefined,
    messages: MessageModel[],
    isSending: boolean,
    readOnly: boolean
};
 
 const initialState: initialStateType = {
    id:"",
    sessions: Array<ChatSession>(),
    currentSession: null,
    messages: Array<MessageModel>(),
    isSending: false,
    readOnly: false
};


export const chat = createSlice({
    name: 'chat',
    initialState,
    reducers: {
      openBox : (state, action: PayloadAction<UserHistoryDTO>)=> {
        let result:MessageModel[] = []
        for (var k in action.payload.messages) {
          let msg = action.payload.messages[k] 
          let chatMsg  = MapToQuestion(msg, state.id) 
          let chatMsg2 = MapToAnswer(msg, "ai")
          result.push(chatMsg)
          result.push(chatMsg2)
        }
        state.messages = result
        state.readOnly = true
      },
      setReadOnly: (state, action: PayloadAction<boolean>)=> {
        state.readOnly =  action.payload
      },
      setId: (state, action: PayloadAction<string>)=> {
        state.id =  action.payload
      },
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
export const { 
  newChat , 
  updateChat, 
  postAIMessage, 
  revcAIMessage, 
  cleanMessages,
  setReadOnly,
  setId,
  openBox
} = chat.actions;
export default chat.reducer;

