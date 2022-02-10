
import { gql} from '@apollo/client';
export const GET_CUSTOMERS = gql`
    query getCustomers{
        getCustomers {
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
mutation updateCustomer($_id:ID!,$name:String,$phone:String,$come:String,
    $mobilePhone:String,$email:String,$url:String,$industry:String,$level:String,
    $remark:String,$address:String
    ){
    updateCustomer(updateInput:{_id:$_id,name:$name,phone:$phone,come:$come,mobilePhone:$mobilePhone,
    email:$email,url:$url,industry:$industry,level:$level,remark:$remark,
    address:$address}){
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
                }
    }
}
`

export const LOGIN = gql`
mutation login($email:String!,$password:String!){
    login(email:$email,password:$password){
      token
    }
  }
`

// export const UPDATE_CUSTOMER = gql`
// mutation updateCustomer($_id:String!,$name:String,$phone:String,$come:String,
//     $mobilePhone:String,$email:String,$url:String,$industry:String,$level:String,
//     $nextTime:Date,$remark:String,$address:String,
//     ){
//     updateCustomer(_id:$_id,name:$name,phone:$phone,come:$come,mobilePhone:$mobilePhone,
//     email:$email,url:$url,industry:$industry,level:$level,nextTime:$nextTime,remark:$remark,
//     address:$address){
//         _id
//         phone
//         name
//         url
//         email
//         come
//         mobilePhone
//         level
//         nextTime
//         industry
//         address
//         remark
//         principal {
//             username
//             phone
//         }
//     }
// }
// `
