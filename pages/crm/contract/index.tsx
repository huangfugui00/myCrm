import React,{useState,useEffect} from 'react'
import Layout from '@/components/Layout'
import {IconButton} from '@mui/material'
import DehazeIcon from '@mui/icons-material/Dehaze'; 
import SearchItem from '@/components/crm/SearchItem'
import SelButtons from '@/components/crm/SelButtons'
import ShowTable from '@/components/crm/ShowTable'
import MyModal from '@/components/MyModal'
import {toastAlert} from '@/components/ToastAlert'
import EditContract from '@/components/contract/EditContract'
import AddContract from '@/components/contract/AddContract'



import {GET_CONTRACTS} from 'graphql/contract'
import {GET_CUSTOMERS_NAME} from 'graphql/customer'
import {GET_CONTACTS} from 'graphql/contact'
import {useQuery } from '@apollo/client';
import {useSelector,useDispatch} from 'react-redux'
import {IRootState } from 'store'
import {loadingAct,finishAct} from 'actions/statusAct'
import {updateContractSer,createContractSer,deleteContractSer} from 'services/contractSer'
import {customerType,contactType,contractType,updateContractInput,createContractInput} from 'utils/type'
 

const buttonItems=[
    {
        keyName:'all',
        buttonName:'全部合同'
    },
    {
        keyName:'my',
        buttonName:'我负责的合同'
    },
    {
        keyName:'subordinate',
        buttonName:'下属负责的合同'
    },
]


const columns=[
    {
      title: '合同名称',
      dataIndex: 'name',
    },
    {
      title: '客户名称',
      dataIndex: 'copName',
    },
    {
      title: '合同金额',
      dataIndex: 'price',
    },
    {
        title: '已回款金额',
        dataIndex: 'paid',
    },
    {
        title: '未收回金额',
        dataIndex: 'unPaid',
    },
    {
        title:'客户签约人',
        dataIndex:'cuSignatory',
    },
    {
        title:'签约人',
        dataIndex:'signatory',
    },
    {
        title:'备注',
        dataIndex:'remark',
    },
    {
        title:'合同类型',
        dataIndex:'contractType',
    },
  ];


const index = () => {

    const dispatch = useDispatch()
    const authReducer = useSelector((state:IRootState) => state.authReducer)
    const [searchItem,setSearchItem] = useState<string>('')

    const [btnSelType,setBtnSelType] = useState('all')
    const [customersName,setCustomersName] = useState<customerType[]>([])
    const [contacts,setContacts] = useState<contactType[]>([])
    const [contracts,setContracts] = useState<contractType[]>([])
    const [contractsApi,setContractsApi] = useState<contractType[]>([])
    const [contractCheckedId,setContractCheckedId] = useState('')
    const [open,handleClose] = useState(false)
    const [openCreate,handleOpenCreate] = useState(false)

    const contractsQuery =  useQuery(GET_CONTRACTS)
    const contactsQuery =  useQuery(GET_CONTACTS)
    const customersNameQuery=  useQuery(GET_CUSTOMERS_NAME)
    
    useEffect(() => {
        if(contractsQuery?.data){
          let copyContracts:contractType[] = contractsQuery.data.getContracts
          setContracts(copyContracts)
        }
      }, [contractsQuery])

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
    useEffect(()=>{ 
        let copyContracts = contracts
        copyContracts = copyContracts.filter((contract)=>contract.name?.includes(searchItem) || contract.copName?.name.includes(searchItem))
        copyContracts = copyContracts.filter((contract)=>filterCustomType(contract))

        setContractsApi(copyContracts)
    },[contracts,searchItem,btnSelType])

    const handleClickCheckBox=(id:string)=>{
        if(contractCheckedId===id){
            setContractCheckedId('')
        }
        else{
            setContractCheckedId(id)
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
    
    const filterCustomType = (contract:contractType) :boolean=>{
        if(btnSelType==='all'){
            return true
        }
        if(btnSelType==='my'){
            return contract.signatory?.name===authReducer.user.name
        }
        if(btnSelType==='subordinate'){
            return contract.signatory?.name!==authReducer.user.name
        }
        return false
    }

    const handleUpdate =async (contract:updateContractInput)=>{
        try{
            dispatch(loadingAct())
            await updateContractSer(contract)
            handleClose(false)
        }
        catch(err:any){
            toastAlert(err.message) 
        }
        finally{
            dispatch(finishAct())
        }
    }

    
    const handleCreate =async (contract:createContractInput)=>{
        try {
            dispatch(loadingAct())
            await createContractSer(contract)
        } catch (error:any) {
            toastAlert(error.message)             
        }
        finally{
            dispatch(finishAct())
        }
        handleOpenCreate(false)
    }
    
    const handleDelete =async()=>{
        try{
            if(contractCheckedId){
                dispatch(loadingAct())
                await deleteContractSer(contractCheckedId)
            }
        }
        catch(err:any){
            toastAlert(err.message) 
        }
        finally{
            dispatch(finishAct())
        }
    }
   
   if(!contracts){
       return<></>
   }

    return (
        <div>
             <Layout>
                <main>
                <div className=" flex justify-between">
                        <span className="text-2xl">合同管理</span>
                        <div className="flex  items-center">
                        <button onClick={()=>handleOpenCreate(true)} className="bg-primary-color text-white text-sm px-3 py-2 rounded">新建合同</button>
                        <IconButton>
                            <DehazeIcon/>
                        </IconButton>
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        {
                        contractCheckedId?
                        <div className="flex items-center gap-2 h-9">
                            <button onClick={()=>handleClose(true)} className="bg-primary-color text-white text-sm px-3 py-2 rounded">编辑</button>
                            <button onClick={()=>handleDelete()} className="bg-danger-color  text-white text-sm px-3 py-2 rounded">删除</button>
                        </div>
                        :
                        <div className=" flex  justify-between">
                        <SearchItem placeholder='合同/客户名称' value={searchItem} setValue={setSearchItem}/>
                        <SelButtons items={buttonItems} keyName={btnSelType} handleBtnClick={handleBtnClick}/>
                        </div>
                        }
                    </div>

                    <ShowTable columns={columns} contents={contractsApi} handleClickCheckBox={handleClickCheckBox} itemCheckId={contractCheckedId}/>
                    
                    <MyModal open={open} handleClose={()=>handleClose(false)}>
                        <EditContract contract={contractsApi.find(contract=>contract._id===contractCheckedId)} handleUpdate={handleUpdate} customersName={customersName}
                        contacts={contacts}/>
                    </MyModal>
                    <MyModal open={openCreate} handleClose={()=>handleOpenCreate(false)}>
                        <AddContract handleCreate={handleCreate} customersName={customersName}
                        contacts={contacts}/>
                    </MyModal>
                    {/*
                    <MyModal open={openCreate} handleClose={()=>handleOpenCreate(false)}>
                        <CreateContract customersName={customersName} handleCreate={handleCreate}/>
                    </MyModal>   */}

                </main>
            </Layout>
        </div>
    )
}

export default index
