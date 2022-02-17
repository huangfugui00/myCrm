
import React,{useState,useEffect} from 'react'
import Layout from '@/components/Layout'
import DehazeIcon from '@mui/icons-material/Dehaze'; 
import {IconButton} from '@mui/material'
import SearchItem from '@/components/crm/SearchItem'
import SelButtons from '@/components/crm/SelButtons'

import {useQuery ,useMutation} from '@apollo/client';
import {contactType,customerType,updateContactInput,createContactInput} from  'utils/type'
import {GET_CONTACTS,DELETE_CONTACT,UPDATE_CONTACT,CREATE_CONTACT} from 'graphql/contact'
import {GET_CUSTOMERS_NAME} from 'graphql/customer'
import CreateContact from '@/components/contact/CreateContact'
import EditContact from '@/components/contact/EditContact'
import ShowTable from '@/components/crm/ShowTable'
// import CreateTable from '@/components/crm/CreateTable'
import MyModal from '@/components/MyModal'
import {toastAlert} from '@/components/ToastAlert'

import {useSelector,useDispatch} from 'react-redux'
import {IRootState } from 'store'
import ModalLoading from '@/components/ModalLoading'
import {updateContactSer,createContactSer,deleteContactSer} from 'services/contactSer'
 

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
      dataIndex: 'copName',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
     
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
        title:'电话',
        dataIndex:'phone',
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
    const dispath = useDispatch()
    const authReducer = useSelector((state:IRootState) => state.authReducer)
    const [loading,setLoading] = useState(false)
    const [searchItem,setSearchItem] = useState<string>('')

    const [btnSelType,setBtnSelType] = useState('all')
    const [customersName,setCustomersName] = useState<customerType[]>([])
    const [contacts,setContacts] = useState<contactType[]>([])
    const [contactsApi,setContactsApi] = useState<contactType[]>([])
    const [contactCheckedId,setContactCheckedId] = useState('')
    const [open,handleClose] = useState(false)
    const [openCreate,handleOpenCreate] = useState(false)

    // //右侧button组
    const contactsQuery =  useQuery(GET_CONTACTS)
    const customersNameQuery=  useQuery(GET_CUSTOMERS_NAME)

    useEffect(() => {
      if(contactsQuery?.data){
        let copyContacts:contactType[] = contactsQuery.data.getContacts
        setContacts(copyContacts)
      }
    }, [contactsQuery])

    useEffect(() => {
        if(customersNameQuery?.data){
          let customersName:customerType[] = customersNameQuery.data.getCustomers
          setCustomersName(customersName)
        }
      }, [customersNameQuery])


    //fetch数据或者search内容，客户类型更改触发，更改显示的客户
    useEffect(()=>{ 
        let copyContacts = contacts
        copyContacts = copyContacts.filter((contact)=>contact.phone?.includes(searchItem) || contact.name?.includes(searchItem) || contact.email?.includes(searchItem) || contact.mobilePhone?.includes(searchItem))
        copyContacts = copyContacts.filter((contact)=>filterCustomType(contact))
        setContactsApi(copyContacts)
    },[contacts,searchItem,btnSelType])
    
    const handleClickCheckBox=(id:string)=>{
        if(contactCheckedId===id){
            setContactCheckedId('')
        }
        else{
            setContactCheckedId(id)
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
 
    
    const filterCustomType = (contact:contactType) :boolean=>{
        if(btnSelType==='all'){
            return true
        }
        if(btnSelType==='my'){
            return contact.principal?.username===authReducer.user.username
        }
        if(btnSelType==='subordinate'){
            return contact.principal?.username!==authReducer.user.username
        }
        return false
    }

    const handleUpdate =async (contact:updateContactInput)=>{
        try{
            setLoading(true)
            await updateContactSer(contact)
            handleClose(false)
        }
        catch(err:any){
            toastAlert(err.message) 
        }
        finally{
            setLoading(false)
        }
    }

    

    const handleCreate =async (contact:createContactInput)=>{
        try {
            setLoading(true)
            await createContactSer(contact)
        } catch (error:any) {
            toastAlert(error.message)             
        }
        finally{
            setLoading(false)
        }
        handleOpenCreate(false)
    }
    
    const handleDelete =async()=>{
        try{
            if(contactCheckedId){
                setLoading(true)
                console.log('delete contact')
                await deleteContactSer(contactCheckedId)
            }
        }
        catch(err:any){
            toastAlert(err.message) 
        }
        finally{
            setLoading(false)
        }
    }
   
   if(!contacts){
       return<></>
   }
   if(loading){
       return <ModalLoading loading={loading}></ModalLoading>
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
                        contactCheckedId?
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

                    <ShowTable columns={columns} contents={contactsApi} handleClickCheckBox={handleClickCheckBox} itemCheckId={contactCheckedId}/>
                    
                    <MyModal open={open} handleClose={()=>handleClose(false)}>
                        <EditContact contact={contactsApi.find(contact=>contact._id===contactCheckedId)} handleUpdate={handleUpdate} customersName={customersName}/>
                    </MyModal>
                   
                    <MyModal open={openCreate} handleClose={()=>handleOpenCreate(false)}>
                        <CreateContact customersName={customersName} handleCreate={handleCreate}/>
                    </MyModal>  

                </main>
            </Layout>
        </div>
    )
}

export default index

