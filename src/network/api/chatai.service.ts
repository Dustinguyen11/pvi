import NetworkFetch from "@app/network/core/network.service"
import { ChatAI, ChatAIApiEndpoint } from "./chatapi"
import { MessageDTOModel } from "../model/message.model"
import { ConversationMessageAnswerDTO, ConversationMessageHistoryDTO, UserDataDTO, UserInfomationDTO } from "../model/user.model"
import moment from "moment"

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
    topic_id: string 
}): Promise<ConversationMessageAnswerDTO> => {
    
   let response  = await NetworkFetch(new ChatAI(
        ChatAIApiEndpoint.sendQuestion, 
        {
            headers: getHeaders(),
            data:  {
                "user_email": data.userEmail,
                "question": data.question,
                "question_time": moment(new Date(), "YYYY-MM-DD[T]HH:mm:ss:SSZ"),
                "topic_id": data.topic_id
            },
            query: {}
        }
    ))   
    return await response.json() 
}