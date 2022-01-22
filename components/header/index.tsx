import React from 'react'
import Image from 'next/image'
import BlurOnIcon from '@mui/icons-material/BlurOn';
import NavLists from './NavLists'
import {navItemType} from 'utils/type'



type headerProp={
    navLists:navItemType[]
}

const Header:React.FC<headerProp> = (props) => {
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
    
        
            <div>header</div>
        </div>
    )
}

export default Header
