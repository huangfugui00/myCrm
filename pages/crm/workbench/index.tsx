import React,{useEffect} from 'react'
import Layout from '@/components/Layout'
import SaleChange from '@/components/workbench/SaleChange'
import ContractFinishCurve from '@/components/workbench/ContractFinishCurve'
import SaleSummary from '@/components/workbench/SaleSummary'
import SelectComponent from '@/components/workbench/SelectComponent'

const index = () => {

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
                        <SaleSummary/>
                    </div>
        
                   
                </main>
            </Layout>
            
        </div>
    )
}

export default index
