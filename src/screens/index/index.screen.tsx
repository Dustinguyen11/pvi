

import React, { useCallback, useMemo, useState } from 'react';
import "../dashboard/dashboard.style.css"
import "./index.style.css"

import { useMsal } from '@azure/msal-react';
import DefaultLayout from '@app/layouts/default.layout';
import DashboardtLayout from '@app/layouts/dashboard.layout';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import ChatBox from '@app/components/chatbox/chatbox.component';
import EbookComponent from '@app/components/ebook/ebook.component';
import { Route, Routes } from 'react-router-dom';
import { AppTocModel } from '@app/network/model/toc.model';
import { bookJumpTo } from '@app/redux/bookReducer';
import { MessageDocuments } from '@app/network/model/message.model';
 
const TocItem = ({label,href, subitems, onClick} : {label: string, href: string, subitems: Array<AppTocModel> | undefined | null, onClick: ((href: string)=>void)}) => {
    return    <div className="toc-item-container">
            <button onClick={()=> {
              onClick(href)
            }} >
            {label}
            </button>
            {subitems && subitems.length > 0 && (
            <div style={{ paddingLeft: 10 }}>
                {subitems.map((item, i) => (
                <TocItem key={i} label={item.label} href= {item.href} subitems={item.subitems} 
                  onClick={(href)=>onClick(href)}
                />
                ))}
            </div>
            )}
        </div>
}

const Index = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isShowBook = useAppSelector((state)=>state.book.showBook)
    const books = useAppSelector((state)=>state.book.books)
    const [book, setBook] = useState<MessageDocuments | null>(null)
    const [tocs, setTocs] = useState<Array<AppTocModel>>()

    const setLocation = (href: string) => {
      dispatch(bookJumpTo(href))
    }

   const renderToc = (tocs: Array<AppTocModel>) => { 
        return (
          <div className="toc-container">
            <div >
              <div>
                {
                tocs.map((item, i) => (
                  <TocItem
                    {...item}
                    onClick={(href)=>setLocation(href)}
                    key={i}
                  //  setLocation={this.setLocation}
                   
                  />
                )
                )}
              </div>
            </div> 
          </div>
        )
      }


      const changeBook = useCallback((book: MessageDocuments ) => {
        setBook(book)
      }, [setBook])

      const renderListbook = useCallback((books: MessageDocuments[]) => {
        return <ol className='index-box-list'>
              {
                books.map((m)=><li id={m.id} onClick={()=>changeBook(m)}>{m.title}</li>)
              }
        </ol>
    }, [])

    return  <div className='dashboard-content'>
     <div>
        <div className='index-book-title'>
            {book == null ? "Documents" : book?.title}
        </div>
       {
       ( book == null) ? renderListbook(books) : renderToc(tocs || [])
       }
     </div>
     <div className={isShowBook ? "d-book show" : "d-book hide"}>
     <EbookComponent bookName={book?.title} bookURL={book?.url} onChangeTocs={(tocs)=>setTocs(tocs)}/>
     </div>
    </div>
}
export default () => {  
    return <DashboardtLayout> 
        <Index/> 
    </DashboardtLayout>
}