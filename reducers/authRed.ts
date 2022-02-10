import {
    LOGIN,
    LOGOUT,
} from 'constants/authCon'

const initState= {
    token:''
}

// type returnType ={
//     customers:customerType[]
// }

export const authReducer = (state = initState,action:any) =>{
    switch(action.type){
        case LOGIN:
            return {...state,token:action.payload}
        default:
            return state
    }
}