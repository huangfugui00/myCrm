
import { gql} from '@apollo/client';
export const GET_CUSTOMERS = gql`
    query customers{
        customers {
            _id
            phone
            name
            url
            email
            come
            mobilePhone
            level
            nextTime
            industry
            principal {
                username
                phone
            }
        }
    }
`


export const DELETE_CUSTOMER=gql`
mutation removeCustomer($id: String!) {
    deleteCustomer(id: $id) {
      _id,
      phone,
    }
  }
  
`

export const UPDATE_CUSTOMER = gql`
mutation updateCustomer($id:String!){
    updateCustomer(id:$id){
        phone,
        name,
    }
}
`
