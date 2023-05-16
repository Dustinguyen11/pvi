import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from "@app/hooks";
import * as Tooltip from '@radix-ui/react-tooltip';

import "./chatbox.style.css"
import { ReactComponent as TrashSVG } from "@app/assets/ic_trash.svg";
import SVGIcon from '../common/svgicon.component';
import { useTranslation } from 'react-i18next';
import {  toast } from 'react-toastify';
import { translateCell } from '@app/i18n';
import { MessageReferent } from '@app/network/model/message.model';
import { bookJumpTo } from '@app/redux/bookReducer';

export enum MessageType {
    reply,
    send
}

type Props = {
    type: MessageType
    message: string
    referents: MessageReferent[],
    menu: any[] | null | undefined,
    showCoppy: boolean,
    onSelectObject: ((object: any) => void) | null | undefined
    displayMenuItem: ((object: any) => string),
    custom: FunctionComponent | null | undefined
}

type PropsMenu = {
    menu: any[]
    displayMenuItem: ((object: any) => string)
    onSelectObject: ((object: any) => void) | null | undefined
}

type PropsReferent = {
    referents: MessageReferent[]
}

const defaultProps: Props = {
    menu: undefined,
    message: "",
    referents: [],
    showCoppy: false,
    type: MessageType.reply,
    onSelectObject: undefined,
    displayMenuItem: (object: any): string => {
        return object;
    },
    custom: undefined
}

const MessageMenu = ({ menu, displayMenuItem, onSelectObject }: PropsMenu) => {
    return <ol className='message-menu'>
        {
            menu?.map((object) => <li key={object.id  || object} onClick={() => onSelectObject && onSelectObject(object)} className='menu-item'>{displayMenuItem(object)}</li>)
        }
    </ol>
}

const MessageReferentsItem =  ({ referent, onClickPage }: {referent:MessageReferent, onClickPage: (referent:MessageReferent)=>void }) => {
    
    return <div >
        <div className="referent-page-text-wraper">
           <div className='referent-page-text' onClick={()=>{ 
                onClickPage(referent)
           }}>
           {referent.title}
           </div>
        </div>
        <div className='referent-text'>
        {
            referent.content
        }
        </div>
    </div>
}
const MessageReferents = ({ referents }: PropsReferent) => {
    const { t } = useTranslation();
    const [isShowTip, setShowTip] = useState(false)
    const dispatch = useAppDispatch()


    return <div className='message-referents'>
     <Tooltip.Root open= {isShowTip}>
        <Tooltip.Trigger asChild> 
                <div className='message-ref-text' onClick={()=>setShowTip(!isShowTip)}>
                    {referents.length + " " + (referents.length > 1 ? t("referents") : t("referent"))}
                </div> 
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content 
          collisionBoundary={
            [
                document.getElementsByClassName("chatbox-container") [0]
            ]
          }
          collisionPadding ={20} 
          className="TooltipContent" 
          sideOffset={5} 
          side='bottom'   
          align='end'
          hideWhenDetached = {true} 
          onPointerDownOutside={()=>setShowTip(false)}
          avoidCollisions = {true}
          >
            
                <div className='referent-container'>
                    {referents.map((r)=><MessageReferentsItem  key={r.title} referent={r} onClickPage={( ref)=>{
                        setShowTip(false)
                        dispatch(bookJumpTo(ref.url))
                    }} />)}
                </div>
            <Tooltip.Arrow className="TooltipArrow" />  
            
          </Tooltip.Content>
        </Tooltip.Portal>
    </Tooltip.Root>
    </div>
}
const Message = ({ type, message, referents, menu,showCoppy , onSelectObject, displayMenuItem, custom }: Props) => {


    const copyText = useCallback(()=>{ 
        navigator.clipboard.writeText(message)
        toast.success(translateCell("copySuccess"), {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    },  [message]);

    const displayMessage = () => {
        return   <div className='message-content'>
                {message}
                {
                    menu != null ? <MessageMenu onSelectObject={onSelectObject} menu={menu} displayMenuItem={displayMenuItem} /> : null
                }
                
                {
                showCoppy ? <div className='message-copy' onClick={copyText}>
                    <SVGIcon name='copy'/> 
                </div> : null
                } 
            </div>
    }
    return <div className={'message-container ' + ((type == MessageType.send) ? "send" : "reply")}>
        <div className="message-wraper speech ">

           
             {  (custom != null) ? <div className='message-content' >{custom({})}</div> : displayMessage() }
            {
                (referents.length > 0) ? <MessageReferents referents={referents} /> : null
            }

        </div>

    </div>
}

Message.defaultProps = defaultProps;

export default Message;