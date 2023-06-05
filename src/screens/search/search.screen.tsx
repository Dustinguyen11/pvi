

import React, { useCallback, useState } from 'react';
import "../dashboard/dashboard.style.css"
import "./search.style.css"

import { useMsal } from '@azure/msal-react';
import DefaultLayout from '@app/layouts/default.layout';
import DashboardtLayout from '@app/layouts/dashboard.layout';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import ChatBox from '@app/components/chatbox/chatbox.component';
import EbookComponent from '@app/components/ebook/ebook.component';
import { Route, Routes } from 'react-router-dom';
import SVGIconComponent from '@app/components/common/svgicon.component';


const Search = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isShowBook = useAppSelector((state)=>state.book.showBook)
    const [searchText, setSearchText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const onSearch = useCallback((text : String)=> {
        if (isLoading) {
            return
        }
        setIsLoading(true)
 
        setTimeout(()=> {
            setIsLoading(false)
        },3000)
    }, [])

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>)=> {
        if (event.keyCode  != 13) {
             return
        }
        onSearch(searchText)
    }
    return  <div className='dashboard-content'> 
     <div>
        <div className='s-title'>
        Traditional Search
        </div>
        <div className='s-input-container'>
            <input onKeyDown={onKeyDown} onChange={(e)=>setSearchText(e.target.value)}/>
            <div className='s-input-action' onClick={()=>onSearch(searchText)}>
            <SVGIconComponent name='search'></SVGIconComponent>
            </div>
        </div>
        {
            isLoading? <div className='s-loading'>  <div data-uk-spinner="ratio: 0.6"/> </div> : null
        }
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