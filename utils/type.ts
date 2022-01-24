import {ColumnsType} from 'antd/es/table'

export type navItemType = {
    label:string,
    path:string,
}


export type profileType = {
    username:string,
    phone:string,
}

export type customerType={
    key: React.Key;
    _id:string,
    name:string,
    come?: '线上' | '邮件' |'介绍'|'促销'|'预约'| '广告',
    phone?:string,
    mobilePhone?:string,   
    email?:string,
    url?:string,
    industry:'金融业' | 'IT' |'房地产'|'商业服务'| '政府' | '其他',
    level: 'A(重点)' | 'B(普通客户)' | 'C(非优先客户)',
    nextTime:Date,
    principal:profileType
}


const cellStyle={
    maxWidth:200,
    overflow:'hidden',
    whiteSpace:'nowrap',
    textOverflow:'ellipsis',
    cursor:'pointer'
}

export const columns = [

    {
      title: '客户姓名',
      dataIndex: 'name',
      align:'center',
      editable:true,
      width:200,
      onCell:()=>{
          return{
              style:cellStyle
          }
      }
    //   render: (text: string) => {text},
    },
    {
      title: '电话',
      dataIndex: 'phone',
      align:'center',
      width:200,
      onCell:()=>{
          return{
              style:cellStyle
          }
      }
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width:200,
      onCell:()=>{
          return{
              style:cellStyle
          }
      }
    },
    {
        title:'网址',
        dataIndex:'url',
        width:200,
        onCell:()=>{
            return{
                style:cellStyle
            }
        }
    },
    {
        title:'客户行业',
        dataIndex:'industry',
        width:200,
        onCell:()=>{
            return{
                style:cellStyle
            }
        }
    },
    {
        title:'客户来源',
        dataIndex:'come',
        width:200,
        onCell:()=>{
            return{
                style:cellStyle
            }
        }
    },
    {
        title:'手机',
        dataIndex:'mobilePhone',
        width:200,
        onCell:()=>{
            return{
                style:cellStyle
            }
        }
    },
    {
        title:'客户级别',
        dataIndex:'level',
        width:200,
        onCell:()=>{
            return{
                style:cellStyle
            }
        }
    },
    {
        title:'下次联系时间',
        dataIndex:'nextTime',
        width:200,
      onCell:()=>{
          return{
              style:cellStyle
          }
      }
    },
    {
        title:'负责人',
        dataIndex:'principle',
        width:200,
        onCell:()=>{
            return{
                style:cellStyle
            }
        }
    },
   
   

  ];

