import React from 'react';
import { useAppDispatch } from "@app/hooks";

import "./footer-action-item.style.css"
import { ReactComponent as TrashSVG } from "@app/assets/ic_trash.svg";
import SVGIcon from '../common/svgicon.component';

type Props = {
    title: string, 
    icon: string,
    onClick: VoidFunction
}

 const FooterActionItem = ({title, icon, onClick}: Props)=> { 
    return <div className='footer-item-container' onClick={()=>onClick()}>  
        <SVGIcon name={icon}></SVGIcon>
        <label>{title}</label>
    </div>
}


export default  FooterActionItem;