

import React, { useEffect, useState } from 'react';
import "./login.style.css"
import { useAccount, useMsal, useMsalAuthentication } from '@azure/msal-react';
import DefaultLayout from '@app/layouts/default.layout';
import { useTranslation } from 'react-i18next';
import { AccountInfo, InteractionRequiredAuthError, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { toast } from 'react-toastify';
import { translateCell } from '@app/i18n';
import { updateLogin, userLogout } from '@app/redux/authenReducer';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@app/hooks';


export default () => {
    const { instance, accounts } = useMsal();
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(false)
    const [textAccount, setTextAccount] = useState("")
     const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const userAccessToken = useAppSelector((state) => state.authen.accessToken)
    var request = {
        loginHint: textAccount,
        scopes: ["User.Read", "openid",
            "profile",
            "offline_access",],
    }


    const doLoginMobile = async () => {
        //accounts
        if (isLoading) {
            return
        }
        instance.loginRedirect(request);
    }
    const doLogin = async () => {
        if (isLoading) {
            return
        }
        if (doLoginMobile) {
            doLoginMobile()
            return
        }
        try {
            setLoading(true)
            let info = await instance.loginPopup(request);

            if (info == null) {
                return
            }
            console.log(info)
            dispatch(updateLogin(
                {
                    email: info.account?.username ?? "",
                    accessToken: info.accessToken,
                    idToken: info.idToken
                }
            ))
            setLoading(false)
            navigate("/")

        } catch (e) {
            console.log(e)
            toast.error(translateCell("Cancel"), {
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

        setLoading(false)
    }

    const doLoginAccount = (account: AccountInfo) => {
          
      
        const didGetAccessToken = (account: AccountInfo, accessToken: string, idToken: string) => {
            dispatch(updateLogin(
                {
                    email: account.username ?? "",
                    accessToken: accessToken,
                    idToken: idToken
                }
            ))
            instance.setActiveAccount(account)
            global.lastActiveAccount =   account.username
            setLoading(false)
            navigate("/")
        }

        let accesstokenReq = {
            scopes: ["user.read"],
            account: account,
        }
        instance
            .acquireTokenSilent(accesstokenReq)
            .then(function (accessTokenResponse) {
                didGetAccessToken(accessTokenResponse.account ?? account, accessTokenResponse.accessToken, accessTokenResponse.idToken)
            })
            .catch(function (error) {
                if (error instanceof InteractionRequiredAuthError) {
                    instance
                        .acquireTokenPopup(accesstokenReq)
                        .then(function (accessTokenResponse) {
                            didGetAccessToken(accessTokenResponse.account ?? account, accessTokenResponse.accessToken, accessTokenResponse.idToken)

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
                console.log(error);
            });

    }
    
    useEffect(() => {
        if (accounts.length  <= 0) {
            return
        }
    const currentAccount: AccountInfo | null | undefined = instance.getActiveAccount(); 
      if (!currentAccount) {
        return
      }
    if (accounts[0].username ==  global.lastActiveAccount ) {
        return
      }

      doLoginAccount(accounts[0])
    }, [accounts ])
    return <DefaultLayout>
        <div >
            <div className="box-login-container">
                <div className="logo"> <img src={require("@app/assets/logo.png")} /></div>
                <div className='box-login-avatar-container'>
                    <img src={require("@app/assets/ic_user_big.png")} />
                </div>
                <div className='box-login-effect'>

                </div>
                <div className='box-login'>
                 {
                    (accounts.length > 0) ?
                    <>
                        {accounts.map((account)=> 
                        <div 
                        onClick={()=> {
                            doLoginAccount(account)
                        }}
                        key={account.username}
                        className='account'>
                            <div className='account-name'>{account.name}</div>
                            <div  className='account-email' >{account.username}</div> 
                        </div>
                        )}
                    </>
                    : 
                    <>
                      <div className="input-container">
                        <div className='input-icon'>
                        </div>
                        <input placeholder='Account' value={textAccount} onChange={(e)=>setTextAccount(e.target.value)}></input>
                    </div>
                    </>
                 }
                { /* 
                    <div className="input-container">
                        <div className='input-icon'>
                        </div>
                        <input placeholder='Account' value={textAccount} onChange={(e)=>setTextAccount(e.target.value)}></input>
                    </div>
                
                   
                       <div className="input-container">
                        <div className='input-icon'>
                        </div>
                        <input placeholder='Password'></input>
                    </div>

                    */
                 }

                  {
                    /*
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
                    */
                  }
                </div>
                {
                     (accounts.length > 0) ? null : 
                     <>  <div className='button-login-container' onClick={() => doLogin()}>
                     {t("btnLogin")}
                 </div>
                 </> 
                }
               
            </div>

        </div>
    </DefaultLayout>
}