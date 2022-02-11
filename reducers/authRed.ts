import {
    LOGIN,
    LOGOUT,
} from 'constants/authCon'

import {authType} from 'utils/type'

const initState = {
    token:'',
    user:{
        _id:'',
        username:'',
        roles:[],
        email:''
    }
} as authType

export const authReducer = (state = initState,action:any) : authType=>{
    switch(action.type){
        case LOGIN:
            return {...state,token:action.payload.token,user:action.payload.user}
        case LOGOUT:{
            return initState
        }
        default:
            return state
    }
}