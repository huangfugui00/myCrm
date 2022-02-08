import {come,industry,level} from './data'
export type navItemType = {
    label:string,
    path:string,
}


export type profileType = {
    username:string,
    phone:string,
}


type comeType = typeof come[number];
type industryType = typeof industry[number]
type levelType = typeof level[number]

export type customerType={
    key: React.Key;
    _id:string,
    name:string,
    come?: comeType,
    phone?:string,
    mobilePhone?:string,   
    email?:string,
    url?:string,
    industry?:industryType,
    level?: levelType,
    nextTime?:Date,
    principal?:profileType,
}


 
export type columnsDataIndex = "name" | 'phone' | 'email' | 'url' | 'industry' | 'come' | 'mobilePhone' | "level" | 'nextTime' | 'principal'
