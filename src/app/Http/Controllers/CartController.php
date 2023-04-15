<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartResource;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        return new CartResource(Cart::findOrFail($dish_session->id));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cart $cart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        //
    }

    public function add(Request $request)
    {
        $cart = DB::table('dish_session')->insert([
            'id' => $request->id,
            'section_id' => $request->section_id,
            'dish_id' => $request->dish_id,
            'price' => $request->price,
            'count' => $request->count,
            'value' => $request->value,
        ]);

        if($cart){
            return json_encode($cart, JSON_UNESCAPED_UNICODE);
        } else return 'С корзиной что то не так';
    
    }


}
