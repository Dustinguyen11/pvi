

import React, { useCallback, useState } from 'react';
import "../dashboard/dashboard.style.css"
import "./settings.style.css"

import { useMsal } from '@azure/msal-react';
import DefaultLayout from '@app/layouts/default.layout';
import DashboardtLayout from '@app/layouts/dashboard.layout';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import ChatBox from '@app/components/chatbox/chatbox.component';
import EbookComponent from '@app/components/ebook/ebook.component';
import { Route, Routes } from 'react-router-dom';
import SVGIconComponent from '@app/components/common/svgicon.component';


const Settings = () => {
    const { t } = useTranslation(); 
    const [isLoading, setIsLoading] = useState(false)
 
    return  <div className='dashboard-content'> 
     <div>
        <div className='s-title'>
            Settings
        </div>
      
     </div>
    
    </div>
}
export default () => {  
    return <DashboardtLayout>
        
        <Settings/>

    </DashboardtLayout>
}