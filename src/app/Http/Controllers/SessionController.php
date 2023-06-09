<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Models\Session;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SessionController extends Controller
{
    /**
     * Добавить блюдо в корзину (то есть в сессию), 
     * если сессии нет - создать ее и привязать к ней нового пользователя
     *
     * @param  Request  $request
     * @return Response
     */
    public function addDishToCart(Request $request)
    {
        $dish = json_decode($request->dish);
        $cartValue = (float)$dish->price * (int)$dish->quantity;
        $token = $request->session()->get('_token');
        $session = Session::where('title', $token)->first();

        if (empty($session)) {
            $user = User::make([
                'phone' => '1',
            ]);
            $user->save();
    
            $session = Session::make($request->post() + [
                'title' => $token,
                'user_id' => $user->id,
            ]);
            $session->save();
        }

        $cartItem = Cart::make([
            'session_id' => $session->id,
            'dish_id' => $dish->id,
            'price' => $dish->price,
            'count' => $dish->quantity,
            'value' => $cartValue,
        ]);
        $cartItem->save();

        $cartItemArray = $cartItem->getAttributes();

        $dishArray = array_merge($cartItemArray, ['dish' => [
            'section_id' => $dish->section_id,
            'title' => $dish->title,
            'description' => $dish->description,
            'image' => $dish->image,
            'price' => $dish->price,
            'availability' => $dish->availability,
        ]]);

        $request->session()->put('lastDish', $dishArray);

        return $request->session()->get('lastDish');
    }

    public function getSessionDishes($id)
    {
        return CartResource::collection(Cart::where('session_id', $id)->get());
    }

    public function getSessionDishesValue($id)
    {
        return CartResource::collection(Cart::where('session_id', $id)->get())->sum('value');
    }

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
    public function show(Session $session)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Session $session)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Session $session)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Session $session)
    {
        // try{
        //     $session = DB::table('dish_session')
        //     ->where('id',$id)
        //     ->get();
        //     if($session){
        //         $session->delete();
        //         return response()->json(['message' => 'Вы вышли из сессии'],200);
        //     }else{
        //         return response()->json([
        //             'message' => 'Данной сессии не существует',
        //         ], 400);
        //     }

        // } catch(Exception $e){
        //     return response()->json(array('message'=>$e->getMessage()));
        // }
    }

    public function add(Request $request)
    {
    //     $validated = $request->validate([
    //         'user_id' => 'required|exists:user,id',
    //     ]);

    //     $user_id = $validated['user_id'];

    //     $session = DB::table('dish_session')->insert([
    //         'user_id' => $user_id,
    //         'title' => $request->title,
    //         'cart_status' => 'choice',
    //         'created_at' => now()
    //     ]);

    //     if($session){
    //         return json_encode($session, JSON_UNESCAPED_UNICODE);
    //     } else return 'С сессией что то не так';
    }
}
