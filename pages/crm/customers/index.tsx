import React,{useState,useEffect} from 'react'
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


    const [searchItem,setSearchItem] = useState<string>('')
    const [btnCustomerType,setBtnCustomerType] = useState<'all' | 'my' | 'subordinate' >('all')

    // //右侧button组
    const { loading, error, data } =  useQuery(GET_CUSTOMERS)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    

    const handleBtnClick = (nextBtnCustomerType:'all' | 'my' | 'subordinate')=>{
        if(nextBtnCustomerType===btnCustomerType){
            setBtnCustomerType('all')
        }else{
            setBtnCustomerType(nextBtnCustomerType)
        }
    }
    
    const filterCustomType = (customer:customerType) :boolean=>{
        if(btnCustomerType==='all'){
            return true
        }
        if(btnCustomerType==='my'){
            return customer.principal.username==='Richard'
        }
        if(btnCustomerType==='subordinate'){
            return customer.principal.username!=='Richard'
        }
        return false
    }

    let customers: customerType[]=data.customers    
    customers = customers.filter((customer)=>customer.phone?.includes(searchItem) || customer.name?.includes(searchItem) || customer.email?.includes(searchItem) || customer.mobilePhone?.includes(searchItem))
    customers = customers.filter((customer)=>filterCustomType(customer))
   
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
                            <SearchCustomer placeholder='客户名称/手机/电话' value={searchItem} setValue={setSearchItem}/>
                            <SelCustomer customerType={btnCustomerType}  handleBtnClick={handleBtnClick}/>
                        </div>
                    </div>

                    <CustomerTable customers={customers}/>
                  
                </main>
            </Layout>
        </div>
    )
}

export default index
