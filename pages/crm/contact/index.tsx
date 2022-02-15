
import React,{useState,useEffect} from 'react'
import Layout from '@/components/Layout'
import DehazeIcon from '@mui/icons-material/Dehaze'; 
import {IconButton} from '@mui/material'
import SearchItem from '@/components/crm/SearchItem'
import SelButtons from '@/components/crm/SelButtons'

import {useQuery ,useMutation} from '@apollo/client';
import {customerType} from  'utils/type'
import {GET_CUSTOMERS,DELETE_CUSTOMER,UPDATE_CUSTOMER,CREATE_CUSTOMERS} from 'utils/graphql'
import ShowTable from '@/components/crm/ShowTable'
import EditTable from '@/components/crm/EditTable'
import CreateTable from '@/components/crm/CreateTable'
import MyModal from '@/components/MyModal'
import {toastAlert} from '@/components/ToastAlert'

import {useSelector} from 'react-redux'
import {IRootState } from 'store'
 

const buttonItems=[
    {
        keyName:'all',
        buttonName:'全部联系人'
    },
    {
        keyName:'my',
        buttonName:'我负责的联系人'
    },
    {
        keyName:'subordinate',
        buttonName:'下属负责的联系人'
    },
]


const columns=[
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
     
    },
    {
        title:'网址',
        dataIndex:'url',
     
    },
    {
        title:'职务',
        dataIndex:'jobTitle',
      
    },
    {
        title:'性别',
        dataIndex:'gender',
    
    },
    {
        title:'手机',
        dataIndex:'mobilePhone',
      
    },
    {
        title:'下次联系时间',
        dataIndex:'nextTime',
        
    },
    {
        title:'负责人',
        dataIndex:'principal',
    },
    {
        title:'地址',
        dataIndex:'address',
    },
    {
        title:'备注',
        dataIndex:'remark',
    }
  ];


const index = () => {
    const authReducer = useSelector((state:IRootState) => state.authReducer)
    const [searchItem,setSearchItem] = useState<string>('')
    const [btnSelType,setBtnSelType] = useState('all')
    const [customers,setCustomers] = useState<customerType[]>([])
    const [customersApi,setCustomersApi] = useState<customerType[]>([])
    const [customerCheckedId,setCustomerCheckedId] = useState('')
    const [open,handleClose] = useState(false)
    const [openCreate,handleOpenCreate] = useState(false)

    // //右侧button组
    const {  data } =  useQuery(GET_CUSTOMERS)
   
    const [deleteCustomer]  = useMutation(DELETE_CUSTOMER)
    const [updateCustomer]  = useMutation(UPDATE_CUSTOMER)
    const [createCustomer] = useMutation(CREATE_CUSTOMERS)

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
    },[customers,searchItem,btnSelType])
    
    const handleClickCheckBox=(id:string)=>{
        if(customerCheckedId===id){
            setCustomerCheckedId('')
        }
        else{
            setCustomerCheckedId(id)
        }
    }

    //全部客户,我的客户，下属的客户事件
    const handleBtnClick = (nextBtnSelType:string)=>{
        if(nextBtnSelType===btnSelType){
            setBtnSelType('all')
        }else{
            setBtnSelType(nextBtnSelType)
        }
    }
 
    
    const filterCustomType = (customer:customerType) :boolean=>{
        if(btnSelType==='all'){
            return true
        }
        if(btnSelType==='my'){
            return customer.principal?.username===authReducer.user.username
        }
        if(btnSelType==='subordinate'){
            return customer.principal?.username!==authReducer.user.username
        }
        return false
    }

    const handleUpdate =async (customer:customerType)=>{
        try{
            await updateCustomer( {
                variables:{...customer},
            })
        }
        catch(err:any){
            toastAlert(err.message) 
        }
        handleClose(false)
    }

    const handleCreate =async (customer:customerType)=>{
        try {
            await createCustomer({
                variables:{...customer},
                update: (store, { data })=>{
                    const customerData:any = store.readQuery({
                        query: GET_CUSTOMERS
                        });
                    store.writeQuery({
                        query: GET_CUSTOMERS,
                        data: {
                            getCustomers: customerData.getCustomers.concat(data.createCustomer)
                        }
                    });
                }
            })        
        } catch (error:any) {
            toastAlert(error.message)             
        }
        handleOpenCreate(false)

    

        // handleUpdate(localCustomer)
    }
    
    const handleDelete =async()=>{
        try{
            if(customerCheckedId){
                console.log('delete customer')
              await  deleteCustomer( {
                    variables:{_id:customerCheckedId},
                    update: (store, { data })=>{
                        const customerData:any = store.readQuery({
                            query: GET_CUSTOMERS
                            });
                        store.writeQuery({
                            query: GET_CUSTOMERS,
                            data: {
                                getCustomers: customerData.getCustomers.filter((customer:any)=>customer._id!==data.deleteCustomer._id)
                            }
                        });
                    }
                })
            }
        }
        catch(err:any){
            toastAlert(err.message) 
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
                <main>

                    <div className=" flex justify-between">
                        <span className="text-2xl">联系人管理</span>
                        <div className="flex  items-center">
                        <button onClick={()=>handleOpenCreate(true)} className="bg-primary-color text-white text-sm px-3 py-2 rounded">新建联系人</button>
                        <IconButton>
                            <DehazeIcon/>
                        </IconButton>
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        {
                        customerCheckedId?
                        <div className="flex items-center gap-2 h-9">
                            <button onClick={()=>handleClose(true)} className="bg-primary-color text-white text-sm px-3 py-2 rounded">编辑</button>
                            <button onClick={()=>handleDelete()} className="bg-danger-color  text-white text-sm px-3 py-2 rounded">删除</button>
                        </div>
                        :
                        <div className=" flex  justify-between">
                        <SearchItem placeholder='联系人名称/手机/电话' value={searchItem} setValue={setSearchItem}/>
                        <SelButtons items={buttonItems} keyName={btnSelType} handleBtnClick={handleBtnClick}/>
                        </div>
                        }
                    </div>

                    <ShowTable columns={columns} contents={customersApi} handleClickCheckBox={handleClickCheckBox} itemCheckId={customerCheckedId}/>
                    
                    {/* <MyModal open={open} handleClose={()=>handleClose(false)}>
                        <EditTable customer={customersApi.find(customer=>customer._id===customerCheckedId)} handleUpdate={handleUpdate}/>
                    </MyModal>
                   
                    <MyModal open={openCreate} handleClose={()=>handleOpenCreate(false)}>
                        <CreateTable handleCreate={handleCreate}/>
                    </MyModal> */}

                </main>
            </Layout>
        </div>
    )
}

export default index

