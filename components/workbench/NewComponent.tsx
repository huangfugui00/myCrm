import { randomInt } from 'crypto';
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [1,20,30,20,10,5,26]

const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: Math.random(),
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: Math.random(),
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: Math.random(),
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: Math.random(),
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: Math.random(),
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: Math.random(),
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: Math.random(),
      amt: 2100,
    },
  ];
  
type newComponentType ={
    title:string,
    suffix:string,
    changeNum:number,
    cycle:string,
    changeRate:number,
}

const NewComponent:React.FC<newComponentType> = (props) => {
    return (
        <div className="flex justify-between border items-center shadow-md p-2  rounded">
            <div className="flex flex-col gap-6 justify-between text-sm">
                <p className="text-gray-500 ">{props.title}</p>
                <p><span className="font-bold text-lg">{props.changeNum}</span><span>{props.suffix}</span></p>
                <p>较<span className="text-gray-500">{props.cycle}</span> <span className="text-red-500">{props.changeRate}%</span></p>
            </div>
            {/* plot  */}
            <ResponsiveContainer width="50%" height="50%">
            <LineChart width={20} height={10} data={data}
            >
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            </LineChart>
            </ResponsiveContainer>       
        </div>
    )
}

export default NewComponent
