import React from 'react'
import Mybutton from '@/components/MyButton'

const SelCustomer = () => {
    return (
        <div className="flex items-center gap-2">
            <label className="text-sm">显示:</label>
            <Mybutton className="bg-second-color text-sm px-3 py-2 rounded">全部客户</Mybutton>
            <Mybutton className="bg-second-color text-sm px-3 py-2 rounded">我负责的客户</Mybutton>
            <Mybutton className="bg-second-color text-sm px-3 py-2 rounded">下属负责的客户</Mybutton>
            <Mybutton className="bg-second-color text-sm px-3 py-2 rounded">我关注的客户</Mybutton>
        </div>
    )
}

export default SelCustomer
