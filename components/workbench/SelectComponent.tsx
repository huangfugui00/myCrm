import React from 'react'

const SelectComponent = () => {
    return (
        <div className="flex gap-2">
                  <select className={" text-sm  px-2 py-1 outline-none border focus:border-blue-200 rounded"}
                        value={'合同金额'}
                        // onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setLocalContact({...localContract,copName:customersName.find(x=>x.name===e.target.value)})}
                        >
                            <option value={'合同金额'}>{'合同金额'}</option>
                            <option value={'回款金额'}>{'回款金额'}</option>
                    </select>
                    <select className={" text-sm  px-2 py-1 outline-none border focus:border-blue-200 rounded"}
                        value={'admin'}
                        // onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setLocalContact({...localContract,copName:customersName.find(x=>x.name===e.target.value)})}
                        >
                            <option value={'合同金额'}>{'合同金额'}</option>
                            <option value={'回款金额'}>{'回款金额'}</option>
                    </select>
        </div>
    )
}

export default SelectComponent
