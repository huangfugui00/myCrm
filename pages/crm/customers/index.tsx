import React from 'react'
import Layout from '../Layout'
import Mybutton from '@/components/MyButton'
import DehazeIcon from '@mui/icons-material/Dehaze'; 
import {IconButton} from '@mui/material'
import SearchCustomer from './components/SearchCustomer'
// import MyInput from './components/MyInput'

const index = () => {
    return (
        <div>
            <Layout>
                <main >

                    <div className=" flex justify-between">
                        <span className="text-2xl">客户管理</span>
                        <div className="flex items-center">
                        <Mybutton className="bg-primary-color text-white text-sm px-3 py-1 rounded">新建客户</Mybutton>
                        <IconButton>
                            <DehazeIcon/>
                        </IconButton>
                        </div>
                    </div>
                    <div className="flex">
                        <SearchCustomer placeholder='客户名称/手机/电话'/>
                    </div>
                </main>
            </Layout>
        </div>
    )
}

export default index
