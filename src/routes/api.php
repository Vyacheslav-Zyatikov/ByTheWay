<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\DishOrderController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\DishController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;

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

Route::middleware(['auth:restaurant'])->group(function(){
    Route::get('account/{restaurantId}', [AccountController::class,'show'])->where(['restaurantId' => '[1-9][0-9]?']);
    // Route::get('account/{restaurantId}', [AccountController::class,'getRestaurant']);
    // Route::get('account', [AccountController::class, 'index']);
});

/*** СЕССИИ ***/
Route::post('session', [SessionController::class,'addDishToCart']); // добавить блюда в корзину (в сессию)
Route::get('cart/{sessionId}', [SessionController::class, 'getSessionDishes']); // получить корзину по id сессии
Route::get('cartValue/{sessionId}', [SessionController::class, 'getSessionDishesValue']); // получить стоимость корзины по id сессии
Route::delete('cart/{dishSessionId}', [CartController::class,'destroy']); // удалить блюдо из корзины по id записи в таблице dish_session
/*** ЗАКАЗЫ ***/
Route::get('orders/{restaurantId}', [OrderController::class,'getRestaurantOrders']); // получить список заказов ресторана по id
Route::get('sessionOrders/{sessionId}', [OrderController::class,'getSessionOrders']); // получить список заказов юзера по id сессии
Route::post('order', [OrderController::class,'store']); // создать заказ
Route::post('orders/{orderId}', [OrderController::class,'updateStatus']); // изменить статус заказа
Route::post('dishOrder', [DishOrderController::class,'store']); // добавить блюда в заказ
/*** ЮЗЕРЫ ***/
Route::post('users/{sessionId}', [UserController::class,'updatePhone']); // изменить телефон юзера по id сессии 
/*** РЕСТОРАНЫ ***/
Route::get('restaurants', [RestaurantController::class,'index']);
Route::get('restaurants/{restaurant}', [RestaurantController::class,'show']);
// Route::get('account/{restaurantId}', [AccountController::class,'getRestaurant']);
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
// Route::get('cart/{cart}', [CartController::class,'show']);
//создание корзины
// Route::post('cart',[CartController::class,'create']);
//добавление нового блюда
// Route::put('cart/{dish}', [CartController::class,'update']);
// удаление
// Route::delete('cart/{cart}', [DishController::class,'destroy']);
//удаление блюда изкорзины
// Route::delete('cart/{dish}',[DishController::class,'deldish']);