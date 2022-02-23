
import { gql} from '@apollo/client';

export const CREATE_CONTACT = gql`
    mutation createContact($name:String,$phone:String,$copName:ID,
        $mobilePhone:String,$email:String,$gender:String,
        $remark:String,$address:String,$jobTitle:String
        ){
        createContact(createInput:{name:$name,phone:$phone,copName:$copName,mobilePhone:$mobilePhone,
        email:$email,remark:$remark,gender:$gender,jobTitle:$jobTitle,
        address:$address}){
            phone,
            name,
        }
    }
`

export const GET_CONTACTS=gql`
    query getContacts{
        getContacts {
            _id
            phone
            name
            mobilePhone
            email
            gender
            jobTitle
            nextTime
            copName{
                name
                _id
            }
            address
            remark
            principal {
                _id
                name
        }
        }
    }
`

export const UPDATE_CONTACT=gql`
mutation updateContact($_id:ID!,$name:String,$phone:String,$copName:ID,
        $mobilePhone:String,$email:String,$gender:String,
        $remark:String,$address:String,$jobTitle:String
  ){
  updateContact(updateInput:{_id:$_id,name:$name,phone:$phone,copName:$copName,mobilePhone:$mobilePhone,
  email:$email,gender:$gender,jobTitle:$jobTitle,remark:$remark,
  address:$address}){
    _id
    phone
    name
    mobilePhone
    email
    gender
    jobTitle
    nextTime
    copName{
        name
    }
    address
    remark
    principal {
        name
}
  }
}
`

export const DELETE_CONTACT=gql`
mutation deleteContact($_id:ID!){
    deleteContact(_id:$_id){
    _id
  }
}
`