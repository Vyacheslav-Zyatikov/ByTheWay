<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\SpaController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Auth::routes();

// Route::get('/{any}', [SpaController::class, 'index'])->where('any', '.*');
Route::get('/', [SpaController::class, 'index'])->name('home');
Route::get('register', [RegisterController::class, 'index']);
Route::post('register', [RestaurantController::class, 'store']);
Route::post('login', [RestaurantController::class, 'login']);
// Route::get('account', [AccountController::class, 'index']);
Route::middleware(['auth:restaurant'])->group(function(){
    Route::get('account/{restaurantId}', [AccountController::class,'show'])->where(['restaurantId' => '[1-9][0-9]?']);
});
Route::get('menu/{restaurantId}', [AccountController::class,'showMenu'])->where(['restaurantId' => '[1-9][0-9]?']);
Route::get('orders/{restaurantId}', [AccountController::class,'showOrders'])->where(['restaurantId' => '[1-9][0-9]?']);
Route::get('cart', [CartController::class, 'index']);
Route::get('payment', [PaymentController::class, 'index']);
Route::get('order', [OrderController::class, 'index']);
// Route::post('session', [SessionController::class,'add']);
Route::get('restaurants/{restaurant}', [RestaurantController::class, 'indexRest'])->where(['restaurant' => '[1-9][0-9]?']);

// Route::get('cart', [CartController::class, 'index']);
// Route::delete('cart/{id}', [CartController::class,'destroy']);

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
