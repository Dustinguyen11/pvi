 
import { Configuration,  PublicClientApplication } from "@azure/msal-browser";

 

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
    }
  }
  export const pca = new PublicClientApplication(msalConfig);
export const tenantId =   process.env.REACT_APP_AZURE_TENANTID ;