
import { gql} from '@apollo/client';

export const CREATE_CONTRACT = gql`
mutation createContract($name:String,$signatory:ID,$copName:ID,
    $cuSignatory:ID,$price:Float,$contractType:String,
    $remark:String,$disCount:Float,$products:[ProductInput]
    ){
    createContract(createInput:{name:$name,signatory:$signatory,copName:$copName,cuSignatory:$cuSignatory,
    price:$price,remark:$remark,contractType:$contractType,disCount:$disCount,
    products:$products}){
        price,
        name,
    }
}
`


export const GET_CONTRACTS= gql`
query getContracts{
    getContracts {
        _id
        name
        price
        paid
        unPaid
      	remark
      	disCount
      	contractType
      	products{
          price
          product
          remark
        }
        copName{
           name
          _id
        }
        remark
      	cuSignatory{
          _id
          name
        }
        signatory {
          _id
          name
       }
    }
}
`


// input ProductInput{
//     product:String
//     price:Float
//     remark:String
// }

export const UPDATE_CONTRACT=gql`


mutation updateContract($_id:ID!,$name:String,$copName:ID,
    $cuSignatory:ID,$contractType:String,
    $remark:String,$disCount:Float,$products:[ProductInput]
){
updateContract(updateInput:{_id:$_id,name:$name,copName:$copName,cuSignatory:$cuSignatory,
,contractType:$contractType,remark:$remark,disCount:$disCount,
,products:$products})
{
    _id
    name
    price
    paid
    unPaid
      remark
      disCount
      contractType
      products{
      price
      product
      remark
    }
    copName{
       name
      _id
    }
    remark
      cuSignatory{
      _id
      name
    }
    signatory {
      _id
      name
   }
}
}
`

export const DELETE_CONTRACT=gql`
mutation deleteContract($_id:ID!){
    deleteContract(_id:$_id){
    _id
  }
}
`