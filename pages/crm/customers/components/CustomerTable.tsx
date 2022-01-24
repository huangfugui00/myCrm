import React,{useState,useEffect} from 'react'
import {customerType,columns} from  'utils/type'
import {Table ,TableBody,TableHead,TableRow,TableCell,TablePagination}from '@mui/material';
import moment from 'moment';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Checkbox} from '@mui/material'


type CustomerTableProp={
    customers:customerType[]
}


const CustomerTable:React.FC<CustomerTableProp> = (props) => {
    const {customers} = props
    const [rowsPerPage,setRowsPerPage] = useState(5)
    const [page,setPage] = useState(0)

    const handleChangePage = (event: unknown, newPage: number) => {
        console.log(newPage)
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customers.length) : 0;
    //   先排序
    let displayCustomers = customers
    
    // 再每页显示
    displayCustomers = displayCustomers.slice(page*rowsPerPage,(page+1)*rowsPerPage)
    

    return (
        <div className="  mt-4">
            <div className="overflow-x-scroll">
            <Table > 
                <TableHead className='border-t'>
                <TableRow>
                    <TableCell><Checkbox/></TableCell>
                    {columns.map((column,index)=>(
                    <TableCell className={`min-w-[200px] border-r`}  key={column.title}>
                        <div className="flex items-center group leading-8 ">
                            <h2 className="text-gray-500">{column.title}</h2>
                            {/* sort */}
                            <div className=" items-center hidden  group-hover:flex   group-hover:flex-col">
                                <ArrowDropUpIcon className="-mb-2 cursor-pointer" sx={{color:'gray'}}/>
                                <ArrowDropDownIcon className="-mt-2 cursor-pointer" sx={{color:'gray'}}/>
                            </div>
                        </div>
                    </TableCell>
                    ))}
                </TableRow>
                </TableHead>
                <TableBody>
                    {displayCustomers.map((customer,index)=>(
                    <TableRow className={`${index%2 && 'bg-second-color'} hover:bg-blue-100`}>
                        <TableCell><Checkbox/></TableCell>
                        <TableCell className="border-r"><a href="#">{customer.name}</a></TableCell>
                        <TableCell className="border-r">{customer.phone}</TableCell>
                        <TableCell className="border-r">{customer.email}</TableCell>
                        <TableCell className="border-r"><p className="line-clamp-2">{customer.url}</p></TableCell>
                        <TableCell className="border-r">{customer.industry}</TableCell>
                        <TableCell className="border-r">{customer.come}</TableCell>
                        <TableCell className="border-r">{customer.mobilePhone}</TableCell>
                        <TableCell className="border-r">{customer.level}</TableCell>
                        <TableCell className="border-r">{moment(customer.nextTime).format('MMM DD, YYYY')}</TableCell>
                        <TableCell className="border-r">{customer.principal.username}</TableCell>
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
