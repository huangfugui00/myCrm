import React,{useState} from 'react'
import {BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

const ContractFinishCurve = () => {


    const [chartType, setChartType] = useState<'Line' | 'Bar'>('Line')
    return (
        <div className="mt-4 border border-t-primary-color border-t-4 p-4 ">
            <div className="flex justify-between">
                <p className="font-bold">合同金额完成情况</p>
                {/* chart type */}
                <div className='bg-second-color flex '>
                   <button className={`text-sm text-gray-500 p-2 ${chartType==='Line'&&'text-white bg-primary-color'}`} onClick={()=>setChartType('Line')}>
                        折线图
                   </button>
                   <button className={`text-sm text-gray-500 p-2 ${chartType==='Bar'&&'text-white bg-primary-color'}`}  onClick={()=>setChartType('Bar')}>
                        柱状图
                   </button>
                </div>
            </div>
            <div className='flex gap-2 mt-2'>
                <p className="bg-second-color text-sm text-gray-500 px-2 py-1">admin</p>
                <p className="bg-second-color text-sm text-gray-500 px-2 py-1">本月</p>
                <select className={" text-sm  px-2 py-1 outline-none border focus:border-blue-200"}
                        value={'合同金额'}
                        // onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setLocalContact({...localContract,copName:customersName.find(x=>x.name===e.target.value)})}
                        >
                            <option value={'合同金额'}>{'合同金额'}</option>
                            <option value={'回款金额'}>{'回款金额'}</option>
                        </select>

            </div>
            {/* chart  */}
            <div className=' h-[36rem] mt-4'>

            <ResponsiveContainer width="100%" height="100%">
              {
                chartType==='Line'?
                <LineChart width={500} height={500} data={data}
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
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={5}/>
                </LineChart>
                :
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
                    <Bar type="monotone" dataKey="pv" fill="#1d49cd" strokeWidth={5} barSize={50}/>
                </BarChart>
              }
                
            </ResponsiveContainer>   
            </div>


        </div>
    )
}

export default ContractFinishCurve
