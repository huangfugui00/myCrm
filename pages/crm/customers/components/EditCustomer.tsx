import React,{useState} from 'react'
import {customerType} from 'utils/type'
import {come} from 'utils/data'
import { useForm,SubmitHandler } from 'react-hook-form';
type EditCustomerProp={
    customer:customerType | undefined
}

type Inputs = {
    name: string,
    phone:string,
    mobilePhone:string,
  };
  

const EditCustomer:React.FC<EditCustomerProp> = (props) => {
    const {customer} = props
    if (!customer){
        return<></>
    }

    const [localCustomer,setLocalCustomer]=useState(customer)   
    const className =" py-1 pl-1 rounded text-gray-500 bg-gray-100 text-sm outline-none border focus:border-blue-200 w-96"

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>();

    const onSubmit:SubmitHandler<Inputs>=data=>{
        console.log(data)
    }
    
    return (
        <div className="bg-white p-8">
            {/* header  */}
            <div className="mb-8">
                <h1 className="text-lg font-bold">编辑客户信息</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-8 ">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">客户名称</p>
                            <input value={localCustomer.name} 
                            {...register("name",{ required: true })}
                            className={className}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setLocalCustomer({...localCustomer,name:e.target.value})}
                            />
                            <p className="text-sm text-red-500">
                            {errors.name && <span>This field is required</span>}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">客户来源</p>
                            <select className={className}
                            value={localCustomer.come}
                            onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setLocalCustomer({...localCustomer,come:e.target.value as typeof come[number]})}
                            >
                                <option></option>
                                {
                                    come.map(x=>
                                        <option value={x}>{x}</option>
                                    )
                                }
                            </select>
                        </div>       
                    </div>

                    <div className="flex gap-8 ">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">电话</p>
                            <input value={localCustomer.phone} 
                            {...register("phone",{ pattern: /^[0-9]+$/i })} 
                            className={className}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setLocalCustomer({...localCustomer,phone:e.target.value})}
                            />
                            <p className="text-sm text-red-500">
                            {errors.phone && <span>phone only in number</span>}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">手机</p>
                            <input value={localCustomer.mobilePhone} 
                            {...register("mobilePhone",{ pattern: /^[0-9]+$/i })} 
                            className={className}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setLocalCustomer({...localCustomer,mobilePhone:e.target.value})}
                            />
                            <p className="text-sm text-red-500">
                            {errors.mobilePhone && <span>mobilePhone only in number</span>}
                            </p>
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

export default EditCustomer
