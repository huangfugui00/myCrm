import {
    LOGIN,
    LOGOUT,
} from 'constants/authCon'


// type returnType ={
//     customers:customerType[]
// }

export const loginAct=(token:string)=>async(dispatch:any)=>{
    console.log('login dispatch')
    dispatch({
        type: LOGIN,
        payload:token
      })
}