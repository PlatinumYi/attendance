<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['web']], function () {
    Route::post('/register','EmployeeController@addEmployee'); //注册员工
    Route::post('/login',"EmployeeController@login");  //员工登录
    Route::get('/status',"EmployeeController@getCurrentUser");//获取当前登录状态

    Route::get('/parts',"PartController@getAllParts"); //获取部门列表

    Route::post('/apply',"ApplyController@createApply");          //提交请假申请
    Route::get('/apply/self',"ApplyController@getSelfApply");     //查看自己提交的申请的状态（开始时间降序）
    Route::get('/apply/power',"ApplyController@getApplyInPower"); //查看自己权限下未经处理的申请
    Route::post('apply/agree/{id}',"ApplyController@agreeApply"); //同意某申请
    Route::post('apply/ban/{id}',"ApplyController@banApply");     //拒绝某申请
    Route::get('apply/current',"ApplyController@getCurrentAbsence"); //查看当天所有请假员工的请假信息
});

