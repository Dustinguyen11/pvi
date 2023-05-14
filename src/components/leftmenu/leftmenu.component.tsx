import React from 'react';
import { useAppDispatch } from "@app/hooks";

import "./leftmenu.style.css"
import HistoryItem from './history-item';
import FooterActionItem from './footer-action-item';
import { useTranslation } from 'react-i18next';


 const DashboardLeftMenu = ()=> {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

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
                    <HistoryItem title={t("btnNewChat")} showRemove={false}/>
                   
            </div>
            <div className='left-content-footer'>
                    <FooterActionItem title={t("clearConversation")} icon='trash'/>
                    <FooterActionItem title={t("index")} icon='index'/>
                    <FooterActionItem title={t("traditionalSearch")} icon='search'/>
                    <FooterActionItem title={t("settings")} icon='setting'/>
                    <FooterActionItem title={t("getHelp")} icon='help'/>
                    <FooterActionItem title={t("logout")} icon='logout'/>

            </div>
    </div>
}


export default  DashboardLeftMenu;