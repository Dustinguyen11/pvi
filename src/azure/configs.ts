 
import { Configuration,  LogLevel,  PublicClientApplication } from "@azure/msal-browser";

 

const defaultSetting = {
    tenant:"",
    clientId: "",
    redirectUri: "",
    api_endpoint: ""
}
 
//tenant: process.env.REACT_APP_AZURE_TENANTID || defaultSetting.tenant,

export const msalConfig: Configuration = {
    auth: {
      clientId:   process.env.REACT_APP_AZURE_CLIENT_ID || defaultSetting.clientId,
      authority:process.env.REACT_APP_AZURE_API_ENDPOINT  || defaultSetting.api_endpoint,
      redirectUri:  process.env.REACT_APP_AZURE_REDIRECT_URL || defaultSetting.redirectUri,
   
    navigateToLoginRequestUrl: false, 
  },
  cache: {
      cacheLocation: 'sessionStorage',   
      storeAuthStateInCookie: false,  
  },
  system: {
      loggerOptions: {
          loggerCallback: (level, message, containsPii) => {
              if (containsPii) {
                  return;
              }
              switch (level) {
                  case LogLevel.Error:
                      console.error(message);
                      return;
                  case LogLevel.Info:
                      console.info(message);
                      return;
                  case LogLevel.Verbose:
                      console.debug(message);
                      return;
                  case LogLevel.Warning:
                      console.warn(message);
                      return;
                  default:
                      return;
              }
          },
      },
  },
  }
  export const pca = new PublicClientApplication(msalConfig);
export const tenantId =   process.env.REACT_APP_AZURE_TENANTID ;