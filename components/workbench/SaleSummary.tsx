import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

const SaleSummary = () => {
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
            <BarChart width={500} height={500} data={data}
            margin={{
                top: 5,
                // right: 30,
                // left: 20,
                bottom: 5,
            }}>
                

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />   
            {/* <Legend /> */}
                <Bar type="monotone" dataKey="pv" fill="#8884d8"/>
            </BarChart>
        </ResponsiveContainer>   
        </div>
            
        </div>
    )
}

export default SaleSummary
