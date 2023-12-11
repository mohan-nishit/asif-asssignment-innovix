<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventController;

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




Route::group([
    
    'prefix' => 'user'

], function () {
    Route::post('register', [UserController::class,'register']);
    Route::post('login', [UserController::class, 'login'])->name('login');
    

});

Route::group([

    'middleware' => ['auth.jwt'],
    'prefix' => 'event'

], function () {

    Route::get('list',  [EventController::class,'list']);
    Route::get('details/{event_id}',  [EventController::class,'details']);
    Route::get('book/{event_id}',  [EventController::class,'book']);
    Route::get('order',  [EventController::class,'orderList']);


});
