import NetworkFetch from "@app/network/core/network.service"
import { ChatAI, ChatAIApiEndpoint } from "./chatapi"
import { MessageDTOModel } from "../model/message.model"

export const AskDocument = async (data: {
    userEmail:string,
    instanceId: string,
    query: string,
}): Promise<MessageDTOModel> => {
    
   let response  = await NetworkFetch(new ChatAI(
        ChatAIApiEndpoint.askDocument, 
        {
            headers: {
             "api-x": "test"
            },
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