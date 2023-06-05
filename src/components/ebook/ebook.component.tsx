import { useEffect, useRef, useState } from "react"
import { Contents, Rendition } from 'epubjs'

import { ReactReader, ReactReaderStyle, EpubView, EpubViewStyle, IToc } from 'react-reader'
import "./ebook.style.css"
import { book, setRedentionBook } from "@app/redux/bookReducer"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { AppTocModel } from "@app/network/model/toc.model"


type Props = {
  bookName: string,
  bookURL: string | null | undefined,
  onChangeTocs: ((object: Array<AppTocModel>) => void) | null | undefined
  
}


const defaultProps: Props = {
  onChangeTocs: undefined,
  bookName: "",
  bookURL: undefined,
}

const EbookComponent = ({onChangeTocs, bookName, bookURL} :  Props
) => {
 // const bookName = useAppSelector((state) => state.book.bookName)
  const bookLocation = useAppSelector((state) => state.book.bookLocation)
  const bookRenditionRef = useAppSelector((state) => state.book.redentionBook)
  const [location, setLocation] = useState<string | number>(1)

  const [renditionRef, setRetension] = useState<Rendition | null>(null)
  const renderRef = useRef<ReactReader>(null)
  const dispatch = useAppDispatch()
  const customStyle = {
    ...EpubViewStyle
  }

  useEffect(() => {
    
    return () => {
      setRedentionBook(null)
    }
  }, [])

  useEffect(()=> {
    if ( bookLocation == null || bookRenditionRef != renditionRef) {
      return
    }
    setLocation(bookLocation)
  }, [bookLocation])
  return <div className="epubg-container">
    <div className="title">
      {bookName}
    </div>
    <div className="epubg-content">
      <EpubView
       // location={location}
        ref={renderRef}
        tocChanged={(toc) => {
          var anyTocs = toc as any
          let listTocs = anyTocs as Array<AppTocModel>;
          if (onChangeTocs != null) {
            onChangeTocs(listTocs)
          } 
        }}
        showToc={false}
        epubInitOptions={{
          openAs: 'epub'
        }}
        epubOptions={
          { 
            flow: "scrolled",
            allowPopups: true,
            manager: 'continuous', width: "100%", height: "100%"
          }
        }
        epubViewStyles={
          customStyle
        }
        url= {bookURL || ""}
        getRendition={rendition => {
          setRetension(rendition) 
          rendition.display()
          rendition.on('selected', (r: any, c: any) => console.log(r))
          dispatch(setRedentionBook(rendition))
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

EbookComponent.defaultProps = defaultProps;


export default EbookComponent