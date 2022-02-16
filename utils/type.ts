import {come,industry,level,gender} from './data'
export type navItemType = {
    label:string,
    path:string,
}


export type profileType = {
    phone:string,
}

export type userType = {
    username:string,
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

export type contactType={
    key: React.Key;
    _id:string,
    name:string,
    copName?:customerType,
    jobTitle?:string,
    phone?:string,
    mobilePhone?:string,   
    email?:string,
    address?:string,
    remark?:string,
    gender?: genderType,
    nextTime?:Date,
    [key: string]: any,
    principal?:userType,
}

export type updateContactInput={
    _id:string,
    name:string,
    copName?:string,
    jobTitle?:string,
    phone?:string,
    mobilePhone?:string,   
    email?:string,
    address?:string,
    remark?:string,
    gender?: genderType,
}

export type columnsDataIndex = "name" | 'phone' | 'email' | 'url' | 'industry' | 'come' | 'mobilePhone' | "level" | 'nextTime' | 'principal' | 'address' | 'remark'

