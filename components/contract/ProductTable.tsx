import React,{useState} from 'react'
import {Table ,TableBody,TableHead,TableRow,TableCell,TablePagination}from '@mui/material';
import {PRODUCT_COLUMNS} from 'utils/data'
import {productType} from 'utils/type' 
import { useForm,SubmitHandler } from 'react-hook-form';
type Inputs = {
    product: string,
    price:number,
  };

type ProductTableProp={
    addProductEvent: (toAddProduct:productType)=>void
}

const ProductTable:React.FC<ProductTableProp> = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>();
    
    const {addProductEvent} = props
    const [ToAddProduct,setToAddProduct]=useState<productType>({product:'',price:0})
    const className =" py-1 pl-1 rounded text-gray-500 bg-gray-100 text-sm outline-none border focus:border-blue-200 w-60"


    const handleAddProductEvent = ()=>{
        console.log('add product')
        addProductEvent(ToAddProduct)
    }
    const onSubmit1:SubmitHandler<Inputs>=(data)=>{
        console.log('add product submit')
        addProductEvent(ToAddProduct)
    }

    const onSubmit=handleSubmit((data)=>{

        console.log(data)
        console.log('handleSubmit')
    }
    )
    return (
        <div className='bg-white p-8'>
            <form onSubmit={onSubmit}>
                <div className="flex gap-8 ">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">产品名称</p>
                        <input value={ToAddProduct.product} 
                        {...register("product",{ required: true })}
                        className={className}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setToAddProduct({...ToAddProduct,product:e.target.value})}
                        />
                        <p className="text-sm text-red-500">
                        {errors.product && <span>This field is required</span>}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">产品价格</p>
                        <input value={ToAddProduct.price} 
                        type="number"
                        {...register("price",{ required: true,min:1 })}
                        className={className}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setToAddProduct({...ToAddProduct,price:parseInt( e.target.value)})}
                        />
                        <p className="text-sm text-red-500">
                        {errors.price && <span>This field must   than 0</span>}
                        </p>
                    </div>       
                    <div>
                        <p className="text-sm text-gray-500 mb-1">备注</p>
                        <input value={ToAddProduct.remark} 
                        className={className}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setToAddProduct({...ToAddProduct,remark:e.target.value})}
                        />
                    </div>  
                </div>

                <div className="mt-8 flex justify-end">
                    <button type="submit" className="bg-primary-color px-4 py-1 rounded cursor-pointer text-white" onClick={()=>handleAddProductEvent()}>
                        添加
                    </button>
                </div>
            </form>
            
        </div>
    )
}

export default ProductTable
