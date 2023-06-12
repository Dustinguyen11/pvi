import React, { useState } from 'react'; 
import { ReactComponent as TrashSVG } from "@app/assets/ic_trash.svg";

import "./leftmenu.style.css"
type Props = {
    title: string,
    showRemove:  boolean,
    onClick: VoidFunction
    onRemove: VoidFunction,
    isLoading: boolean
}

 const HistoryItem = ({title, showRemove , onClick, onRemove, isLoading}: Props)=> {
    let [loading, setLoading] = useState(false)
    return <div className='history-item-container'>
           <label  onClick={()=>onClick()}>{title}</label>

           {showRemove ?  <div onClick={()=>{
                        if (loading) {
                            return
                        }
                setLoading(true)
                onRemove()
            }}>
                    { !(loading || isLoading) ? <TrashSVG/> :  <div className='d-spinner' data-uk-spinner="ratio: 0.6"/>  }
            </div>: null }
           
    </div>
}


export default  HistoryItem;