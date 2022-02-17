import {client} from 'pages/_app'
import {GET_CUSTOMERS,DELETE_CUSTOMER,UPDATE_CUSTOMER,CREATE_CUSTOMERS} from 'graphql/customer'
import {customerType} from 'utils/type'

export const getCustomersSer =async()=>{
    const customersQuery = await client.query({
        query: GET_CUSTOMERS,
     });
     return customersQuery
}

export const updateCustomerSer = async(customer:customerType)=>{
    const { data } = await client.mutate({
        mutation: UPDATE_CUSTOMER,
        variables:{...customer},
     });
     return data
}

export const createCustomerSer = async(customer:customerType) =>{
    await client.mutate({
        mutation:CREATE_CUSTOMERS,
        variables:{...customer},
        update: (store, { data })=>{
            const customerData:any = store.readQuery({
                query: GET_CUSTOMERS
                });
            store.writeQuery({
                query: GET_CUSTOMERS,
                data: {
                    getCustomers: customerData.getCustomers.concat(data.createCustomer)
                }
            });
        }
    })
}


export const deleteCustomerSer = async(_id:string) =>{
    await client.mutate({
        mutation:DELETE_CUSTOMER,
        variables:{_id:_id},
        update: (store, { data })=>{
            const customerData:any = store.readQuery({
                query: GET_CUSTOMERS
                });
            store.writeQuery({
                query: GET_CUSTOMERS,
                data: {
                    getCustomers: customerData.getCustomers.filter((customer:any)=>customer._id!==data.deleteCustomer._id)
                }
            });
        }
    })
}
