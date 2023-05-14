

import React from 'react';
import "./login.style.css"
import { useMsal } from '@azure/msal-react';
import DefaultLayout from '@app/layouts/default.layout';
import { useTranslation } from 'react-i18next';


export default () => {
    const { instance } = useMsal();
    const { t } = useTranslation();
    const doLogin = () => {
        instance.loginRedirect();
    }
    return <DefaultLayout>
        <div >
            <div className="box-login-container">
                <div className="logo"> <img src={require("@app/assets/logo.png")} /></div>
                <div className='box-login-avatar-container'>
                    <img src={require("@app/assets/ic_user_big.png")}/>
                </div>
                <div className='box-login-effect'>
    
                </div>
                <div className='box-login'>
                    <div className="input-container">
                        <div className='input-icon'>
                        </div>
                        <input placeholder='Account'></input>
                    </div>
                    <div className="input-container">
                        <div className='input-icon'> 
                        </div>
                        <input placeholder='Password'></input>
                    </div>


                    <div className="box-bottom-action">
                    <label className="checkbox-container">{t("remember")}
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                        <div className='flex'>
                             
                        </div>
                        <a href='#'>
                        {t("forgotPassword")}
                        </a>
                    </div>
                </div>

                <div className='button-login-container'>
                {t("btnLogin")}
                </div>
            </div>

        </div>
    </DefaultLayout>
}