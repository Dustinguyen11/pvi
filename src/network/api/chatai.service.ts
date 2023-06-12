import NetworkFetch from "@app/network/core/network.service"
import { ChatAI, ChatAIApiEndpoint } from "./chatapi"
import { MessageDTOModel } from "../model/message.model"
import { ConversationMessageAnswerDTO, ConversationMessageHistoryDTO, UserDataDTO, UserInfomationDTO } from "../model/user.model"
import moment from "moment"
import * as uuid from 'uuid'

const getHeaders = () :  any | null => {
    return {
        "api-x": "test"
       }
}
export const AskDocument = async (data: {
    userEmail:string,
    instanceId: string,
    query: string,
}): Promise<MessageDTOModel> => {
    
   let response  = await NetworkFetch(new ChatAI(
        ChatAIApiEndpoint.askDocument, 
        {
            headers: getHeaders(),
            data: null,
            query: {
                "user_email": data.userEmail,
                "instance_id": data.instanceId,
                "query": data.query
            }
        }
    ))   
    return await response.json() 
}

export const GetUserData = async (data: {
    userName:string,
    userAccount: string,
    userEmail: string,
    accessToken: string
}): Promise<UserDataDTO> => {
    
   let response  = await NetworkFetch(new ChatAI(
        ChatAIApiEndpoint.getUserData, 
        {
            headers: getHeaders(),
            data:  {
                "user_name": data.userName,
                "user_account": data.userAccount,
                "user_email": data.userEmail,
                "access_token": data.accessToken
            },
            query: {}
        }
    ))   
    return await response.json() 
}


export const SendQuestion = async (data: {
    userEmail: string,
    question: string,
    topicId: string 
}): Promise<ConversationMessageAnswerDTO> => {
    
   let response  = await NetworkFetch(new ChatAI(
        ChatAIApiEndpoint.sendQuestion, 
        {
            headers: getHeaders(),
            data:  {
                "user_email": data.userEmail,
                "question": data.question,
                "question_time": moment(new Date(), "YYYY-MM-DD[T]HH:mm:ss:SSZ"),
                "topic_id": data.topicId
            },
            query: {}
        }
    ))   
    return await response.json() 
}

export const CreateNewChat = async (data: {
    userEmail: string,  
}): Promise<string> => {
    
    let topicId = uuid.v4()
   let response  = await NetworkFetch(new ChatAI(
        ChatAIApiEndpoint.newChat, 
        {
            headers: getHeaders(),
            data:  {
                "user_email": data.userEmail, 
                "topic_id": "new"
            },
            query: {}
        }
    ))   
    let js =  await response.json()
    if (js["topic_id"] != null) {
        return js["topic_id"]
    }
    throw js["message"] || js["Error"] || (js["detail"] && js["detail"]["error"]) || "Create New Topic Error "
}

export const UpdateChatTitle = async (data: {
    topicId: string,  
    newTitle: string,  
}): Promise<boolean> => {
     
   let response  = await NetworkFetch(new ChatAI(
        ChatAIApiEndpoint.updateChatTitle, 
        {
            headers: getHeaders(),
            data:  {
                "topic_id": data.topicId, 
                "new_title": data.newTitle
            },
            query: {}
        }
    ))   
    let js =  await response.json()
    if (js["result"] != null) {
        return true
    }
    throw js["message"] || js["Error"] || "Create New Topic Error "
}

export const Deletechat = async (data: {
    topicId: string,  
    userEmail: string,  
}): Promise<boolean> => {
     
   let response  = await NetworkFetch(new ChatAI(
        ChatAIApiEndpoint.deleteChat, 
        {
            headers: getHeaders(),
            data:  {
                "user_email": data.userEmail, 
                "topic_id": data.topicId
            },
            query: {}
        }
    ))   
    let js =  await response.json()
    if (js["result"] != null) {
        return true
    }
    throw js["message"] || js["Error"] || "Create New Topic Error "
}