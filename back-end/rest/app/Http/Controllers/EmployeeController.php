<?php

namespace App\Http\Controllers;

use App\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function addEmployee( Request $request ){

        $work_number = $request['work_number'] ;
        if( Employee::hasWorkNumber($work_number)){
            $result = $this->jsonArray(1,'工号已经存在') ;
            return response()->json($result);
        }

        $name = $request['name'];
        $password =  $request['password'];
        $gender = $request['gender'];
        $part = $request['part'];

        $employee_id = Employee::addEmployee($work_number,$name,$password,$gender,$part);
        if(!$employee_id){
            $result = $this->jsonArray(2,'注册员工失败') ;
            return response()->json($result);
        }

        $result = $this->jsonArray(0) ;
        return response()->json($result);

    }


    public function login( Request $request){

        $work_number = $request->input('work_number');
        $password = $request->input('password');
        $employee = Employee::checkPassword((string)$work_number,(string)$password);
        session(['auth_'.$work_number => $employee ]); //将新的用户信息和token覆盖到旧信息上去

        session()->save();

        if($employee){
            return response()->json($this->jsonArray(0,'请求成功',[['work_number'=>$work_number]]));
        }else{
            return response()->json($this->jsonArray(3,'账号或密码错误'));
        }

    }

    public function getCurrentUser(Request $request){

        $work_number = $request->header('work_number');
        $user_id = $request->session()->get('auth_'.$work_number);
        $user = [ 'user'=>$user_id ];
        if(!$user_id){
            return response()->json($this->jsonArray(4,'无人登录'));
        }else{
            return response()->json($this->jsonArray(0,'请求成功',$user));
        }
    }
}