import { MessageDTOModel, MessageDocuments, MessageModel, MessageReferent } from "./message.model"


export type UserInfomationDTO  = {
    _id: string
    user_name: string
    user_account: string
    user_email: string
    user_id: string 
}

export type ConversationInformationDTO = {
    _id: string
    topic_id: string
    title: string
    created: string
    updated: string 
}

export type HistoryReferentSource = {
    page_content: string
    metadata: any
}


export type HistoryAnserReferent = {
    source: HistoryReferentSource
    score: number
}
 
export type ConversationMessageAnswerDTO = {
    answer: string
    source_documents: {[key: string]: HistoryAnserReferent}
    Error: string | null | undefined
}

export type ConversationMessageHistoryDTO = {
    _id: string 
    question_time: string
    question: string
    answer_time: string
    answer: ConversationMessageAnswerDTO 
}

export type UserHistoryDTO  = {
    information: ConversationInformationDTO
    messages: ConversationMessageHistoryDTO[]
}


export type UserDataDTO = {
    user_information: UserInfomationDTO,
    all_chat_history: {[key: string]:  UserHistoryDTO}
}

export const MapToReferent = ( items: {[key: string]: HistoryAnserReferent}): MessageReferent[] => {
    let result: MessageReferent[] = []
    for (var k in items) {
        let item = items[k]
        let rf: MessageReferent = {
            content: item.source.page_content,
            url: item.source.metadata["source"],
            title:  "#Page " + item.source.metadata["page"],
        }
        result.push(rf)
    } 
    return result
}

export const MapToQuestion = (msg: ConversationMessageHistoryDTO, sender: string) : MessageModel => {
    let chatMsg: MessageModel = {
        id : msg._id,
        text: msg.question,
        senderId: sender,
        referents: [],
        documents: [],
        isError: false
      }
      return chatMsg
}

export const MapToAnswer = (msg: ConversationMessageHistoryDTO, sender: string) : MessageModel => {
    let chatMsg: MessageModel = {
        id : msg._id+"aw",
        text: msg.answer.answer,
        senderId: "ai",
        referents: MapToReferent(msg.answer.source_documents),
        documents: [],
        isError: false
      }
      return chatMsg
}
 