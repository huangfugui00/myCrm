import React,{useEffect} from 'react'
import Header from 'components/header'
import StickyTop from '@/components/StickyTop'
import { useDispatch, useSelector } from 'react-redux'
import {IRootState} from 'utils/store'
import {useRouter} from 'next/router'
import {ToastAlert,toastAlert} from '@/components/ToastAlert'

const navLists=[
    {
        label:'仪表盘',
        path:'/crm/workbench',
    },
    {
        label:'客户',
        path:'/crm/customers',
    },
]


type LayoutProp={
    children:React.ReactNode,
}

const Layout:React.FC<LayoutProp> = (props) => {
    const authReducer = useSelector((state:IRootState) => state.authReducer)
    const { token } = authReducer
    const router = useRouter()
    useEffect(() => {
        if(!token){
            router.push('/login')
        }
    }, [token])
    return (
        <div>
            <StickyTop>
            <div className=" py-4 border-b ">
                <Header navLists={navLists}/>
            </div>
            </StickyTop>
            <div className="p-4">
            {props.children}
            </div>
            <ToastAlert/>        
        </div>
    )
}

export default Layout
