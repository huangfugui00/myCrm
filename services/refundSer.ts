import {client} from 'pages/_app'
import {GET_REFUNDS,UPDATE_REFUND,CREATE_REFUND,DELETE_REFUND} from 'graphql/refund'
import {GET_CONTRACTS} from 'graphql/contract'
import {updateRefundInput,createRefundInput,contractType} from 'utils/type'

// export const updateRefundSer = async(refund:updateRefundInput)=>{
//     // refund可以包含updateRefundInput没有的key
//     console.log(refund)
//     const { data } = await client.mutate({
//         mutation: UPDATE_REFUND,
//         variables:{...refund},
//      });
//      return data
// }


export const createRefundSer = async(refund:createRefundInput) =>{
    await client.mutate({
        mutation:CREATE_REFUND,
        variables:{...refund},
       
        update: (store, { data })=>{
            const refundData:any = store.readQuery({
                query: GET_REFUNDS
                });
            store.writeQuery({
                query: GET_REFUNDS,
                data: {
                    getRefunds: refundData.getRefunds.concat(data.createRefund)
                }
            });  
        },
        refetchQueries:[ { query: GET_CONTRACTS }]
    })
}


export const deleteRefundSer = async(_id:string) =>{
    await client.mutate({
        mutation:DELETE_REFUND,
        variables:{_id:_id},
        update: (store, { data })=>{
            const refundData:any = store.readQuery({
                query: GET_REFUNDS
                });
            store.writeQuery({
                query: GET_REFUNDS,
                data: {
                    getRefunds: refundData.getRefunds.filter((refund:any)=>refund._id!==data.deleteRefund._id)
                }
            });
        },
        refetchQueries:[ { query: GET_CONTRACTS }]
    })
}


