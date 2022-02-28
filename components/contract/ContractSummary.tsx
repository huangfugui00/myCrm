import React from 'react'
import {contractType} from 'utils/type'

type ContractSummaryProp={
    contracts:contractType[]
}

const ContractSummary:React.FC<ContractSummaryProp> = (props) => {
    const {contracts} = props
    const sumPrice = contracts.reduce((total,contract)=>total+contract?.price,0)
    const sumPaid = contracts.reduce((total,contract)=>total+contract?.paid,0)
    
    return (
        <div>
            <p className="text-gray-500 text-sm">合同总金额: {sumPrice} / 已回款金额：{sumPaid} / 未回款金额：{sumPrice-sumPaid}</p>
        </div>
    )
}

export default ContractSummary
