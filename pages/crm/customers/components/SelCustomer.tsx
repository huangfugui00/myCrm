import React from 'react'
import Mybutton from '@/components/MyButton'

type selCustomerProp={
    customerType:'all' | 'my' | 'subordinate',
    handleBtnClick:(customerType:'all' | 'my' | 'subordinate')=>void,
}
const SelCustomer :React.FC<selCustomerProp>= (props) => {
    const {customerType,handleBtnClick}=props
    return (
        <div className="flex items-center gap-2">
            <label className="text-sm">显示:</label>
            <button className={` text-sm px-3 py-2 rounded ${customerType==='all'?'bg-primary-color text-white':'bg-second-color' }`}  onClick={()=>handleBtnClick('all')}>全部客户</button>
            <button className={` text-sm px-3 py-2 rounded ${customerType==='my'?'bg-primary-color text-white':'bg-second-color' }`}  onClick={()=>handleBtnClick('my')}>我负责的客户</button>
            <button className={` text-sm px-3 py-2 rounded ${customerType==='subordinate'?'bg-primary-color text-white':'bg-second-color' }`}  onClick={()=>handleBtnClick('subordinate')}>下属负责的客户</button>
            {/* <Mybutton className="bg-second-color text-sm px-3 py-2 rounded">我关注的客户</Mybutton> */}
        </div>
    )
}

export default SelCustomer
