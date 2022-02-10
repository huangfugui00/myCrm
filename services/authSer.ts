import {useQuery ,useMutation} from '@apollo/client';
import {customerType} from 'utils/type'

const customerSer = {
    async getCustomers(){
        const { loading, error, data }   = useQuery(GET_CUSTOMERS)
        if(error){
            return{status:0,}
        }
        return {status:1, data}
    }

}

export default customerSer