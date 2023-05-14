 
export type IdTokenClaims = {
    aud: string;
    roles: string[];
};

export enum ChatSessionStatus {
    open,
    end
}

export type ChatSession = {
    name: string,
    id: string,
    createdAt: Date| undefined | null;
    status: ChatSessionStatus
}

export type UpdateChatRequest = {
  name: string,
  id: string
}