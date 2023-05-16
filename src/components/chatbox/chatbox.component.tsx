import React, {useEffect} from 'react';
import { useAppDispatch, useAppSelector } from "@app/hooks";

import "./chatbox.style.css"
import { ReactComponent as TrashSVG } from "@app/assets/ic_trash.svg";
import SVGIcon from '../common/svgicon.component';
import Message, { MessageType } from './message.component';
import * as Tooltip from '@radix-ui/react-tooltip';
import {  toast } from 'react-toastify';
import { useRef } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { MessageModel, MessageDocuments, MessageReferent } from '@app/network/model/message.model';
import * as uuid from 'uuid'
import { useTranslation } from 'react-i18next';
import { cleanMessages, postAIMessage, revcAIMessage } from '@app/redux/chatReducer';
import { AskDocument } from '@app/network/api/chatai.service';
 
type Props = { 
}


 const ChatBox = ( )=> { 
    const dispatch = useAppDispatch()
    const userid = useAppSelector((state)=>state.authen.id)
    const userEmail = useAppSelector((state)=>state.authen.userEmail)
    const instanceId = useAppSelector((state)=>state.authen.instanceId)
    const isSending = useAppSelector((state)=>state.chat.isSending)

    const refInputBox = useRef<HTMLDivElement>(null);
    const [textChat, setTextChat] = useState("")
    const messages = useAppSelector((state)=>state.chat.messages)
    const { t } = useTranslation();

    useEffect(()=> {
        dispatch(cleanMessages())
        dispatch(revcAIMessage( {
            id: uuid.v4(),
            text:  "Danh mục sách hỏi đáp:",
            referents: [],
            documents: [
                {
                    title: "Quyển số 1",
                    url: "https://react-reader.metabits.no/files/alice.epub",
                    id:"1"
                },
                {
                    title: "Quyển số 2",
                    url: "https://react-reader.metabits.no/files/alice.epub",
                    id:"2"
                }],
            senderId: "system"
        } ))  
        dispatch(revcAIMessage(    {
            id: uuid.v4(),
            text:  "tIN NHẮN được trả lời tự động vào có thông tin liên quan đến tệp tài liệu đồng thời cho phép copy",
            referents: [
                {
                    content: " test 0123 te test 0123 test 0123 test 0st 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 ",
                    url:"epubcfi(/6/14[xchapter_001]!4/2/24/2[c001p0011]/1:799)",
                    title: "#Page 1" 
                },
                {
                    content: " test 0123 te test 0123 test 0123 test 0st 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 test 0123 ",
                    url:"epubcfi(/6/8!/4/2/30,/1:13,/3:161)",
                    title: "#Page 2" 
                }
            ],
            documents: [ ],
            senderId: "system"
        }
        ))
    }, [])

    const sendMessage = (message: string) => {
        if (isSending) {
            return;
        }
        
        updateText("")
 
        var fakeMesasge: MessageModel = {
            id: uuid.v4(),
            text: message,
            referents: [],
            documents: [ ],
            senderId: userid
        } 
        dispatch(postAIMessage( fakeMesasge ))

        AskDocument({
            userEmail: userEmail,
            instanceId: instanceId,
            query: message
        }).then((response)=> {
            let aiMessage: MessageModel = {
                id: uuid.v4(),
                text: response.response,
                referents: response.references?.map((m)=> {
                  var  referent: MessageReferent = {
                        title: "#Page " + m.doc_metadata["page"],
                        url: m.doc_metadata["source"],
                        content: m.source_text
                  }

                    return referent
                }) || [],
                documents: [ ],
                senderId: "ai"
            } 
            dispatch(revcAIMessage( aiMessage ))  
        }).catch((error)=> {
            dispatch(revcAIMessage( {
                id: uuid.v4(),
                text: error +"",
                referents: [],
                documents: [ ],
                senderId: "ai"
            }  ))  
        })
    }

    const onSubmit = () => {
        
        if (textChat.trim() == "") {
            return
        }
        sendMessage(textChat.trim())
    }

    const updateText = (text: string)=>{
        if (refInputBox.current) { 
            refInputBox.current["dataset"]["value"] = text
        }
        setTextChat(text)
    }
    
    const onInput = (event: React.FormEvent<HTMLTextAreaElement>)=>{
            let element =  event.target  as  HTMLTextAreaElement 
            updateText(element.value)
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>)=> {
        if (event.keyCode  != 13) {
             return
        }
       
        if ( event.ctrlKey) {

            let element =  event.target  as  HTMLTextAreaElement 
          
                var position = element.selectionEnd;
                element.value = element.value.substring(0, position) + '\n' + element.value.substring(position);
                element.selectionEnd = position + 1; 
                updateText(element.value)

        } else {
            onSubmit()
        }

        event.preventDefault();
 
    }
    return <div className='chatbox-container'>  
        <div className='messages-wraper'>
            <div className='messages'>
        {
          /*
           <Message 
         type={MessageType.reply} 
         message={'test'} 
         referents={0} 
         menu={["Sách số 1","Sách số 2","Sách số 3"]}
         onSelectObject={(object)=>{
            let promise = new Promise((r,j) => {
                setTimeout(()=>r(object), 2000)
            })
            toast.promise(promise,{
                pending: 'Promise is pending',
                success: '👌 ' + object,
                error: 'Promise rejected 🤯', 
            }, {
                theme: "dark",
                autoClose: 3000,
            })

         }}
         />
         */
        }
      
         {
            messages.map((value)=>  <Message
            key={value.id}
             type={value.senderId == userid ? MessageType.send : MessageType.reply}  
             message={value.text} 
             referents={value.referents || []}
             showCoppy={(value.documents == null || value.documents.length == 0) && value.senderId != userid}
             menu={value.documents}
             onSelectObject={
                (object)=>{
                    if (object as MessageDocuments)
                    { 
                            sendMessage(object.title)
                    }  
                }
             }
             displayMenuItem={(item)=>{
                if (item as MessageDocuments)
                {
                    return item.title
                } else {
                    return ""
                }
             }}
             
             />)
         }
          {
          isSending ? <Message custom={(props)=>{
            return <div data-uk-spinner="ratio: 0.6"/>
          }}/> : null
        }
            </div>
        </div>
        <div className='chat-input-wraper'>
            <div className='chat-input-text-container' >
                    <div className='chat-input-text input-sizer stacked ' ref={refInputBox}>
                    <textarea 
                    placeholder={t("writeAQuestion") || ""}
                    rows={1} 
                    onInput={onInput } 
                    onKeyDown={onKeyDown}
                    value={textChat}
                    ></textarea>
                    </div>
                    <div className='send-button' onClick={onSubmit}>
                        <SVGIcon name='send'></SVGIcon>
                    </div>
            </div>
        </div>
    </div>
}


export default  ChatBox;

 