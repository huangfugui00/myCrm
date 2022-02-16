import React,{useState} from 'react'
import {contactType,customerType,createContactInput} from 'utils/type'
import {gender} from 'utils/data'
import { useForm,SubmitHandler } from 'react-hook-form';

type EditContactProp={
    customersName: customerType[],
    handleCreate:(contact:createContactInput)=>void
}


type Inputs = {
    name: string,
    phone:string,
    mobilePhone:string,
    email:string,
  };
  

const EditContact:React.FC<EditContactProp> = (props) => {
    const {customersName,handleCreate} = props
    const initContact = {
        name:'',
        _id:'',
    }
    const [localContact,setLocalContact]=useState<contactType>(initContact) 
    const className =" py-1 pl-1 rounded text-gray-500 bg-gray-100 text-sm outline-none border focus:border-blue-200 w-96"

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>();

    const onSubmit:SubmitHandler<Inputs>=(data)=>{
        const { copName , ...body} = localContact
        const bodys = body as createContactInput
        bodys.copName = copName?._id
        const result = handleCreate(bodys)
    }


    return (
        <div className="bg-white p-8">
            {/* header  */}
            <div className="mb-8">
                <h1 className="text-lg font-bold">创建联系人</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-8 ">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">姓名</p>
                            <input value={localContact.name} 
                            {...register("name",{ required: true })}
                            className={className}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setLocalContact({...localContact,name:e.target.value})}
                            />
                            <p className="text-sm text-red-500">
                            {errors.name && <span>This field is required</span>}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">客户名称</p>
                            <select className={className}
                            value={localContact.copName?.name}

                            onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setLocalContact({...localContact,copName:customersName.find(x=>x.name===e.target.value)})}
                            >
                                <option></option>
                                {
                                    customersName.map(x=>
                                        <option value={x.name}>{x.name}</option>
                                    )
                                }
                            </select>
                        </div>       
                    </div>

                    <div className="flex gap-8 ">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">电话</p>
                            <input value={localContact.phone} 
                            {...register("phone",{ pattern: /^[0-9]+$/i })} 
                            className={className}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setLocalContact({...localContact,phone:e.target.value})}
                            />
                            <p className="text-sm text-red-500">
                            {errors.phone && <span>phone only in number</span>}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">手机</p>
                            <input value={localContact.mobilePhone} 
                            {...register("mobilePhone",{ pattern: /^[0-9]+$/i })} 
                            className={className}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setLocalContact({...localContact,mobilePhone:e.target.value})}
                            />
                            <p className="text-sm text-red-500">
                            {errors.mobilePhone && <span>mobilePhone only in number</span>}
                            </p>
                        </div>      
                    </div>
                    
                    <div className="flex gap-8 ">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">邮箱</p>
                            <input value={localContact.email} 
                            {...register("email",{ pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,})} 
                            className={className}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setLocalContact({...localContact,email:e.target.value})}
                            />
                            <p className="text-sm text-red-500">
                            {errors.email && <span>email pattern is wrong</span>}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">职位</p>
                            <input value={localContact.jobTitle} 
                            className={className}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setLocalContact({...localContact,jobTitle:e.target.value})}
                            />
                        </div>      
                    </div>

                    <div className="flex gap-8 ">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">性别</p>
                            <select className={className}
                            value={localContact.gender}
                            onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setLocalContact({...localContact,gender:e.target.value as typeof gender[number] })}
                            >
                                <option></option>
                                {
                                    gender.map(x=>
                                        <option value={x}>{x}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">地址</p>
                            <input value={localContact.address} 
                            className={className}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setLocalContact({...localContact,address:e.target.value})}
                            />
                           
                        </div>
             
                    </div>

                    <div className="flex gap-8 ">
                     
                        <div>
                            <p className="text-sm text-gray-500 mb-1">备注</p>
                            <input value={localContact.remark} 
                            className={className}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setLocalContact({...localContact,remark:e.target.value})}
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

export default EditContact
