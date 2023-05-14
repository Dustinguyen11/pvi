import React from 'react'; 
import { ReactComponent as TrashSVG } from "@app/assets/ic_trash.svg";

import "./leftmenu.style.css"
type Props = {
    title: string,
    showRemove:  boolean
}

 const HistoryItem = ({title, showRemove }: Props)=> {
   
    return <div className='history-item-container'>
           <label>{title}</label>

           {showRemove ?  <div>
                     <TrashSVG/>
                    </div>: null }
           
    </div>
}


export default  HistoryItem;