<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group([ 'middleware' => 'auth' ], function () {
    
    Route::get('/notifications', [App\Http\Controllers\UsersController::class, 'notifications']);
    Route::get('messages', [App\Http\Controllers\ChatsController::class, 'fetchMessages']);
    Route::post('messages', [App\Http\Controllers\ChatsController::class, 'sendMessage']);
});
