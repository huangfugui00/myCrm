import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
type NavItemProp={
    list:{
        label:string,
        path:string,
    }
}


const NavItem:React.FC<NavItemProp>=(props)=>{
    const router = useRouter()
    const {list} = props
    return(
        <div>
            <Link href={list.path}>
                <a className={` text-sm ${router.asPath===list.path && 'text-primary-color '}`}>
                    {list.label}
                </a>
            </Link>
        </div>
    )
}

type NavListsProp={
    lists:{
        label:string,
        path:string,
    }[]
}

const NavLists:React.FC<NavListsProp> = (props) => {
    const {lists} = props
    if(lists.length<=0){
        return<></>
    }
    return (
        <div className="flex items-center gap-4">
            {lists.map((list)=>
                <NavItem list={list} key={list.label}/>
            )}
        </div>
    )
}

export default NavLists
