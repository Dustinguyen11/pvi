import React, { useState } from 'react'; 
import "./dashboard.styles.css"
import DashboardLeftMenu from '@app/components/leftmenu/leftmenu.component';
import * as Tooltip from '@radix-ui/react-tooltip';
import SVGIcon from '@app/components/common/svgicon.component';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { changeShowLeft } from '@app/redux/layoutReducer';
import { changeShowBook } from '@app/redux/bookReducer';


interface Props {
    children: React.ReactNode
}
const DashboardLayout: React.FunctionComponent<Props> = (props:Props) => {
  //  const [isShowMenu, showMenu] = useState(false)
    const dispatch = useAppDispatch()
    const isShowMenu = useAppSelector((state)=>state.layout.showLeft);
    const isShowBook = useAppSelector((state)=>state.book.showBook);

    const showMenu = (value: boolean)=>dispatch(changeShowLeft(value))
    const showBook = (value: boolean)=>dispatch(changeShowBook(value))

    return <div className='layout-container'>
        <div className='layout-top'>
            <div className='btn-menu' onClick={()=>{
                showMenu(!isShowMenu)
                showBook(false)
            }}>
                <SVGIcon name='index'></SVGIcon>
            </div>

            <div className='btn-book' onClick={()=>{
                showMenu(false) 
                showBook(!isShowBook)
            }}>
                <SVGIcon name='setting'></SVGIcon>
            </div>
            
        </div>
        <div className={isShowMenu ? "layout-left show" : "layout-left hide"}>
            <DashboardLeftMenu/>
        </div>
        
       <div className={isShowMenu ? "layout-left-background show" : "layout-left-background hide"}  onClick={()=>{
                showMenu(!isShowMenu)
        }}></div>
        
        <div className ="layout-content">
        
        <Tooltip.Provider>
        {props.children}
        </Tooltip.Provider>
        </div>
        </div>
}
  
export default DashboardLayout