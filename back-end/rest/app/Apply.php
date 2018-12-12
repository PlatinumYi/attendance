<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Apply extends Model
{
    protected $table = 'apply' ; //
    protected $primaryKey = 'id' ;
    public $timestamps = false ;

    public static function createApply($user,$part,$type,$length,$reason,$start_time){

        $apply = new Apply();
        $apply->user_id = $user ;
        $apply->part = $part ;
        $apply->type = $type ;
        $apply->length = $length ;
        $apply->reason = $reason ;
        $apply->start_time = $start_time;
        $apply->end_time = date('Y-m-d', strtotime($start_time) + 3600*24*$length);
        $apply->save() ;

        return $apply->id ;
    }

    public static function getOneApply($id){

        $apply = self::where('id',$id)->get()->first();
        return $apply ;
    }

    public static function getUserApply($user){

        $apply = self::where('user_id',$user)->orderBy('start_time','desc')->get()->all();
        return $apply ;

    }

    public static function getCurrentAllowed(){

        $apply = self::where('start_time','<=',date('Y-m-d',time()))
                      ->where('end_time','>=',date('Y-m-d',time()))
                      ->where('pass',1)
                      ->get()->all() ;
        return $apply ;
    }

    public static function getApplyByPower($powers){

        $result = [] ;
        foreach ( $powers as $power ){

            $apply = array() ;
            if($power == -1 ){
                $apply = self::where('length','>',80)
                             ->where('manager_agree',0)
                             ->where('ban',0)
                             ->get()->all();
            }elseif ($power == 0){
                $apply = self::where('sub_manager_agree',0)
                    ->where('ban',0)
                    ->get()->all();

            }else{
                $apply = self::where('part',$power)
                    ->where('part_agree',0)
                    ->where('ban',0)
                    ->get()->all();
            }

            $result = $result+$apply ;

        }
        return $result ;
    }

    public static function allowApply($id,$position){

        switch($position){
            case 0 :
                self::where('id',$id)->update(['part_agree'=>1]);
                break;
            case 1 :
                self::where('id',$id)->update(['sub_manager_agree'=>1]);
                break;
            case 2 :
                self::where('id',$id)->update(['manager_agree'=>1]);
                break;
        }
        $apply = self::where('id',$id)->get()->first();
        if( ($apply->length <= 3||$apply->manager_agree) && $apply->sub_manager_agree && $apply->part_agree ){
            self::where('id',$id)->update(['pass'=>1]);
        }

    }

    public static function banApply($id,$user_id){

        self::where('id',$id)->update(['ban'=>$user_id]);
    }
}
