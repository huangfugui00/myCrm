import React,{useEffect} from 'react'
import Layout from '../Layout'
import { useDispatch, useSelector } from 'react-redux'
import {IRootState} from 'utils/store'
import {useRouter} from 'next/router'


const index = () => {


    return (
        <div>
            <Layout>
                <span>hello</span>
            </Layout>
            
        </div>
    )
}

export default index
