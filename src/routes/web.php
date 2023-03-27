<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\DishController;

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

Route::get('/', function () {
    return inertia('HomePage');
});

Route::resource('/restaurants',RestaurantController::class);
Route::get('/restaurants/index/{restaurant}',[RestaurantController::class,'index'])
    ->where('restaurant', '\d+')
    ->name('restaurants');

Route::resource('/sections',SectionController::class);
Route::get('/sections/index/{section}',[SectionController::class,'index'])
    ->where('section', '\d+')
    ->name('sections');

Route::resource('/dishs',DishController::class);
Route::get('/dishs/index/{dish}',[DishController::class,'index'])
    ->where('dish', '\d+')
    ->name('dishs');