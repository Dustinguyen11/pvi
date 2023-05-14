import { useRef, useState } from "react" 
import { Contents, Rendition } from 'epubjs'

import { ReactReader, ReactReaderStyle, EpubView, EpubViewStyle } from 'react-reader'
import "./ebook.style.css"
const EbookComponent = ()=> {
    const [renditionRef, setRetension] = useState<Rendition | null>(null)
    const renderRef = useRef<ReactReader>(null)
    
    const customStyle = {
        ...EpubViewStyle
    }

    console.log(EpubViewStyle)
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
            allowPopups: false,
            manager: 'continuous', 
           } 
    }
    epubViewStyles={
        customStyle
    }
      url="https://react-reader.metabits.no/files/alice.epub"
      getRendition={rendition => {
        setRetension(rendition)
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