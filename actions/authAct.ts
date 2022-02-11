import {
    LOGIN,
    LOGOUT,
} from 'constants/authCon'
import {IRootState} from 'store'
import {authType} from 'utils/type'


export const loginAct=(payload:authType)=>async(dispatch:any,getState:() => IRootState)=>{
    
    console.log('login dispatch')
    const {authReducer} = getState()
    localStorage.setItem('token', payload.token)
    dispatch({
        type: LOGIN,
        state:authReducer,
        payload:payload
      })
}

export const logoutAct=()=>async(dispatch:any)=>{
    console.log('logout dispatch')
    localStorage.removeItem('token')
    dispatch({
        type: LOGOUT,
      })
}
