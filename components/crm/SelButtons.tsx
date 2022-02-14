import React from 'react'


type selButtonsProp={
    items:{keyName:string,buttonName:string}[]
    keyName:string,
    handleBtnClick:(keyName:string)=>void,
}

const SelButtons : React.FC<selButtonsProp>= (props) => {
    const {items,keyName,handleBtnClick} = props
    return (
        <div  className="flex items-center gap-2">
            <label className="text-sm">显示:</label>
            {
             items && items.map(item=>
                <button className={` text-sm px-3 py-2 rounded ${keyName===item.keyName?'bg-primary-color text-white':'bg-second-color' }`}  onClick={()=>handleBtnClick(item.keyName)}>
                    {item.buttonName}
                </button>
             )   
            }         
        </div>
    )
}

export default SelButtons
