<?php

use App\Http\Controllers\SpaController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\SessionController;
use App\Models\Dish;
use App\Models\Restaurant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
Route::get('/', [SpaController::class, 'index']);
Route::get('register', [RegisterController::class, 'index']);
Route::get('restaurants/{restaurant}', [RestaurantController::class, 'indexRest'])->where(['restaurant' => '[1-9][0-9]?']);
/*
Route::get('restaurants/{restaurant}', function (Restaurant $restaurant) {

    return Inertia::render('Restaurant', [
        'restaurant' => Restaurant::all()->map(function ($restaurant) {
            return [
                'id' => $restaurant->id,
                'image' => $restaurant->image,
                'title' => $restaurant->title,
            ];
        }),
        'dishes' => Dish::all()->map(function ($dish) {
            return [
                'id' => $dish->id,
                'image' => $dish->image,
                'title' => $dish->title,
            ];
        }),
    ]);
})->where(['restaurant' => '[1-9][0-9]?']);
*/
// Route::get('cart', [CartController::class, 'index']);
// Route::delete('cart/{id}', [CartController::class,'destroy']);
// Route::post('session', [SessionController::class,'add']);
