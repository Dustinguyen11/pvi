import React from 'react'; 
import "./default.styles.css"


interface Props {
    children: React.ReactNode
}
const DefaultLayout: React.FunctionComponent<Props> = (props:Props) => {

    return <div className='layoutContainer'>
        {props.children}
        </div>
}
  
export default DefaultLayout