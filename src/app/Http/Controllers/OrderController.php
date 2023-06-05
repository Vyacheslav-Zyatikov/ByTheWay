<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Resources\RestaurantResource;
use App\Http\Resources\OrderResource;
use App\Models\Restaurant;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('client/OrderPage');
    }

    public function getRestaurantOrders($id)
    {
        $restaurant = new RestaurantResource(Restaurant::with(['orders.dish_orders', 'orders.dish_orders.dish'])->findOrFail($id));

        return OrderResource::collection($restaurant->orders()->get());
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
        $order = Order::make([
            'session_id' => (int)$request->session_id,
            'restaurant_id' => (int)$request->restaurant_id,
            'total' => (float)$request->total,
            'status' => 'new',
        ]);
        $order->save();

        return $order;
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
