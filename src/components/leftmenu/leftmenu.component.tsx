import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from "@app/hooks";

import "./leftmenu.style.css"
import HistoryItem from './history-item';
import FooterActionItem from './footer-action-item';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { setUserHistory, setUserInfo, userLogout } from '@app/redux/authenReducer';
import { changeShowLeft } from '@app/redux/layoutReducer';
import { useMsal } from '@azure/msal-react';
import { openBox } from '@app/redux/chatReducer';
import { CreateNewChat, Deletechat, GetUserData } from '@app/network/api/chatai.service';
import { translateCell } from '@app/i18n';
import { toast } from 'react-toastify';

 const DashboardLeftMenu = ()=> {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { instance } = useMsal();
    const histories = useAppSelector((state)=>state.authen.histories) || []
    const userEmail = useAppSelector((state)=>state.authen.userEmail) || ""
    const userInfo = useAppSelector((state)=>state.authen.userInfo)
    const accessToken = useAppSelector((state)=>state.authen.accessToken)
    const topicId = useAppSelector((state)=>state.chat.currentTopic)
    const [topicDeleting, setTopicDeleting] = useState("") 
    const deleteChat = async (id: string)=> {
      try {
        await Deletechat({
            userEmail: userEmail,
            topicId: id
        })
        updateUserBoxInfo().then(console.log)

        if ( topicId == id) {
            dispatch(openBox(null))
        }
      } catch ( e) {
        toast.error(e + "", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
      }
    }

    const updateUserBoxInfo = async () => {
        let info = await GetUserData({
            userName: userInfo?.user_name ?? "",
            userAccount: userInfo?.user_account ?? "",
            userEmail: userInfo?.user_email ?? "",
            accessToken: accessToken
        })
        
        let histories = []
        for (var k in info.all_chat_history) {
            let item = info.all_chat_history[k] 
            histories.push(item)
        }

       dispatch(setUserInfo(info.user_information) )
       dispatch(setUserHistory(histories))
       //dispatch(setId(info.user_information.user_email))
       return "update history success" 
    }
    return <div className='left-content-wraper'>
            <div className="left-content-header">
            <div className="petro-logo">
                <img src={require("@app/assets/logo.png")} />
            </div>

            <div className="menu-container">
                <label className = "menu-title">VPI AI Chatbot</label>
            </div>
            </div>

            <div className='history-chat-list'>
                    <HistoryItem
                     onRemove={() => { 
                    }}
                    isLoading = {false}
                     title={t("btnNewChat")} 
                     showRemove={false}
                     onClick={async ()=>{
                        try {
                            dispatch(openBox(null))
                            dispatch(changeShowLeft(false))
                            navigate("/")
                        } catch (e) {
 
                        }
                     }}
                     />
                    {
                        histories.map((m)=> {
                            return   <HistoryItem
                            isLoading = {topicDeleting == m.information.topic_id}
                            onRemove={() => {
                                deleteChat(m.information.topic_id ??"")
                            }}
                            key = {m.information._id}
                            title={". "+m.information.title} 
                            showRemove={true}
                            onClick={()=>{
                              dispatch( openBox(m))
                              dispatch(changeShowLeft(false))
                              navigate("/")
                            }}
                            />
                        })
                    }
            </div>
            <div className='left-content-footer'>
                    <FooterActionItem 
                    title={t("clearConversation")} 
                    icon='trash'
                    onClick={async ()=>{
                        if (topicId != "") {
                            setTopicDeleting(topicId)
                           await deleteChat(topicId)
                        }
                        dispatch(changeShowLeft(false))
                    }}
                    />
                    <FooterActionItem
                     title={t("index")}
                      icon='index' 
                      onClick={()=>{
                        dispatch(changeShowLeft(false))
                        navigate("/index")
                    }} />
                    <FooterActionItem 
                    title={t("traditionalSearch")} 
                    icon='search'
                    onClick={()=>{
                        dispatch(changeShowLeft(false))
                        navigate("/search")
                    }}
                    />
                    <FooterActionItem
                     title={t("settings")}
                      icon='setting'
                      onClick={()=>{
                        dispatch(changeShowLeft(false))
                        navigate("/settings")
                    }}
                      />
                    <FooterActionItem
                     title={t("getHelp")}
                      icon='help'
                      onClick={()=>{
                        dispatch(changeShowLeft(false))
                        window.open('https://chat.zalo.me', '_blank', 'noopener,noreferrer');
                    }}
                     />
                    <FooterActionItem
                     title={t("logout")}
                      icon='logout'
                      onClick={()=>{
                       // instance.logout()
                       instance.setActiveAccount(null)
                        dispatch(changeShowLeft(false)) 
                        dispatch(userLogout(null))
                    }}
                      />

            </div>
    </div>
}


export default  DashboardLeftMenu;