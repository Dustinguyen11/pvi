

import React from 'react';
import "../dashboard/dashboard.style.css"
import { useMsal } from '@azure/msal-react';
import DefaultLayout from '@app/layouts/default.layout';
import DashboardtLayout from '@app/layouts/dashboard.layout';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import ChatBox from '@app/components/chatbox/chatbox.component';
import EbookComponent from '@app/components/ebook/ebook.component';
import { Route, Routes } from 'react-router-dom';


const Search = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isShowBook = useAppSelector((state)=>state.book.showBook)
    return  <div className='dashboard-content'>
     <div>
        <div>
        Traditional Search
        </div>
        <div>
            <input/>
        </div>
     </div>
     <div className={isShowBook ? "d-book show" : "d-book hide"}>
     <EbookComponent/>
     </div>
    </div>
}
export default () => {  
    return <DashboardtLayout>
        
        <Search/>

    </DashboardtLayout>
}