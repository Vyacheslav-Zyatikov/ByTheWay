<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\DishController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*** РЕСТОРАНЫ ***/
Route::get('restaurants', [RestaurantController::class,'index']);
Route::get('restaurants/{restaurant}', [RestaurantController::class,'show']);

/*** БЛЮДА ***/
Route::get('dishs', [DishController::class,'index']);
Route::get('dishs/{dish}', [DishController::class,'show']);

/*** РАЗДЕЛЫ МЕНЮ ***/
Route::get('sections', [SectionController::class,'index']);