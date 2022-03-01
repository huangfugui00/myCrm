import React,{useState,useEffect} from 'react'
import Layout from '@/components/Layout'
import SaleChange from '@/components/workbench/SaleChange'
import ContractFinishCurve from '@/components/workbench/ContractFinishCurve'
import SaleSummary from '@/components/workbench/SaleSummary'
import SelectComponent from '@/components/workbench/SelectComponent'
import {GET_CUSTOMERS} from 'graphql/customer'
import {GET_CONTACTS} from 'graphql/contact'
import {GET_CONTRACTS} from 'graphql/contract'
import {GET_REFUNDS} from 'graphql/refund'
import {useQuery} from '@apollo/client';
import {contractType,contactType,customerType,refundType,saleSummaryType} from 'utils/type'

const index = () => {

    const customersQuery =useQuery(GET_CUSTOMERS)
    const contactsQuery =useQuery(GET_CONTACTS)
    const contractsQuery =useQuery(GET_CONTRACTS)
    const refundsQuery =useQuery(GET_REFUNDS)

    const [customers,setCustomers] =  useState<customerType[]>()
    const [contacts,setContacts] =  useState<contactType[]>()
    const [contracts,setContracts] =  useState<contractType[]>()
    const [refunds,setRefunds] =  useState<refundType[]>()
    
    useEffect(() => {
        if(customersQuery?.data){
            let copyCustomers:customerType[] = customersQuery.data.getCustomers
            setCustomers(copyCustomers)
          }
    }, [customersQuery])
       
    useEffect(() => {
        if(contactsQuery?.data){
          let copyContacts:contactType[] = contactsQuery.data.getContacts
          setContacts(copyContacts)
        }
      }, [contactsQuery])
             
    useEffect(() => {
        if(contractsQuery?.data){
          let copyContracts:contractType[] = contractsQuery.data.getContracts
          setContracts(copyContracts)
        }
      }, [contractsQuery])
             
    useEffect(() => {
        if(refundsQuery?.data){
          let copyRefunds:refundType[] = refundsQuery.data.getRefunds
          setRefunds(copyRefunds)
        }
      }, [refundsQuery])
    
    const customerNum = customers?.length
    const contactNum = contacts?.length
    const contractNum = contracts?.length
    const refundNum = refunds?.length
    const contractPrice = contracts?.reduce((total,contract)=>total+Math.round(contract.price),0)
    const contractPaid = contracts?.reduce((total,contract)=>total+Math.round(contract.paid),0)
    let contractUnPaid=contractPrice
    if(contractPaid&&contractPrice){
        contractUnPaid = contractPrice-contractPaid
    }
    
const saleSummary = [
    {
      name: '客户数',
      mount: customerNum,
    },
    {
        name: '联系人',
        mount: contactNum,
    },
    {
        name: '合同数',
        mount: contractNum,
    },
    {
        name: '总金额',
        price:contractPrice
    },
    {
        name: '已回款金额',
        price: contractPaid,
    },
    {
        name: '未回款金额',
        price: contractUnPaid,
    },
  ] as saleSummaryType[];


    return (
        <div>
            <Layout>
                <main>
                    <div className=" flex justify-between">
                        <span className="text-2xl">CRM仪表盘</span>
                    </div>
                    <div className="mt-6">
                        <SelectComponent/>
                    </div>
                    <div className="mt-4">
                        <SaleChange/>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <ContractFinishCurve/>
                        <SaleSummary saleSummary={saleSummary}/>
                    </div>
        
                   
                </main>
            </Layout>
            
        </div>
    )
}

export default index
