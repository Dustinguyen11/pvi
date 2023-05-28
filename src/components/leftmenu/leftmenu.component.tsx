import React from 'react';
import { useAppDispatch } from "@app/hooks";

import "./leftmenu.style.css"
import HistoryItem from './history-item';
import FooterActionItem from './footer-action-item';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { userLogout } from '@app/redux/authenReducer';
import { changeShowLeft } from '@app/redux/layoutReducer';
import { useMsal } from '@azure/msal-react';

 const DashboardLeftMenu = ()=> {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { instance } = useMsal();

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
                     title={t("btnNewChat")} 
                     showRemove={false}
                     onClick={()=>{
                        dispatch(changeShowLeft(false))
                        navigate("/")
                     }}
                     />
                   
            </div>
            <div className='left-content-footer'>
                    <FooterActionItem 
                    title={t("clearConversation")} 
                    icon='trash'
                    onClick={()=>{
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
                        navigate("/index")
                    }}
                      />
                    <FooterActionItem
                     title={t("getHelp")}
                      icon='help'
                      onClick={()=>{
                        dispatch(changeShowLeft(false))
                       
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