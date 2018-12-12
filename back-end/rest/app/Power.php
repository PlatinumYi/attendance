<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Power extends Model
{
    protected $table = 'power' ; //
    protected $primaryKey = 'id' ;
    public $timestamps = false ;

    public static function getUserPower($uid){

        $result = [];
        $powers = self::where('employee_id',$uid)->get()->all() ;
        foreach ( $powers as $power){
            $result[] = $power->part_id;
        }
        return $result;
    }
}
