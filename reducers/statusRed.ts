import {
    LOADING,
    FINISH,
} from 'constants/statusCon'


const initState = {
    loading:false,
}

export const statusReducer = (state=initState,action:any)=>{
    switch(action.type){
        case LOADING:
            return {...state,loading:true}
        case FINISH:{
            return {...state,loading:false}
        }
        default:
            return state
    }
}