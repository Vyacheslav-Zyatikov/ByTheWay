<?php

use App\Http\Controllers\SpaController;
use App\Http\Controllers\Auth\RegisterController;
// use App\Http\Controllers\CartController;
// use App\Http\Controllers\SessionController;
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

//Auth::routes();

// Route::get('/{any}', [SpaController::class, 'index'])->where('any', '.*');
Route::get('', [SpaController::class, 'index']);
Route::get('register', [RegisterController::class, 'index']);

// Route::delete('cart/{id}', [CartController::class,'destroy']);
// Route::post('session', [SessionController::class,'add']);