
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
            address
            remark
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
mutation updateCustomer($id:String!,$name:String,$phone:String,$come:String,
    $mobilePhone:String,$email:String,$url:String,$industry:String,$level:String,
    $nextTime:Date,$remark:String,$address:String,
    ){
    updateCustomer(id:$id,name:$name,phone:$phone,come:$come,mobilePhone:$mobilePhone,
    email:$email,url:$url,industry:$industry,level:$level,nextTime:$nextTime,remark:$remark,
    address:$address){
        phone,
        name,
    }
}
`
