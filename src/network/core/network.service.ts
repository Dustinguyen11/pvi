import { ChatAI } from "../api/chatapi";

export default (object: ChatAI) : Promise<Response>=>  { 
    let headers = object.headers 
    headers.set('Content-Type', object.contentType) 
    return fetch(object.url,{
        method: object.method,
        body: object.body,
        headers: headers
    })
}