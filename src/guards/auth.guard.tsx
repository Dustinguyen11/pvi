import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { msalConfig, tenantId } from "@app/azure/configs"
import { AccountInfo } from "@azure/msal-browser";
import { IdTokenClaims } from "@app/types";

 
export type RouteGuardProps = {roles?: string[] }

const RouteGuard: React.FC<RouteGuardProps> = (props: RouteGuardProps) => {
  const { instance } = useMsal();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [message, setMessage] = useState("");
  const onLoad = async () => {
    const currentAccount: AccountInfo | null | undefined = instance.getActiveAccount();

    if (currentAccount) {
      if (currentAccount.tenantId == tenantId) {
        const idTokenClaims = currentAccount.idTokenClaims as IdTokenClaims;
        if (idTokenClaims && idTokenClaims.aud == msalConfig.auth.clientId && idTokenClaims["roles"]) {
          const intersection = props.roles?.filter((role: any) => idTokenClaims["roles"].includes(role));
          if ((intersection?.length || 0) > 0) {
            setIsAuthorized(true);
          } else {
            setMessage("You don't have the required role to view this page. Please contact site administrator.");
          }
        } else {
          setMessage("The application you authorized with cannot access this page. Please contact site administrator.");
        }
      } else {
        setMessage("Your organization does not have access this content.");
      }
    }
  };
useEffect(() => {
    onLoad();
  });  

  return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
 
};
export default RouteGuard;