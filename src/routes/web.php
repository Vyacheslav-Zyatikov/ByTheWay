<?php

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

Route::get('/', function () {
    return inertia('HomePage');
});

Route::get('/wel', function () {
    return inertia('Welcome');
});

Route::get('/registration', function () {
    return inertia('RegisterPage');
});

Route::get('/profile', function () {
    return inertia('ProfilePage');
});

Route::get('/.*', function () {
    return inertia('NotFoundPage');
});
