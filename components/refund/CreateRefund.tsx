import React,{useState,useEffect} from 'react'
import {refundType,contractType,customerType,createRefundInput} from 'utils/type'
import {REFUND_TYPE} from 'utils/data'
import { useForm,SubmitHandler } from 'react-hook-form';
import  DatePicker  from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

type CreateRefundProp={
    customersName: customerType[],
    contracts:contractType[],
    handleCreate:(contact:createRefundInput)=>void
}

type Inputs = {
    refundPrice: number,
    copName:string,
    contractName:String
  };

const CreateRefund:React.FC<CreateRefundProp> = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>();

    const {customersName,contracts,handleCreate} = props
    const initRefund = {
        _id:'',
        refundPrice:0,
    }
    const [localRefund,setLocalRefund]=useState<refundType>(initRefund) 
    const [contractsInCop,setContractsInCop] = useState<contractType[]>(contracts)

    useEffect(() => {
        const filterContracts=contracts.filter(contract=>contract.copName?._id===localRefund?.copName?._id)
        setContractsInCop(filterContracts)
    }, [localRefund?.copName])

    const className =" py-1 pl-1 rounded text-gray-500 bg-gray-100 text-sm outline-none border focus:border-blue-200 w-96"

    
    const onSubmit:SubmitHandler<Inputs>=(data)=>{
        const { copName,contract ,...body} = localRefund
        const bodys = body as createRefundInput
        bodys.copName = copName?._id
        bodys.contract = contract?._id
        handleCreate(bodys)
    }

    const handleChangeDate=(date:any)=>{
        setLocalRefund({...localRefund,refundDate:date})
        // setLocalRefund({...localRefund,contract:contractsInCop.find(x=>x.name===e.target.value)})
    }

    return (
        <div className="bg-white p-8">
        {/* header  */}
        <div className="mb-8">
            <h1 className="text-lg font-bold">创建回款</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
                <div className="flex gap-8 ">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">客户名称</p>
                        <select className={className}
                            value={localRefund.copName?.name}
                            {...register("copName",{ required: true })}
                            onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setLocalRefund({...localRefund,copName:customersName.find(x=>x.name===e.target.value)})}
                            >
                                <option></option>
                                {
                                    customersName.map(x=>
                                        <option value={x.name}>{x.name}</option>
                                    )
                                }
                        </select>
                        <p className="text-sm text-red-500">
                            {errors.copName && <span>This field is required</span>}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">合同名称</p>
                        <select className={className}
                        value={localRefund.contract?.name}
                        {...register("contractName",{ required: true })}
                        onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>  setLocalRefund({...localRefund,contract:contractsInCop.find(x=>x.name===e.target.value)})}
                        >
                            <option></option>
                            {
                                contractsInCop.map(x=>
                                    <option value={x.name}>{x.name}</option>
                                )
                            }
                        </select>
                        <p className="text-sm text-red-500">
                            {errors.contractName && <span>This field is required</span>}
                        </p>
                    </div>       
                </div>

                
                
            
                <div className="flex gap-8 ">
                 
                    <div>
                        <p className="text-sm text-gray-500 mb-1">合同金额</p>
                        <input 
                        value={localRefund.contract?.price} 
                        className={className}
                        readOnly
                        >
                        </input>
                    </div>   
                    <div>
                        <p className="text-sm text-gray-500 mb-1">回款金额</p>
                        <input 
                        value={localRefund.refundPrice} 
                        // value={100}
                        {...register("refundPrice",{ required: true })}
                        type='number'
                        min="1" 
                        className={className}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setLocalRefund({...localRefund,refundPrice:parseInt(e.target.value)})}
                        />
                         <p className="text-sm text-red-500">
                        {errors.refundPrice && <span>This field is required</span>}
                        </p>
                    </div>    
                </div>

                <div className="flex gap-8 ">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">回款日期</p>                        
                        <DatePicker className={className} selected={ localRefund.refundDate} onChange={(date:any) => handleChangeDate(date)} />
                    </div>   
                    <div>
                        <p className="text-sm text-gray-500 mb-1">回款类型</p>
                        <select className={className}
                        value={localRefund.refundType}
                        onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setLocalRefund({...localRefund,refundType:e.target.value})}
                        >
                            <option></option>
                            {
                                REFUND_TYPE.map(refundType=>
                                    <option value={refundType}>{refundType}</option>
                                )
                            }
                        </select>
                    </div>      
                </div>
                <div className="flex gap-8">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">备注</p>
                        <input value={localRefund.remark} 
                        className={className}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setLocalRefund({...localRefund,remark:e.target.value})}
                        />
                    </div>    

                </div>

            </div>
            
            <div className="mt-8">
                <button type="submit" className="bg-primary-color px-4 py-1 rounded cursor-pointer text-white">
                    提交
                </button>
            </div>
          
        </form>
        </div>
    )
}

export default CreateRefund
