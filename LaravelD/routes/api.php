<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\MemberController;

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

Route::post('/tokens/create', [AuthController::class, "createToken"]);

Route::group(['middleware'=>['JSONResponse', 'auth:sanctum']], function(){
    Route::get('/members', [MemberController::class, "index"]);
    Route::post('/members/create', [MemberController::class, "store"]);
    Route::match(['put', 'patch'], '/members/update/{member}', [MemberController::class, "update"]);    
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
