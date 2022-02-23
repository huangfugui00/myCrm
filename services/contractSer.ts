import {client} from 'pages/_app'
import {GET_CONTRACTS,UPDATE_CONTRACT,CREATE_CONTRACT,DELETE_CONTRACT} from 'graphql/contract'
import {updateContractInput,createContractInput} from 'utils/type'

export const updateContractSer = async(contract:updateContractInput)=>{
    // contract可以包含updateContractInput没有的key
    console.log(contract)
    const { data } = await client.mutate({
        mutation: UPDATE_CONTRACT,
        variables:{...contract},
     });
     return data
}


export const createContractSer = async(contract:createContractInput) =>{
    await client.mutate({
        mutation:CREATE_CONTRACT,
        variables:{...contract},
        update: (store, { data })=>{
            const contractData:any = store.readQuery({
                query: GET_CONTRACTS
                });
            store.writeQuery({
                query: GET_CONTRACTS,
                data: {
                    getContracts: contractData.getContracts.concat(data.createContract)
                }
            });
        }
    })
}


export const deleteContractSer = async(_id:string) =>{
    await client.mutate({
        mutation:DELETE_CONTRACT,
        variables:{_id:_id},
        update: (store, { data })=>{
            const contractData:any = store.readQuery({
                query: GET_CONTRACTS
                });
            store.writeQuery({
                query: GET_CONTRACTS,
                data: {
                    getContracts: contractData.getContracts.filter((contract:any)=>contract._id!==data.deleteContract._id)
                }
            });
        }
    })
}


