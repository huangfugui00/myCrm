import {
    LOADING,
    FINISH,
} from 'constants/statusCon'


export const loadingAct=()=>async(dispatch:any)=>{
    console.log('loadingAct dispatch')
    dispatch({
        type: LOADING,
      })
}


export const finishAct=()=>async(dispatch:any)=>{
    console.log('FinishAct dispatch')
    dispatch({
        type: FINISH,
      })
}
