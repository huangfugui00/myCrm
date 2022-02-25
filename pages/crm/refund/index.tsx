import React,{useState,useEffect} from 'react'
import Layout from '@/components/Layout'
import {IconButton} from '@mui/material'
import DehazeIcon from '@mui/icons-material/Dehaze'; 
import SearchItem from '@/components/crm/SearchItem'
import SelButtons from '@/components/crm/SelButtons'
import ShowTable from '@/components/crm/ShowTable'
import MyModal from '@/components/MyModal'
import {toastAlert} from '@/components/ToastAlert'

// import EditRefund from '@/components/refund/EditRefund'
import CreateRefund from '@/components/refund/CreateRefund'



import {GET_REFUNDS} from 'graphql/refund'
import {GET_CUSTOMERS_NAME} from 'graphql/customer'
import {GET_CONTRACTS} from 'graphql/contract'
import {useQuery } from '@apollo/client';
import {useSelector,useDispatch} from 'react-redux'
import {IRootState } from 'store'
import {loadingAct,finishAct} from 'actions/statusAct'
import {createRefundSer,deleteRefundSer} from 'services/refundSer'
import {customerType,contractType,refundType,updateRefundInput,createRefundInput} from 'utils/type'
 

const buttonItems=[
    {
        keyName:'all',
        buttonName:'全部回款'
    },
    {
        keyName:'my',
        buttonName:'我负责的回款'
    },
    {
        keyName:'subordinate',
        buttonName:'下属负责的回款'
    },
]


const columns=[
    {
      title: '合同名称',
      dataIndex: 'contract',
    },
    {
      title: '客户名称',
      dataIndex: 'copName',
    },
    {
      title: '合同金额',
      dataIndex: 'contractPrice',
    },
    {
        title: '负责人',
        dataIndex: 'principal',
    },
    {
        title: '回款金额',
        dataIndex: 'refundPrice',
    },
    {
        title: '回款日期',
        dataIndex: 'refundDate',
    },
    {
        title:'回款类型',
        dataIndex:'refundType',
    },
    {
        title:'备注',
        dataIndex:'remark'
    }
  ];


const index = () => {

    const dispatch = useDispatch()
    const authReducer = useSelector((state:IRootState) => state.authReducer)
    const [searchItem,setSearchItem] = useState<string>('')

    const [btnSelType,setBtnSelType] = useState('all')
    const [customersName,setCustomersName] = useState<customerType[]>([])
    const [contracts,setContracts] = useState<contractType[]>([])
    const [refunds,setRefunds] = useState<refundType[]>([])
    const [refundsApi,setRefundsApi] = useState<refundType[]>([])
    const [refundCheckedId,setRefundCheckedId] = useState('')
    const [open,handleClose] = useState(false)
    const [openCreate,handleOpenCreate] = useState(false)

    const refundsQuery =  useQuery(GET_REFUNDS)
    const customersNameQuery=  useQuery(GET_CUSTOMERS_NAME)
    const contractsQuery=  useQuery(GET_CONTRACTS)
    
    useEffect(() => {
        if(refundsQuery?.data){
          let copyRefunds:refundType[] = refundsQuery.data.getRefunds
          setRefunds(copyRefunds)
        }
      }, [refundsQuery])

    useEffect(() => {
        if(contractsQuery?.data){
            let copyContrats:contractType[] = contractsQuery.data.getContracts
            setContracts(copyContrats)
        }
    }, [contractsQuery])


    useEffect(() => {
        if(customersNameQuery?.data){
        let customersName:customerType[] = customersNameQuery.data.getCustomers
        setCustomersName(customersName)
        }
    }, [customersNameQuery])
    useEffect(()=>{ 
        let copyRefunds = refunds
        copyRefunds = copyRefunds.filter((refund)=>refund.name?.includes(searchItem) || refund.copName?.name.includes(searchItem))
        copyRefunds = copyRefunds.filter((refund)=>filterCustomType(refund))

        setRefundsApi(copyRefunds)
    },[refunds,searchItem,btnSelType])

    const handleClickCheckBox=(id:string)=>{
        if(refundCheckedId===id){
            setRefundCheckedId('')
        }
        else{
            setRefundCheckedId(id)
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
    
    const filterCustomType = (refund:refundType) :boolean=>{
        if(btnSelType==='all'){
            return true
        }
        if(btnSelType==='my'){
            return refund.signatory?.name===authReducer.user.name
        }
        if(btnSelType==='subordinate'){
            return refund.signatory?.name!==authReducer.user.name
        }
        return false
    }

    const handleUpdate =async (refund:updateRefundInput)=>{
        try{
            dispatch(loadingAct())
            // await updateRefundSer(refund)
            handleClose(false)
        }
        catch(err:any){
            toastAlert(err.message) 
        }
        finally{
            dispatch(finishAct())
        }
    }

    
    const handleCreate =async (refund:createRefundInput)=>{
        try {
            dispatch(loadingAct())
            await createRefundSer(refund)
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
            if(refundCheckedId){
                dispatch(loadingAct())
                await deleteRefundSer(refundCheckedId)
            }
        }
        catch(err:any){
            toastAlert(err.message) 
        }
        finally{
            dispatch(finishAct())
        }
    }
   
   if(!refundsApi){
       return<></>
   }

    return (
        <div>
             <Layout>
                <main>
                <div className=" flex justify-between">
                        <span className="text-2xl">回款管理</span>
                        <div className="flex  items-center">
                        <button onClick={()=>handleOpenCreate(true)} className="bg-primary-color text-white text-sm px-3 py-2 rounded">新建回款</button>
                        <IconButton>
                            <DehazeIcon/>
                        </IconButton>
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        {
                        refundCheckedId?
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

                    <ShowTable columns={columns} contents={refundsApi} handleClickCheckBox={handleClickCheckBox} itemCheckId={refundCheckedId}/>
                    
                    {/* <MyModal open={open} handleClose={()=>handleClose(false)}>
                        <EditRefund refund={refundsApi.find(refund=>refund._id===refundCheckedId)} handleUpdate={handleUpdate} customersName={customersName}
                        contacts={contacts}/>
                    </MyModal>
                    <MyModal open={openCreate} handleClose={()=>handleOpenCreate(false)}>
                        <AddRefund handleCreate={handleCreate} customersName={customersName}
                        contacts={contacts}/>
                    </MyModal> */}
                    <MyModal open={openCreate} handleClose={()=>handleOpenCreate(false)}>
                        <CreateRefund customersName={customersName}  contracts={contracts} handleCreate={handleCreate}/>
                    </MyModal>   

                </main>
            </Layout>
        </div>
    )
}

export default index
