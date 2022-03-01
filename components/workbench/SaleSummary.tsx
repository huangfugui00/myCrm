import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {saleSummaryType} from 'utils/type'

type SaleSummaryProp={
    saleSummary: saleSummaryType[]
}

const SaleSummary:React.FC<SaleSummaryProp> = (props) => {
    const {saleSummary} = props

    return (
        <div className="mt-4 border border-t-primary-color border-t-4 p-4 ">
        <div className="flex justify-between">
            <p className="font-bold">数据汇总</p>
            {/* chart type */}
         
        </div>
        <div className='flex gap-2 mt-4'>
                <p className="bg-second-color text-sm text-gray-500 px-2 py-1">admin</p>
                <p className="bg-second-color text-sm text-gray-500 px-2 py-1">本月</p>
        </div>

        <div className=' h-[36rem] mt-4'>

        <ResponsiveContainer width="100%" height="100%">
            <BarChart width={500} height={500} data={saleSummary}
            margin={{
                top: 5,
                // right: 30,
                // left: 20,
                bottom: 5,
            }}>
                

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />   
            {/* <Legend /> */}
                <Bar  yAxisId="left"  type="monotone" dataKey="mount" fill="#8884d8"/>
                <Bar  yAxisId="right" type="monotone" dataKey="price" fill="#82ca9d"/>
            </BarChart>
        </ResponsiveContainer>   
        </div>
            
        </div>
    )
}

export default SaleSummary
