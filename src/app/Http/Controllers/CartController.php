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
    public function create(Request $request)
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

        $validated = $request->validate([
            'section_id' => 'required|exists:session,id',
            'dish_id' => 'required|exists:dish,id',
        ]);

        $section_id = $validated['section_id'];
        $dish_id = $validated['dish_id'];

        $cart = DB::table('dish_session')
            ->where('section_id', $section_id)
            ->where('dish_id', $dish_id)
            ->update([
                'price' => $request->price + $cart->price,
                'count' => $request->count + $cart->count,
                'created_at' => now()
            ]);
        
       return response()->json(['message' => 'Блюдо добавлено в корзину'],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try{
            $cart = DB::table('dish_session')
            ->where('id',$id)
            ->get();
            if($cart){
                $cart->delete();
                return response()->json(['message' => 'Блюдо удалено из корзины'],200);
            }else{
                return response()->json([
                    'message' => 'Данной корзины не существует',
                ], 400);
            }

        } catch(Exception $e){
            return response()->json(array('message'=>$e->getMessage()));
        }


    }

    public function add(Request $request)
    {
        $validated = $request->validate([
            'section_id' => 'required|exists:session,id',
            'dish_id' => 'required|exists:dish,id',
        ]);

        $section_id = $validated['section_id'];
        $dish_id = $validated['dish_id'];

        $cart = DB::table('dish_session')->insert([
            'section_id' => $section_id,
            'dish_id' => $dish_id,
            'price' => $request->price,
            'count' => 1,
            'value' => $request->value,
            'created_at' => now()
        ]);

        if($cart){
            return json_encode($cart, JSON_UNESCAPED_UNICODE);
        } else return 'С корзиной что то не так';

    }
}
