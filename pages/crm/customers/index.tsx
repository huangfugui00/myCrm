import React,{useState,useEffect} from 'react'
import Layout from '../Layout'
import Mybutton from '@/components/MyButton'
import DehazeIcon from '@mui/icons-material/Dehaze'; 
import {IconButton} from '@mui/material'
import SearchCustomer from './components/SearchCustomer'
import SelCustomer from './components/SelCustomer'

import {useQuery ,useMutation} from '@apollo/client';
import {customerType} from  'utils/type'
import {GET_CUSTOMERS,DELETE_CUSTOMER} from 'utils/graphql'
import CustomerTable from './components/CustomerTable'






const index = () => {

    const [searchItem,setSearchItem] = useState<string>('')
    const [btnCustomerType,setBtnCustomerType] = useState<'all' | 'my' | 'subordinate' >('all')
    const [customers,setCustomers] = useState<customerType[]>([])
    const [customersApi,setCustomersApi] = useState<customerType[]>([])
    const [customerCheckedId,setCustomerCheckedId] = useState('')
    
    // //右侧button组
    const {  data } =  useQuery(GET_CUSTOMERS)
    const [deleteCustomer, { loading, error }]  = useMutation(DELETE_CUSTOMER)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    useEffect(() => {
      if(data){
        //   console.log('fetch data form graphql')
          let copyCustomers:customerType[] = data.customers
        setCustomers(copyCustomers)
      }
    }, [data])

    //fetch数据或者search内容，客户类型更改触发，更改显示的客户
    useEffect(()=>{ 
        let copyCustomers = customers
        copyCustomers = copyCustomers.filter((customer)=>customer.phone?.includes(searchItem) || customer.name?.includes(searchItem) || customer.email?.includes(searchItem) || customer.mobilePhone?.includes(searchItem))
        copyCustomers = copyCustomers.filter((customer)=>filterCustomType(customer))
        setCustomersApi(copyCustomers)
    },[customers,searchItem,btnCustomerType])
    
    const handleClickCheckBox=(id:string)=>{
        if(customerCheckedId===id){
            setCustomerCheckedId('')
        }
        else{
            setCustomerCheckedId(id)
        }
    }

    //全部客户,我的客户，下属的客户事件
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
            return customer.principal?.username==='Richard'
        }
        if(btnCustomerType==='subordinate'){
            return customer.principal?.username!=='Richard'
        }
        return false
    }

    
    const handleDelete = ()=>{
        if(customerCheckedId){
            deleteCustomer( {
                variables:{id:customerCheckedId},
                update: (store, { data })=>{
                    const customerData:any = store.readQuery({
                        query: GET_CUSTOMERS
                        });
                    store.writeQuery({
                        query: GET_CUSTOMERS,
                        data: {
                            customers: customerData!.customers.filter((customer:any)=>customer._id!==data.deleteCustomer._id)
                        }
                    });
                }
            })
        }
    }
   
   if(!customers){
       return<></>
   }
   
   
    return (
        <div>
            <Layout>
                <main  className="">

                    <div className=" flex justify-between">
                        <span className="text-2xl">客户管理</span>
                        <div className="flex items-center">
                        <Mybutton className="bg-primary-color text-white text-sm px-3 py-2 rounded">新建客户</Mybutton>
                        <IconButton>
                            <DehazeIcon/>
                        </IconButton>
                        </div>
                    </div>
                    <div className="mt-6">
                        {
                        customerCheckedId?
                        <div className="flex items-center gap-2 h-9">
                            <Mybutton className="bg-primary-color text-white text-sm px-3 py-2 rounded">编辑</Mybutton>
                            <Mybutton onClick={()=>handleDelete()} className="bg-red-700  text-white text-sm px-3 py-2 rounded">删除</Mybutton>
                        </div>
                        :
                        <div className=" flex  justify-between">
                        <SearchCustomer placeholder='客户名称/手机/电话' value={searchItem} setValue={setSearchItem}/>
                        <SelCustomer customerType={btnCustomerType}  handleBtnClick={handleBtnClick}/>
                        </div>
                        }
                      
                    </div>

                    <CustomerTable customers={customersApi} handleClickCheckBox={handleClickCheckBox} customerCheckedId={customerCheckedId}/>
                  
                </main>
            </Layout>
        </div>
    )
}

export default index
