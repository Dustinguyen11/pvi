

export type MessageReferent =  {
    content: string
    url: string,
    title: string
}

export type MessageDocuments = {
    title: string
    url: string,
    id: string
}

export type MessageModel = {
    id: string,
    text: string
    referents: MessageReferent[] | null | undefined
    documents: MessageDocuments[] | null | undefined
    senderId: string
}