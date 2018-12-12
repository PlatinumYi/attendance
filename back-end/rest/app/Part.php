<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    protected $table = 'part' ; //
    protected $primaryKey = 'id' ;
    public $timestamps = false ;

    public static function getAllParts(){

        $parts = self::get() ;
        return $parts ;
    }

    public static function getPartName($pid){


            $parts = self::where('id', $pid)->get()->first();
            return $parts->name;

    }


}
