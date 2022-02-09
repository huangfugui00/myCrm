import {
    CUSTOMER_GET,
    CUSTOMER_ADD,
    CUSTOMER_UPDATE,
    CUSTOMER_DELETE
} from 'constants/customerCon'
import {customerType} from 'utils/type'

import customerSers from 'services/customerSer'

export const getCustomers = ()=>async(dispatch:any)=>{
    console.log('getCustomers action')
    const result = await customerSers.getCustomers()
    if(!result.status){
        return
    }
    if(result.data){
        const customers:customerType[] = result.data.customers
        console.log(customers)
        dispatch({
            type:CUSTOMER_GET,
            payload:customers
        })
    }
}