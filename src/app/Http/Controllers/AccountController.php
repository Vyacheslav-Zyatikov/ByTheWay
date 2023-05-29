<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Restaurant;
use App\Http\Resources\RestaurantResource;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function index() 
    {
        return inertia('AccountPage');
    }

    public function show($id)
    {        
        $restaurant = new RestaurantResource(Restaurant::findOrFail($id));
        $authRestId = Auth::guard('restaurant')->id();

        if ($restaurant->id === $authRestId) {
            return inertia('AccountPage', [
                'restaurant' => $restaurant,
            ]);
        }

        return redirect('/');
    }

    public function getRestaurant($id)
    {
        return new RestaurantResource(Restaurant::findOrFail($id));
    }

    public function showMenu($id)
    {        
        $restaurant = new RestaurantResource(Restaurant::findOrFail($id));
        $authRestId = Auth::guard('restaurant')->id();

        if ($restaurant->id === $authRestId) {
            return Inertia::render('RestMenuPage', [
                'restaurant' => $restaurant,
            ]);
        }

        return redirect('/');
    }

    public function showOrders($id)
    {        
        $restaurant = new RestaurantResource(Restaurant::findOrFail($id));
        $authRestId = Auth::guard('restaurant')->id();

        if ($restaurant->id === $authRestId) {
            return Inertia::render('RestOrdersPage', [
                'restaurant' => $restaurant,
            ]);
        }

        return redirect('/');
    }
}