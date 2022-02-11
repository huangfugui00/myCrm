import React from 'react'
import Image from 'next/image'
import BlurOnIcon from '@mui/icons-material/BlurOn';
import NavLists from './NavLists'
import {navItemType} from 'utils/type'
import {useDispatch} from 'react-redux'
import { logoutAct } from 'actions/authAct'




type headerProp={
    navLists:navItemType[]
}

const Header:React.FC<headerProp> = (props) => {
    const dispatch = useDispatch()
    const handleSignOut = ()=>{
        localStorage.removeItem('token')
        dispatch(logoutAct())
    }

    return(
        <div className="flex justify-between">
            <div className="flex gap-4 items-center">
                {/*  menu  */}
                <BlurOnIcon/>
                {/* brand */}
                <div className="mr-4">
                    <span className="text-xl ">CRM</span>
                </div>
                <NavLists  lists={props.navLists}/>
            </div>
    
        
            <div className="mr-4">
                <button className="text-white bg-red-500 px-4 py-1 rounded" onClick={()=>handleSignOut()}>登出</button>
            </div>
        </div>
    )
}

export default Header
