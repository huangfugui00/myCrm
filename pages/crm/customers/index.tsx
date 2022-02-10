import React,{useState,useEffect} from 'react'
import Layout from '../Layout'
import Mybutton from '@/components/MyButton'
import DehazeIcon from '@mui/icons-material/Dehaze'; 
import {IconButton} from '@mui/material'
import SearchCustomer from './components/SearchCustomer'
import SelCustomer from './components/SelCustomer'

import {useQuery ,useMutation} from '@apollo/client';
import {customerType} from  'utils/type'
import {GET_CUSTOMERS,DELETE_CUSTOMER,UPDATE_CUSTOMER} from 'utils/graphql'
import CustomerTable from './components/CustomerTable'
import EditCustomer from './components/EditCustomer'
import CreateCustomer from './components/CreateCustomer'
import MyModal from '@/components/MyModal'


const index = () => {
    const [searchItem,setSearchItem] = useState<string>('')
    const [btnCustomerType,setBtnCustomerType] = useState<'all' | 'my' | 'subordinate' >('all')
    const [customers,setCustomers] = useState<customerType[]>([])
    const [customersApi,setCustomersApi] = useState<customerType[]>([])
    const [customerCheckedId,setCustomerCheckedId] = useState('')
    const [open,handleClose] = useState(false)
    const [openCreate,handleOpenCreate] = useState(false)

    // //右侧button组
    const {  data } =  useQuery(GET_CUSTOMERS)
   
    const [deleteCustomer]  = useMutation(DELETE_CUSTOMER)
    const [updateCustomer]  = useMutation(UPDATE_CUSTOMER)
    useEffect(() => {
      if(data){
        console.log(data)
        let copyCustomers:customerType[] = data.getCustomers
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

    const handleUpdate = (customer:customerType)=>{
        updateCustomer( {
            variables:{...customer},
        })
        handleClose(false)
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
                            customers: customerData.customers.filter((customer:any)=>customer._id!==data.deleteCustomer._id)
                        }
                    });
                }
            })
        }
    }
   
   if(!customers){
       return<></>
   }
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;
   
   
    return (
        <div>
            <Layout>
                <main  className="">

                    <div className=" flex justify-between">
                        <span className="text-2xl">客户管理</span>
                        <div className="flex items-center">
                        <Mybutton onClick={()=>handleOpenCreate(true)} className="bg-primary-color text-white text-sm px-3 py-2 rounded">新建客户</Mybutton>
                        <IconButton>
                            <DehazeIcon/>
                        </IconButton>
                        </div>
                    </div>
                    <div className="mt-6">
                        {
                        customerCheckedId?
                        <div className="flex items-center gap-2 h-9">
                            <Mybutton onClick={()=>handleClose(true)} className="bg-primary-color text-white text-sm px-3 py-2 rounded">编辑</Mybutton>
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
                    
                    <MyModal open={open} handleClose={()=>handleClose(false)}>
                        <EditCustomer customer={customersApi.find(customer=>customer._id===customerCheckedId)} handleUpdate={handleUpdate}/>
                    </MyModal>
                   
                    <MyModal open={openCreate} handleClose={()=>handleOpenCreate(false)}>
                        <CreateCustomer />
                    </MyModal>
                </main>
            </Layout>
        </div>
    )
}

export default index
