import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

type SearchItemProp={
    placeholder : string
    value?:string,
    setValue?:(value:string)=>void
}



const SearchItem :React.FC<SearchItemProp> = (props)=> {
    const {placeholder,value,setValue}  = props
    return (
        <div className="flex items-center ">
            <input type="text" placeholder={placeholder} className="border rounded text-sm border-gray-200  py-1 pl-2 pr-8 outline-none focus:border-primary-color"
            value={value} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setValue?setValue(e.target.value):console.log(1)}
            />
            <SearchIcon className="-ml-7"  />
        </div>
    )
}

export default SearchItem
