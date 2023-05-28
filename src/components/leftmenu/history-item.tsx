import React from 'react'; 
import { ReactComponent as TrashSVG } from "@app/assets/ic_trash.svg";

import "./leftmenu.style.css"
type Props = {
    title: string,
    showRemove:  boolean,
    onClick: VoidFunction
}

 const HistoryItem = ({title, showRemove , onClick}: Props)=> {
   
    return <div className='history-item-container' onClick={()=>onClick()}>
           <label>{title}</label>

           {showRemove ?  <div>
                     <TrashSVG/>
                    </div>: null }
           
    </div>
}


export default  HistoryItem;