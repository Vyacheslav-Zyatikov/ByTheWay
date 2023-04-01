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
// добавление
Route::post('restaurants', [RestaurantController::class,'store']);
// редактирование
Route::put('restaurants/{restaurant}', [RestaurantController::class,'update']);
// удаление
Route::delete('restaurants/{restaurant}', [RestaurantController::class,'destroy']);

/*** БЛЮДА ***/
Route::get('dishs', [DishController::class,'index']);
Route::get('dishs/{dish}', [DishController::class,'show']);
// добавление
Route::post('dishs', [DishController::class,'store']);
// редактирование
Route::put('dishs/{dish}', [DishController::class,'update']);
// удаление
Route::delete('dishs/{dish}', [DishController::class,'destroy']);


/*** РАЗДЕЛЫ МЕНЮ ***/
Route::get('sections', [SectionController::class,'index']);
// добавление
Route::post('sections', [SectionController::class,'store']);
// редактирование
Route::put('sections/{section}', [SectionController::class,'update']);
// удаление
Route::delete('sections/{section}', [SectionController::class,'destroy']);