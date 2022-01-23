export type navItemType = {
    label:string,
    path:string,
}


export type profileType = {
    username:string,
    phone:string,
}

export type customerType={
    _id:string,
    name:string,
    come?: '线上' | '邮件' |'介绍'|'促销'|'预约'| '广告',
    phone?:string,
    MobilePhone?:string,   
    email?:string,
    url?:string,
    industry:'金融业' | 'IT' |'房地产'|'商业服务'| '政府' | '其他',
    level: 'A(重点)' | 'B(普通客户)' | 'C(非优先客户)',
    nextTime:Date,
    principal:profileType
}