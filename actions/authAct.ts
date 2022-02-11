import {
    LOGIN,
    LOGOUT,
} from 'constants/authCon'

import {authType} from 'utils/type'


export const loginAct=(payload:authType)=>async(dispatch:any)=>{
    console.log('login dispatch')
    dispatch({
        type: LOGIN,
        payload:payload
      })
}

export const logoutAct=()=>async(dispatch:any)=>{
    console.log('logout dispatch')
    dispatch({
        type: LOGOUT,
      })
}
