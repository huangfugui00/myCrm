import React from 'react'

type myInputProp={
    prefix?:string,
    placeholder?:string,
    value?:string,
    setValue?:(value:string)=>void
}
const MyInput = ({prefix,placeholder,value,setValue}:myInputProp) => {
    return (

        <div className="py-1  border rounded-lg border-gray-300 hover:border-black">
            <span className="text-xs font-serif pl-2">{placeholder}</span>
            <div className="flex items-center gap-2 ">
                <span className={`font-mono ${prefix&&'pl-2'}` }>{prefix}</span>
                <input className="w-full focus:outline-none"  value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setValue?setValue(e.target.value):console.log(e)}></input>
            </div>
        </div>
    )
}

export default MyInput
