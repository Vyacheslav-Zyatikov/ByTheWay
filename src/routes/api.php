<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\DishController;
use App\Http\Controllers\CartController;

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

Route::middleware('auth:sanctum')->get('/restaurant', function (Request $request) {
    return $request->restaurant();
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('account', [AccountController::class, 'index']);
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

/*** РАЗДЕЛЫ МЕНЮ ***/
// разделы меню конкретного ресторана со списком блюд в каждом разделе
Route::get('sections/{restaurantId}', [SectionController::class,'getRestaurantSections']);
// // добавление
// Route::post('sections', [SectionController::class,'store']);
// // редактирование
// Route::put('sections/{section}', [SectionController::class,'update']);
// // удаление
// Route::delete('sections/{section}', [SectionController::class,'destroy']);

/*** БЛЮДА ***/
// Route::get('dishes', [DishController::class,'index']);
// Route::get('dishes/{dish}', [DishController::class,'show']);
// // добавление
// Route::post('dishes', [DishController::class,'store']);
// // редактирование
// Route::put('dishes/{dish}', [DishController::class,'update']);
// // удаление
// Route::delete('dishes/{dish}', [DishController::class,'destroy']);

/*** КОРЗИНА ***/
Route::get('cart/{cart}', [CartController::class,'show']);
//создание корзины
Route::post('cart',[CartController::class,'create']);
//добавление нового блюда
Route::put('cart/{dish}', [CartController::class,'update']);
// удаление
Route::delete('cart/{cart}', [DishController::class,'destroy']);
//удаление блюда изкорзины
Route::delete('cart/{dish}',[DishController::class,'deldish']);
