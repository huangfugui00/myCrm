import { gql} from '@apollo/client';

export const CREATE_REFUND=gql`
mutation createRefund($copName:ID!,$contract:ID!,
    $principal:ID,$refundPrice:Float,
    $refundDate:Date,$refundType:String,$remark:String
    ){
    createRefund(createInput:{contract:$contract,copName:$copName,principal:$principal,
    remark:$remark,refundPrice:$refundPrice,refundDate:$refundDate,
    refundType:$refundType}){
      _id
      copName{
        _id
        name
      }
      contract{
        price
        name
      }
      principal{
        _id
        name
      }
      remark
      refundType
      refundDate
      refundPrice
      contractPrice
    }
}
`
export const UPDATE_REFUND=gql`
mutation updateRefund($_id:ID!,
    $principal:ID,$refundPrice:Float,
    $refundDate:Date,$refundType:String,$remark:String
    ){
    updateRefund(updateInput:{_id:$_id,principal:$principal,
    remark:$remark,refundPrice:$refundPrice,refundDate:$refundDate,
    refundType:$refundType}){
        _id
        copName{
          _id
          name
        }
        contract{
          price
          name
        }
        principal{
          _id
          name
        }
        remark
        refundType
        refundDate
        refundPrice
        contractPrice
    }
}
`

export const DELETE_REFUND=gql`
mutation deleteRefund($_id:ID!){
    deleteRefund(_id:$_id){
    _id
  }
}
`

export const GET_REFUNDS=gql`
query getRefunds{
    getRefunds {
        _id
        copName{
          _id
          name
        }
        contract{
          price
          name
        }
        principal{
          _id
          name
        }
        remark
        refundType
        refundDate
        refundPrice
        contractPrice
    }
}
`