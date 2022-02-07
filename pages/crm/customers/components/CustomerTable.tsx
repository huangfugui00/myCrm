import React,{useState,useEffect} from 'react'
import {customerType,columnsDataIndex} from  'utils/type'
import {columns} from 'utils/data'

import {Table ,TableBody,TableHead,TableRow,TableCell,TablePagination}from '@mui/material';
import moment from 'moment';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Checkbox} from '@mui/material'


type CustomerTableProp={
    customers:customerType[],
    customerCheckedId:string,
    handleClickCheckBox:(customerName:string)=>void,
}

//依赖关系：CUSTOMERS->CONDITION->DISPLAY
//Customers:外部传入的客户数据，
//CONDITION：对表进行排序等操作后得到的数据
//DISPLAY:真正显示的数据
const CustomerTable:React.FC<CustomerTableProp> = (props) => {
    const {customers,customerCheckedId,handleClickCheckBox} = props
    const [conditionCustomers,setConditionCustomers] = useState<customerType[]>(customers)
    const [displayCustomers,setDisplayCustomers] = useState<customerType[]>(customers)
    const [columnSort,setColumnSort] = useState<columnsDataIndex>()
    const [sortDirection,setSortDirection] = useState<'down'|'up'>()
    const [rowsPerPage,setRowsPerPage] = useState(5)
    const [page,setPage] = useState(0)


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const handleDecendSort  = (column:columnsDataIndex)=>{
        const decenSoftFunc = (a:customerType,b:customerType)=>{
            let value1,value2
            if(column==='principal'){
                value1 = a[column]?.username
                value2 = b[column]?.username
            }
            else{
                value1 = a[column]
                value2 = b[column]
            }
           if( value1 && value2){
              return value1<value2?1:-1
           }
           else{
               return 0
           }
        }
        const copyCustomers = [...customers]
        setConditionCustomers( copyCustomers.sort(decenSoftFunc))
        setColumnSort(column)
        setSortDirection('down')
    }

    const handleSort  = (column:columnsDataIndex)=>{
        const softFunc = (a:customerType,b:customerType)=>{
            let value1,value2
            if(column==='principal'){
                value1 = a[column]?.username
                value2 = b[column]?.username
            }
            else{
                value1 = a[column]
                value2 = b[column]
            }
           if( value1 && value2){
              return value1>value2?1:-1
           }
           else{
               return 0
           }
        }
        const copyCustomers = [...customers]//直接对state进行sort会报错，因为只能通过set方式更改state
       
        setConditionCustomers( copyCustomers.sort(softFunc))
        setColumnSort(column)
        setSortDirection('up')

    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customers.length) : 0;
   
    useEffect(() => {
        setConditionCustomers(customers)
    }, [customers])//condition依赖于customers
    
    useEffect(()=>{
        const sliceCustomers = conditionCustomers.slice(page*rowsPerPage,(page+1)*rowsPerPage)
        setDisplayCustomers(sliceCustomers)
    },[page,rowsPerPage,conditionCustomers])//display依赖于condition

   
    return (
        <div className="  mt-4">
            <div className="overflow-x-scroll">
            <Table > 
                <TableHead className='border-t '>
                <TableRow className="h-20">
                    <TableCell className="border-r"></TableCell>
                    {columns.map((column,index)=>(
                    <TableCell className={`min-w-[200px] border-r`}  key={column.title}>
                        <div className="flex items-center group leading-8 ">
                            <h2 className="text-gray-500">{column.title}</h2>
                            {/* sort */}
                            {/* ${columnSort===column.dataIndex && sortDirection === 'up' && ''} */}
                            <div className={` items-center   group-hover:flex   group-hover:flex-col ${columnSort===column.dataIndex ? 'flex flex-col':'hidden'}`}>
                                <ArrowDropUpIcon onClick={()=>handleSort(column.dataIndex)} className={` -mb-1 cursor-pointer`} sx={{color:`${columnSort===column.dataIndex && sortDirection === 'up'?'blue':'gray'}`    }}/>
                                <ArrowDropDownIcon onClick={()=>handleDecendSort(column.dataIndex)} className="-mt-1 cursor-pointer"  sx={{color:`${columnSort===column.dataIndex && sortDirection === 'down'?'blue':'gray'}`}}/>
                            </div>
                        </div>
                    </TableCell>
                    ))}
                </TableRow>
                </TableHead>
                <TableBody>
                    {displayCustomers.map((customer,index)=>(
                    <TableRow className={`${index%2 && 'bg-second-color'} hover:bg-blue-100`}>
                        <TableCell className="border-r"><Checkbox  checked={customerCheckedId===customer._id?true:false} onClick={()=>handleClickCheckBox(customer._id)}/></TableCell>
                        <TableCell className="border-r"><a href="#">{customer.name}</a></TableCell>
                        <TableCell className="border-r">{customer.phone}</TableCell>
                        <TableCell className="border-r">{customer.email}</TableCell>
                        <TableCell className="border-r"><p className="line-clamp-2">{customer.url}</p></TableCell>
                        <TableCell className="border-r">{customer.industry}</TableCell>
                        <TableCell className="border-r">{customer.come}</TableCell>
                        <TableCell className="border-r">{customer.mobilePhone}</TableCell>
                        <TableCell className="border-r">{customer.level}</TableCell>
                        <TableCell className="border-r">{moment(customer.nextTime).format('MMM DD, YYYY')}</TableCell>
                        <TableCell className="border-r">{customer.principal?.username}</TableCell>
                    </TableRow>
                    ))}
                     {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 15*rowsPerPage* emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
                </TableBody>
            </Table>
            </div>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={customers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default CustomerTable
