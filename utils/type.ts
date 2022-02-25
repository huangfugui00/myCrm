import {come,industry,level,gender,CONTRACT_TYPE,PRODUCT_COLUMNS} from './data'
export type navItemType = {
    label:string,
    path:string,
}


export type profileType = {
    phone:string,
}

export type userType = {
    name:string,
    _id:string,
    roles:string[],
    email:string,
}

export type authType={
    token:string,
    user:userType
}


type comeType = typeof come[number];
type industryType = typeof industry[number]
type levelType = typeof level[number]
type genderType = typeof gender[number]
type contractTypeType = typeof CONTRACT_TYPE[number]
type productColumnType = typeof PRODUCT_COLUMNS[number]

export type customerType={
    key: React.Key;
    _id:string,
    name:string,
    come?: comeType,
    phone?:string,
    mobilePhone?:string,   
    email?:string,
    url?:string,
    address?:string,
    remark?:string,
    industry?:industryType,
    level?: levelType,
    nextTime?:Date,
    principal?:userType,
    [key: string]: any,
}


export type contactItemType={
    name:string,
    jobTitle?:string,
    phone?:string,
    mobilePhone?:string,   
    email?:string,
    address?:string,
    remark?:string,
    gender?: genderType,
}

export type contactType={
    _id:string,
    nextTime?:Date,
    [key: string]: any,
    principal?:userType,
    copName?:customerType
} & contactItemType

export type updateContactInput={
    _id:string,
    copName?:string,
} & contactItemType

export type createContactInput = {
    copName?:string,
} & contactItemType


export type productType={
    [key: string]: any,
    product:string,
    price:number,
    remark?:string,
}

export type contractItemType = {
    name:string,
    contractType?:contractTypeType,
    remark?:string,
    disCount?:number,
    products?:productType[]
}

export type contractType = {
    _id:string,
    [key: string]: any,
    price?:number,
    copName?:customerType,
    signatory?:userType,
    cuSignatory?:contactType,
} & contractItemType

export type updateContractInput={
    _id:string,
    copName?:string,
    cuSignatory?:string,
} & contractItemType

export type refundItemType={
    refundPrice:number,
    refundDate?:Date,
    refundType?:string,
    remark?:string,
    contractPrice?:number,
}

export type refundType={
    _id:string,
    copName?:customerType,
    contract?:contractType,
    principal?:userType,
    [key: string]: any,
} & refundItemType

export type createRefundInput={
    copName?:string,
    contract?:string,
    principal?:string,
}& refundItemType

export type updateRefundInput={
    _id:string,
    copName?:string,
    contract?:string,
    principal?:string,
}& refundItemType

export type createContractInput = updateContractInput

export type columnsDataIndex = "name" | 'phone' | 'email' | 'url' | 'industry' | 'come' | 'mobilePhone' | "level" | 'nextTime' | 'principal' | 'address' | 'remark'

