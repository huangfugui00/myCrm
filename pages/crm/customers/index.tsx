import React,{useState,useEffect} from 'react'
import Layout from '@/components/Layout'
import Mybutton from '@/components/MyButton'
import DehazeIcon from '@mui/icons-material/Dehaze'; 
import {IconButton} from '@mui/material'
import SearchCustomer from '@/components/customers/SearchCustomer'
import SelCustomer from '@/components/customers/SelCustomer'

import {useQuery} from '@apollo/client';
import {customerType} from  'utils/type'
import CustomerTable from '@/components/customers/CustomerTable'
import EditCustomer from '@/components/customers/EditCustomer'
import CreateCustomer from '@/components/customers/CreateCustomer'
import MyModal from '@/components/MyModal'
import {toastAlert} from '@/components/ToastAlert'
import ModalLoading from '@/components/ModalLoading'
import {useSelector} from 'react-redux'
import {IRootState } from 'store'
import {GET_CUSTOMERS} from 'graphql/customer'
import {updateCustomerSer,createCustomerSer,deleteCustomerSer} from 'services/customerSer'
 
const index = () => {
    const authReducer = useSelector((state:IRootState) => state.authReducer)
    const [loading,setLoading] = useState(false)
    const [searchItem,setSearchItem] = useState<string>('')
    const [btnCustomerType,setBtnCustomerType] = useState<'all' | 'my' | 'subordinate' >('all')
    const [customers,setCustomers] = useState<customerType[]>([])
    const [customersApi,setCustomersApi] = useState<customerType[]>([])
    const [customerCheckedId,setCustomerCheckedId] = useState('')
    const [open,handleClose] = useState(false)
    const [openCreate,handleOpenCreate] = useState(false)

    // //右侧button组
   
    const customersQuery =useQuery(GET_CUSTOMERS)

    useEffect(() => {
        if(customersQuery?.data){
            let copyCustomers:customerType[] = customersQuery?.data.getCustomers
            setCustomers(copyCustomers)
        }
    }, [customersQuery])

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
            return customer.principal?.username===authReducer.user.username
        }
        if(btnCustomerType==='subordinate'){
            return customer.principal?.username!==authReducer.user.username
        }
        return false
    }

    const handleUpdate =async (customer:customerType)=>{
        try{
            setLoading(true)
            await updateCustomerSer(customer)
            handleClose(false)
        }
        catch(err:any){
            toastAlert(err.message) 
        }
        finally{
            setLoading(false)
        }
    }

    const handleCreate =async (customer:customerType)=>{
        try {
            setLoading(true)
            await createCustomerSer(customer)   
            handleClose(false)
            handleOpenCreate(false)
        } catch (error:any) {
            toastAlert(error.message)             
        }
        finally{
            setLoading(false)
        }
    }
    
    const handleDelete =async()=>{
        try{
            if(customerCheckedId){
                setLoading(true)
                await deleteCustomerSer(customerCheckedId)
            }
        }
        catch(err:any){
            toastAlert(err.message) 
        }
        finally{
            setLoading(false)
        }
    }
   
   if(loading){
       return  <ModalLoading loading={loading}/>
   }
   
   
    return (
        <div>
            <Layout>
                <main>

                    <div className=" flex justify-between">
                        <span className="text-2xl">客户管理</span>
                        <div className="flex  items-center">
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
                            <Mybutton onClick={()=>handleDelete()} className="bg-danger-color  text-white text-sm px-3 py-2 rounded">删除</Mybutton>
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
                        <CreateCustomer handleCreate={handleCreate}/>
                    </MyModal>

                </main>
            </Layout>
        </div>
    )
}

export default index
