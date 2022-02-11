import React,{useEffect,useContext} from 'react'
import {useForm,SubmitHandler} from 'react-hook-form'
import { useRouter } from 'next/router'
import Logo from '@/components/Logo'
import {ToastAlert,toastAlert} from '@/components/ToastAlert'
import {LOGIN} from 'utils/graphql'
import {useMutation} from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux'
import {IRootState} from 'store'
import { loginAct } from 'actions/authAct'


// import {userContext} from '../../App'
// import userServices from '../../services/user'
// import './login.scss'

type Inputs = {
    email:string,
    password:string,
}

const Login = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const authReducer = useSelector((state:IRootState) => state.authReducer)
    const { token } = authReducer
    if(token){
        router.push('/crm/workbench')
    }
    
    const [loginSer]  = useMutation(LOGIN)
    const { handleSubmit, register, formState: { errors },reset } = useForm<Inputs>();

    const onSubmit:SubmitHandler<Inputs>=async (data)=>{
        try{
            const result= await loginSer( {
                 variables:{...data},
             })
            const payload = result.data.login
           
             dispatch(loginAct(payload))
            router.push('/crm/workbench')
        }
        catch(err:any){
            toastAlert(err.message)
        } 
        
    }
    const className =" py-1 pl-1 rounded text-gray-500 bg-gray-100 text-sm outline-none border focus:border-blue-200 w-96"
    return (
        <div className="flex flex-row justify-center mt-24 items-center my-container">
            <form onSubmit={handleSubmit(onSubmit)} className="basis-1/4" >
                <div className="flex flex-col gap-4">
                    <div id="email">
                        <span>email</span>
                        <input className={className} type="email" placeholder="Enter your email" 
                        {...register("email", {
                            required: "Required",
                            pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                            }
                        })}/>
                        {errors.email && <span className="text-red-500 text-sm">invalid email format</span>}
                    </div>
                    <div id="password">
                        <span>password</span>
                        <input className={className} type="password" placeholder="Enter your password"  
                        {...register("password", { required: true, minLength: 3 })}
                        />
                        {errors.password && <span className="text-red-500 text-sm">password at least 3 char</span>}
                    </div>
               </div>
              
               <div className="mt-4">
                    <button type="submit" className="bg-primary-color px-4 py-1 rounded cursor-pointer text-white">
                        登录
                    </button>
                </div>  
            </form>
            <div className="basis-2/4">
            <Logo/>              
            </div>
            <ToastAlert/>          
        </div>
    )
}

export default Login
