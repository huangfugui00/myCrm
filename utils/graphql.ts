
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
           }
        }
    }
`

export const CREATE_CUSTOMERS = gql`
mutation createCustomer($name:String,$phone:String,$come:String,
  $mobilePhone:String,$email:String,$url:String,$industry:String,$level:String,
  $remark:String,$address:String
  ){
  createCustomer(createInput:{name:$name,phone:$phone,come:$come,mobilePhone:$mobilePhone,
  email:$email,url:$url,industry:$industry,level:$level,remark:$remark,
  address:$address}){
      phone,
      name,
  }
}
`


export const DELETE_CUSTOMER=gql`
mutation deleteCustomer($_id:ID!){
  deleteCustomer(_id:$_id){
    _id
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
      user{
        _id
        roles
        email
        username
      }
    }
  }
`

