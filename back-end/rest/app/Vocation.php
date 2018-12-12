<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vocation extends Model
{
    protected $table = 'vocation' ; //
    protected $primaryKey = 'id' ;
    public $timestamps = false ;

    public static function getVocationName($id){

        if($id == 0 )
            return '其他情况';
        else {
            $vocation = self::where('id', $id)->get()->first();
            return $vocation->name;
        }
    }

}
