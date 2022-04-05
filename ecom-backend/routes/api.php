<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register',[UserController::class,'register']);
Route::post('login',[UserController::class,'login']);
Route::post('add',[ProductController::class,'addProduct']);
Route::get('list/{offset}',[ProductController::class,'list']);
Route::delete('delete/{id}',[ProductController::class,'delete']);
Route::get('product/{id}',[ProductController::class,'getProduct']);
Route::put('update/{id}',[ProductController::class,'update']);
Route::get('search/{key}/{offset}',[ProductController::class,'search']);
