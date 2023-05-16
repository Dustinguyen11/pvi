

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
export type MessageReferentDTOModel = {
    source_text: string
    similarity: number
    doc_metadata: any
}
export type MessageDTOModel = {
    references :MessageReferentDTOModel[] | null | undefined
    response: string
    response_time: string
}