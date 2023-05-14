import { useEffect, useRef, useState } from "react" 
import { Contents, Rendition } from 'epubjs'

import { ReactReader, ReactReaderStyle, EpubView, EpubViewStyle } from 'react-reader'
import "./ebook.style.css"
import { setRedentionBook } from "@app/redux/bookReducer"
import { useAppDispatch } from "@app/hooks"
const EbookComponent = ()=> {
    const [renditionRef, setRetension] = useState<Rendition | null>(null)
    const renderRef = useRef<ReactReader>(null)
    const dispatch = useAppDispatch()
    const customStyle = {
        ...EpubViewStyle
    }

    useEffect(()=>{


        return () => {
            setRedentionBook(null)
        }
    },[])
    return <div className="epubg-container">
        <div className="title">
            name
        </div>
        <div className="epubg-content">
    <EpubView
    ref={renderRef}
   
    showToc = {false}
 
    epubOptions= {
           {
            flow: "scrolled-doc", 
            allowPopups: true,
            manager: 'continuous', 
           } 
    }
    epubViewStyles={
        customStyle
    }
      url="https://react-reader.metabits.no/files/alice.epub"
      getRendition={rendition => {
        setRetension(rendition)

        rendition.on('selected', (r :any,c :any)=>console.log(r))
        dispatch( setRedentionBook(rendition))
        rendition.themes.default({
          '::selection': {
            background: 'orange'
          }
          
        }) 
     
      }}
    />
    </div>
  </div>
}


export default EbookComponent