export class Data{
    id: number       //员工id
    employee: string  //姓名
    part:number;;     // 申请发送到哪个部门                  
     type: number;     // 假期类型                            
    length: number;     // 假期长度                            
     reason : string;  //请假理由                           
     part_agree: number;     // 被部长同意则为1                     
    sub_manager_agree : number;     // 被副经理同意则为1                   
     manager_agree: number;   //  被总经理同意则为1                   
     ban : number;     // 被任何一人拒绝则为该人的id，否则为0 
     pass : number;     // 满足批假条件则为1         
     start_time: string; //开始时间          
}