<?php

namespace App\Http\Controllers;

use App\Http\Resources\RestaurantResource;
use App\Http\Resources\SectionResource;
use App\Models\Dish;
use App\Models\Restaurant;
use App\Models\Section;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return RestaurantResource::collection(Restaurant::where('isadmin', 0)->get());
    }
    /**
     * Display page.
     */

  public function indexRest(Restaurant $restaurant)
    {
        $dishes = Dish::restaurantDish($restaurant->id)->get();
        //dd($dishes);

        return Inertia::render('Restaurant', [
            'restaurant' => $restaurant,
            'dishes' => $dishes,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $restaurant = Restaurant::create($request->all());

        return response()->json($restaurant,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant)
    {
        return new RestaurantResource(Restaurant::findOrFail($restaurant->id));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Restaurant $restaurant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Restaurant $restaurant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant)
    {
        //
    }
}
