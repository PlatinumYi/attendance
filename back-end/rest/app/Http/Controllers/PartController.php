<?php

namespace App\Http\Controllers;

use App\Part;
use Illuminate\Http\Request;

class PartController extends Controller
{
    public function getAllParts(){

        $parts = Part::getAllParts() ;
        if(!$parts){
            $result = $this->jsonArray(11,'获取部门列表失败') ;
            return response()->json($result);
        }

        $data = [
           [
               'id' => 0 ,
               'name' => '公司最高管理层'
           ]
        ] ;
        foreach ( $parts as $part ){

            $data[] = [
               'id' => $part->id ,
               'name' => $part->name
            ];
        }
        $result = $this->jsonArray(0,'请求成功',$data) ;
        return response()->json($result);
    }
}
