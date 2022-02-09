import {
    CUSTOMER_GET,
    CUSTOMER_ADD,
    CUSTOMER_UPDATE,
    CUSTOMER_DELETE
} from 'constants/customerCon'
import {customerType} from 'utils/type'

const initState= {
    customers: [] as customerType[]
}

// type returnType ={
//     customers:customerType[]
// }

export const customerReducer = (state = initState,action:any) =>{
    switch(action.type){
        case CUSTOMER_GET:
            return {...state,customers:action.payload}
        default:
            return state
    }
}