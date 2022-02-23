import React,{useState,useEffect} from 'react'
import {productType,contractType,contactType,customerType,updateContractInput} from 'utils/type'
import { useForm,SubmitHandler } from 'react-hook-form';
import {CONTRACT_TYPE}  from 'utils/data'
import {Table ,TableBody,TableHead,TableRow,TableCell,TablePagination}from '@mui/material';
import MyModal from '@/components/MyModal'
import ProductTable from './ProductTable'
import {PRODUCT_COLUMNS} from 'utils/data'

type EditContractProp={
    contract:contractType | undefined,
    customersName: customerType[],
    contacts:contactType[]
    handleUpdate:(contact:updateContractInput)=>void
}

type Inputs = {
    name: string,
    disCount:number,
  };


const EditContract:React.FC<EditContractProp> = (props) => {
    const {contract,handleUpdate,customersName,contacts} = props
    if(!contract){
        return<></>
    }

    const [localContract,setLocalContact]=useState(contract) 
    const [contactsInCop,setContactsInCop] = useState<contactType[]>(contacts)
    const [addProduct,setAddProduct] = useState(false)

    const className =" py-1 pl-1 rounded text-gray-500 bg-gray-100 text-sm outline-none border focus:border-blue-200 w-96"
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>();

    useEffect(() => {
        const filterContacts=contacts.filter(contact=>contact.copName?._id===localContract?.copName?._id)
        setContactsInCop(filterContacts)
    }, [localContract?.copName])

    const deleteProductEvent =(deleteProduct:productType)=>{
        let copyContract = localContract
        if(copyContract&&copyContract.products){
            const filterProducts= copyContract.products.filter((product)=>product.product!==deleteProduct.product || product.price !== deleteProduct.price)
            copyContract ={...copyContract,products:filterProducts}
            // const removeIndex =copyContract.products.findIndex(product => product.product===deleteProduct.product)
            // copyContract.products.splice(removeIndex,1)
            setLocalContact(copyContract)
        }
    }
    const addProductEvent = (toAddProduct:productType)=>{
        let copyContract = localContract
        if(copyContract&&copyContract.products){
            copyContract ={...copyContract,products:copyContract.products.concat(toAddProduct)}
            setLocalContact(copyContract)
            setAddProduct(false)
            console.log('close product')
        }
    }
    const onSubmit:SubmitHandler<Inputs>=(data)=>{
        const { signatory,cuSignatory,copName,products,...body} = localContract
        const bodys = body as updateContractInput
        if(products){
            bodys.products = products.map(product=>( {price:product.price,product:product.product,remark:product.remark} ))
        }
        bodys.copName = copName?._id
        bodys.cuSignatory = cuSignatory?._id
        const result = handleUpdate(bodys)
    }
    if(!localContract){
        return<></>
    }

    return (
    <div className="bg-white p-8">
        {/* header  */}
        <div className="mb-8">
            <h1 className="text-lg font-bold">编辑合同</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} key='editContract'>
            <div className="flex flex-col gap-4">
                <div className="flex gap-8 ">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">合同名称</p>
                        <input value={localContract.name} 
                        {...register("name",{ required: true })}
                        className={className}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setLocalContact({...localContract,name:e.target.value})}
                        />
                        <p className="text-sm text-red-500">
                        {errors.name && <span>This field is required</span>}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">客户名称</p>
                        <select className={className}
                        value={localContract.copName?.name}

                        onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setLocalContact({...localContract,copName:customersName.find(x=>x.name===e.target.value)})}
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
                    <p className="text-sm text-gray-500 mb-1">客户签约人</p>
                        <select className={className}
                        value={localContract.cuSignatory?.name}
                        onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setLocalContact({...localContract,cuSignatory:contactsInCop.find(x=>x.name===e.target.value)})}
                        >
                            <option></option>
                            {
                                contactsInCop.map(x=>
                                    <option value={x.name}>{x.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">合同类型</p>
                        <select className={className}
                        value={localContract.contractType}
                        onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setLocalContact({...localContract,contractType:e.target.value as typeof CONTRACT_TYPE[number] })}
                        >
                            <option></option>
                            {
                                CONTRACT_TYPE.map(x=>
                                    <option value={x}>{x}</option>
                                )
                            }
                        </select>
                    </div>
                 
                </div>
                
            
                <div className="flex gap-8 ">
                 
                    <div>
                        <p className="text-sm text-gray-500 mb-1">合同金额</p>
                        <input value={localContract.price} 
                        className={className}
                        readOnly
                        >
                        </input>
                    </div>   
                    <div>
                        <p className="text-sm text-gray-500 mb-1">折扣</p>
                        <input value={localContract.disCount} 
                        {...register("disCount",{ min: 10, max: 100 })}
                        type='number'
                        min="10" max="100"
                        className={className}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setLocalContact({...localContract,disCount:parseInt(e.target.value)})}
                        />
                         <p className="text-sm text-red-500">
                        {errors.name && <span>折扣必须在10-100之间</span>}
                        </p>
                    </div>    
                </div>

                <div className="flex gap-8 ">
                 
                    <div>
                        <p className="text-sm text-gray-500 mb-1">备注</p>
                        <input value={localContract.remark} 
                        className={className}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setLocalContact({...localContract,remark:e.target.value})}
                        />
                    </div>      
                </div>

            </div>
            
            <div className="mt-8">
                <div className="flex justify-end mb-4">
                    <p  className="bg-primary-color px-4 py-1 rounded cursor-pointer text-white" onClick={()=>setAddProduct(true)}>
                        添加产品
                    </p>
                </div>
                <MyModal open={addProduct} handleClose={()=>setAddProduct(false)}>
                    <ProductTable addProductEvent={addProductEvent}/>
                </MyModal>
                {/* 产品列表 */}
                <div>
                <Table>
                    <TableHead className='border-t '>
                        <TableRow >
                            {PRODUCT_COLUMNS.map((column,index)=>(
                            <TableCell className={`min-w-[200px] border-r`}  key={column.title}>
                                <div className="flex items-center group leading-8 ">
                                    <h2 className="text-gray-500">{column.title}</h2>
                                </div>
                            </TableCell>
                            ))}
                            <TableCell className="border-r min-w-[200px]">
                                <label>操作</label>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            localContract.products?.map((product,index)=>
                                <TableRow className={`${index%2 && 'bg-second-color'} hover:bg-blue-100`}>
                                {
                                    PRODUCT_COLUMNS.map((column,index)=>
                                    <TableCell className="border-r" key={index}>
                                       {product[column.dataIndex]}
                                    </TableCell> 
                                    )
                                }
                                    <TableCell className="border-r" key={index}>
                                        <p className="text-primary-color cursor-pointer" onClick={()=>deleteProductEvent(product)}>删除</p>       
                                    </TableCell> 
                                </TableRow>
                                )
                        }
                    </TableBody>
                </Table>

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

export default EditContract
