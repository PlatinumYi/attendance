<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class Employee extends Model
{
    protected $table = 'employee' ; //
    protected $primaryKey = 'id' ;
    public $timestamps = false ;

    public static function addEmployee($work_number,$name,$password,$gender,$part){

        $employee = new Employee() ;

        $employee->work_number = $work_number ;
        $employee->name = $name ;
        $employee->password = Hash::make($password) ;
        $employee->gender = $gender ;
        $employee->part = $part ;
        $employee->t_create = date('Y-m-d H:i:s',time());

        $employee->save();

        return $employee->id ;
    }

    public static function getIdByWorkNumber($work_number){

        $employee = self::where('work_number',$work_number)->get()->first() ;
        if( !$employee ){
            return false ;
        }else{
            return $employee->id;
        }
    }

    public static function getOneEmployee($id){

        $employee = self::where('id',$id)->get()->first() ;
        return $employee;
    }

    public static function hasWorkNumber($number){

        $check = self::where('work_number',$number)->count();
        return $check ;
    }

    public static function checkPassword($work_number,$password){

        $employee = self::where('work_number',$work_number)
                ->get()->first() ;
        if(!$employee)
            return false ;
        if(Hash::check($password,$employee->password))
         return $employee->id ;
        else
            return false;
    }

}
