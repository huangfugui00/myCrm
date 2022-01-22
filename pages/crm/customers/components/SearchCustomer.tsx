import React from 'react'
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

type SearchCustomerProp={
    placeholder : string
}

const SearchCustomer:React.FC<SearchCustomerProp> = (props) => {
    const {placeholder}  = props
    return (
        <div className="flex items-center ">
            <input type="text" placeholder={placeholder} className="border rounded text-sm border-gray-200  py-1 pl-2 pr-8 outline-none focus:border-primary-color"/>
            <SearchIcon className="-ml-7" />
        </div>
        
    )
}

export default SearchCustomer
