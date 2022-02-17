import {client} from 'pages/_app'
import {GET_CONTACTS,UPDATE_CONTACT,CREATE_CONTACT,DELETE_CONTACT} from 'graphql/contact'
import {updateContactInput,createContactInput} from 'utils/type'



export const updateContactSer = async(contact:updateContactInput)=>{
    const { data } = await client.mutate({
        mutation: UPDATE_CONTACT,
        variables:{...contact},
     });
     return data
}


export const createContactSer = async(contact:createContactInput) =>{
    await client.mutate({
        mutation:CREATE_CONTACT,
        variables:{...contact},
        update: (store, { data })=>{
            const contactData:any = store.readQuery({
                query: GET_CONTACTS
                });
            store.writeQuery({
                query: GET_CONTACTS,
                data: {
                    getContacts: contactData.getContacts.concat(data.createContact)
                }
            });
        }
    })
}


export const deleteContactSer = async(_id:string) =>{
    await client.mutate({
        mutation:DELETE_CONTACT,
        variables:{_id:_id},
        update: (store, { data })=>{
            const contactData:any = store.readQuery({
                query: GET_CONTACTS
                });
            store.writeQuery({
                query: GET_CONTACTS,
                data: {
                    getContacts: contactData.getContacts.filter((contact:any)=>contact._id!==data.deleteContact._id)
                }
            });
        }
    })
}
