<?php

namespace App\Http\Controllers;

use App\Models\DishOrder;
use Illuminate\Http\Request;

class DishOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request)
    {
        $dishes = json_decode($request->dishes);

        foreach ($dishes as $dish) {
            $dishOrder = DishOrder::make([
                'order_id' => $dish->order_id,
                'dish_id' => $dish->dish_id,
                'price' => $dish->price,
                'count' => $dish->count,
                'value' => $dish->value,
            ]);
            $dishOrder->save();
        };

        return response()->json(['message' => 'Блюда добавлены в заказ'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(DishOrder $dishOrder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DishOrder $dishOrder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DishOrder $dishOrder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DishOrder $dishOrder)
    {
        //
    }
}
