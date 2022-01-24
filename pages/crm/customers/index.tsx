import React from 'react'
import Layout from '../Layout'
import Mybutton from '@/components/MyButton'
import DehazeIcon from '@mui/icons-material/Dehaze'; 
import {IconButton} from '@mui/material'
import SearchCustomer from './components/SearchCustomer'
import SelCustomer from './components/SelCustomer'

import { gql, useQuery } from '@apollo/client';
import {customerType} from  'utils/type'
import CustomerTable from './components/CustomerTable'

const GET_CUSTOMERS = gql`
    query customers{
        customers {
            _id
            phone
            name
            url
            email
            come
            mobilePhone
            level
            nextTime
            industry
            principal {
                username
                phone
            }
        }
    }
`

const index = () => {
    const { loading, error, data } =  useQuery(GET_CUSTOMERS)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        console.log(data)
    const customers: customerType[] = data.customers 
   
    return (
        <div>
            <Layout>
                <main  className="">

                    <div className=" flex justify-between">
                        <span className="text-2xl">客户管理</span>
                        <div className="flex items-center">
                        <Mybutton className="bg-primary-color text-white text-sm px-3 py-1 rounded">新建客户</Mybutton>
                        <IconButton>
                            <DehazeIcon/>
                        </IconButton>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className=" flex  justify-between">
                            <SearchCustomer placeholder='客户名称/手机/电话'/>
                            <SelCustomer/>
                        </div>
                    </div>

                    <CustomerTable customers={customers}/>
                  
                </main>
            </Layout>
        </div>
    )
}

export default index
