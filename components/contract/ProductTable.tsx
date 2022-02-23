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

    
    const {addProductEvent} = props
    const [ToAddProduct,setToAddProduct]=useState<productType>({product:'',price:0})
    const className =" py-1 pl-1 rounded text-gray-500 bg-gray-100 text-sm outline-none border focus:border-blue-200 w-60"


    const handleAddProductEvent = ()=>{
        addProductEvent(ToAddProduct)
    }

    return (
        <div className='bg-white p-8'>
            <form>
                <div className="flex gap-8 ">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">产品名称</p>
                        <input value={ToAddProduct.product} 
                        className={className}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setToAddProduct({...ToAddProduct,product:e.target.value})}
                        />
                        
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">产品价格</p>
                        <input value={ToAddProduct.price} 
                        type="number"
                        className={className}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setToAddProduct({...ToAddProduct,price:parseInt( e.target.value)})}
                        />
                      
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
