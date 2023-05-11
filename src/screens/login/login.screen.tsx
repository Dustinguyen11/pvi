

import React from 'react';
import "./login.style.css"
import { useMsal } from '@azure/msal-react';
import DefaultLayout from '@app/layouts/default.layout';


export default () => {
    const { instance } = useMsal();

    const doLogin = () => {
        instance.loginRedirect();
    }
    return <DefaultLayout>
        <div onClick={() => doLogin()}>
            <div className="box-login-container">
                <div className="logo"> <img src={require("@app/assets/logo.png")} /></div>
                <div className='box-login-avatar-container'>

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
                        <div>
                            Remember
                        </div>
                        <div className='flex'>
                             
                        </div>
                        <div>
                        Forgot password?
                        </div>
                    </div>
                </div>

                <div className='button-login-container'>
                    23123
                </div>
            </div>

        </div>
    </DefaultLayout>
}