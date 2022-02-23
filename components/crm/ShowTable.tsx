import React,{useState,useEffect} from 'react'
import {customerType,contactType,contractType,columnsDataIndex} from  'utils/type'
// import {columns} from 'utils/data'

import {Table ,TableBody,TableHead,TableRow,TableCell,TablePagination}from '@mui/material';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Checkbox} from '@mui/material'


type  contentType = customerType | contactType | contractType
type  columnType = {title:string,dataIndex:string}

type ShowTableProp<T extends contentType,C extends columnType>={
    columns: C[],
    contents:T[],
    itemCheckId:string,
    handleClickCheckBox:(itemCheckId:string)=>void,
}


function isValidKey<T extends contentType>(key:string,obj: T){
    return key in obj
}

function tableCell(content:contentType,dataIndex:string){
    console.log(dataIndex)
    const objIndex=[ 'cuSignatory' , 'signatory' , 'copName']
    if(objIndex.includes(dataIndex)){
        return content[dataIndex]?.name
    }
    else if(dataIndex==='principal'){
        return content.principal?.name
    }
    else{
        return content[dataIndex]
    }
}


function ShowTable<T extends contentType, C extends columnType>(props:ShowTableProp<T,C>){
    
    const {columns,contents,itemCheckId,handleClickCheckBox} = props
    const [conditionContents,setConditionContents] = useState<T[]>(contents) 
    const [displayContents,setDisplayContents] = useState<T[]>(contents)
    const [columnSort,setColumnSort] = useState<string>()
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

    const handleDecendSort  = (column:string)=>{
        const decenSoftFunc = (a:T,b:T)=>{
            let value1,value2
            if(column==='principal'){
                value1 = a[column]?.name
                value2 = b[column]?.name
            }
            else{
                if(column in a ){
                    value1=a[column]
                    value2=b[column]
                }
            }
           if( value1 && value2){
              return value1<value2?1:-1
           }
           else{
               return 0
           }
        }
        const copyContents = [...contents]
        setConditionContents( copyContents.sort(decenSoftFunc))
        setColumnSort(column)
        setSortDirection('down')
    }

    const handleSort  = (column:string)=>{
        const softFunc = (a:T,b:T)=>{
            let value1,value2
            if(column==='principal'){
                value1 = a[column]?.name
                value2 = b[column]?.name
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
        const copyContents = [...contents]
        setConditionContents( copyContents.sort(softFunc))
        setColumnSort(column)
        setSortDirection('up')
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - contents.length) : 0;
   
    useEffect(() => {
        setConditionContents(contents)    
    }, [contents])//condition依赖于customers
    
    useEffect(()=>{
        const sliceContents = conditionContents.slice(page*rowsPerPage,(page+1)*rowsPerPage)
        setDisplayContents(sliceContents)
    },[page,rowsPerPage,conditionContents])//display依赖于condition

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
                    {displayContents&&displayContents.map((content,index)=>(
                    <TableRow className={`${index%2 && 'bg-second-color'} hover:bg-blue-100`}>
                        <TableCell className="border-r"><Checkbox  checked={itemCheckId===content._id?true:false} onClick={()=>handleClickCheckBox(content._id)}/></TableCell>
                        {
                            columns.map((column,index)=>
                            <TableCell className="border-r">
                               {tableCell(content,column.dataIndex)}
                            </TableCell> 
                            )
                         
                        }
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
                count={contents.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}


export default ShowTable
