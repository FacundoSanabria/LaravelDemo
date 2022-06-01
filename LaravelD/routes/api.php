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

Route::post('/tokens/create', function(Request $request) {return "hola";});//[AuthController::class, "createToken"]);
Route::get('/members', [MemberController::class, "index"]);
Route::post('/members', [MemberController::class, "store"]);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
