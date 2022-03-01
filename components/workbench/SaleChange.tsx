import React from 'react'
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import NewComponent from './NewComponent'

const SaleChange = () => {
    return (
             <div className=" border border-t-primary-color border-t-4 p-4" >
                    <div>
                        <div className='flex items-center gap-2'>
                            <SatelliteAltIcon color="primary" fontSize="small"/>
                            <p className="font-bold ">销售简报</p>
                        </div>
                    </div>

                    <div className="grid  grid-cols-5 gap-2 mt-4">
                        <NewComponent title="新增客户" suffix="人" changeNum={100} cycle="上月" changeRate={50} />
                        <NewComponent title="新增联系人" suffix="人" changeNum={100} cycle="上月" changeRate={50}/>
                        <NewComponent title="新增合同" suffix="个" changeNum={100} cycle="上月" changeRate={50}/>
                        <NewComponent title="合同金额" suffix="元" changeNum={100} cycle="上月" changeRate={50}/>
                        <NewComponent title="回款金额" suffix="元" changeNum={100} cycle="上月" changeRate={50}/>
                    </div>
            </div>
            
    )
}

export default SaleChange
