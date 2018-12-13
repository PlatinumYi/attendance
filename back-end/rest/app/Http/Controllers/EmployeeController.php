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
        if($employee){
            return response()->json($this->jsonArray(0))->cookie('user',$employee,1440,'/');
        }else{
            return response()->json($this->jsonArray(3,'账号或密码错误'));
        }

    }
}