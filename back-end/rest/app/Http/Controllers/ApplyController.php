<?php

namespace App\Http\Controllers;

use App\Apply;
use App\Employee;
use App\Part;
use App\Power;
use App\Vocation;
use Illuminate\Http\Request;

class ApplyController extends Controller
{



     public function createApply(Request $request){



         $work_number = $request->header('work_number');
         $user_id = Employee::getIdByWorkNumber($work_number);

         if(!$user_id){
             return response()->json($this->jsonArray(22,'获取登录状态失败'));
         }
         $part = Employee::getOneEmployee($user_id)->part ; //测试 之后换成session取值
         $reason = $request->input('reason');
         $length = $request->input('length');
         $start_time = $request->input('start_time');
         $type = $request->input('type');

         $apply = Apply::createApply($user_id,$part,$type,$length,$reason,$start_time);
         if(!$apply){
             return response()->json($this->jsonArray(21,'创建请求失败'));
         }

         return response()->json($this->jsonArray(0,'请求成功'));

     }

     public function getSelfApply(Request $request){


         $work_number = $request->header('work_number');
         $user_id = Employee::getIdByWorkNumber($work_number);

         if(!$user_id){
             return response()->json($this->jsonArray(22,'获取登录状态失败'));
         }
         $applys = Apply::getUserApply($user_id);
         $result = [] ;
         foreach ($applys as $apply){
             $result[] = [
               'part' => Part::getPartName($apply->part),
               'type' => Vocation::getVocationName($apply->type),
               'start_time' => $apply->start_time,
               'length' => $apply->length,
               'reason' => $apply->reason,
               'part_agree' => $apply->part_agree,
               'sub_manager_agree' => $apply->sub_manager_agree,
               'manager_agree' => $apply->manager_agree,
               'ban' => $apply->ban,
                'pass' => $apply->pass,
             ];
         }
         return response()->json($this->jsonArray(0,'请求成功',$result));
     }

     public function getCurrentAbsence(){

         $applys = Apply::getCurrentAllowed();
         $result = [];
         foreach ($applys as $apply){
             $result[] = [
                 'employee' => Employee::getOneEmployee($apply->user_id)->name ,
                 'part' => Part::getPartName($apply->part),
                 'type' => Vocation::getVocationName($apply->type),
                 'start_time' => $apply->start_time,
                 'length' => $apply->length,
                 'reason' => $apply->reason,
                 'part_agree' => $apply->part_agree,
                 'sub_manager_agree' => $apply->sub_manager_agree,
                 'manager_agree' => $apply->manager_agree,
                 'ban' => $apply->ban,
                 'pass' => $apply->pass
             ];
         }
         return response()->json($this->jsonArray(0,'请求成功',$result));
     }

     public function getApplyInPower(Request $request){


         $work_number = $request->header('work_number');
         $user_id = Employee::getIdByWorkNumber($work_number);

         if(!$user_id){
             return response()->json($this->jsonArray(22,'获取登录状态失败'));
         }
         $power = Power::getUserPower($user_id);
         $applys = Apply::getApplyByPower($power);
         $result = [];
             foreach ($applys as $apply) {
                 $result[] = [
                     'id' => $apply->id,
                     'employee' => Employee::getOneEmployee($apply->user_id)->name ,
                     'part' => Part::getPartName($apply->part),
                     'type' => Vocation::getVocationName($apply->type),
                     'start_time' => $apply->start_time,
                     'length' => $apply->length,
                     'reason' => $apply->reason,
                     'part_agree' => $apply->part_agree,
                     'sub_manager_agree' => $apply->sub_manager_agree,
                     'manager_agree' => $apply->manager_agree,
                     'ban' => $apply->ban,
                     'pass' => $apply->pass
                 ];
             }
         return response()->json($this->jsonArray(0,'请求成功',$result));
     }


     public function agreeApply(Request $request,$apply_id){


         $work_number = $request->header('work_number');
         $user_id = Employee::getIdByWorkNumber($work_number);

         if(!$user_id){
             return response()->json($this->jsonArray(22,'获取登录状态失败'));
         }
         $powers = Power::getUserPower($user_id);
         $apply = Apply::getOneApply($apply_id);
         foreach ( $powers as $power ){
             if( $power == -1 )
                 Apply::allowApply($apply_id,2);
             if( $power == 0 )
                 Apply::allowApply($apply_id,1);
             if( $power == $apply->part )
                 Apply::allowApply($apply_id,0);
         }
         return response()->json($this->jsonArray(0));
     }

    public function banApply(Request $request,$apply_id){


        $work_number = $request->header('work_number');
        $user_id = Employee::getIdByWorkNumber($work_number);

        if(!$user_id){
            return response()->json($this->jsonArray(22,'获取登录状态失败'));
        }

        $powers = Power::getUserPower($user_id);
        $apply = Apply::getOneApply($apply_id);
        foreach ( $powers as $power ){
            if( $power == -1 ) {
                Apply::banApply($apply_id, $user_id);
                break;
            }
            if( $power == 0 ) {
                Apply::banApply($apply_id, $user_id);
                break;
            }
            if( $power == $apply->part ) {
                Apply::banApply($apply_id, $user_id);
                break;
            }
        }
        return response()->json($this->jsonArray(0));
    }
}
