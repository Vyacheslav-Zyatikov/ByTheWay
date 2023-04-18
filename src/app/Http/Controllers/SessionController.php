<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SessionController extends Controller
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
        try{
            $session = DB::table('dish_session')
            ->where('id',$id)
            ->get();
            if($session){
                $session->delete();
                return response()->json(['message' => 'Вы вышли из сессии'],200);
            }else{
                return response()->json([
                    'message' => 'Данной сессии не существует',
                ], 400);
            }

        } catch(Exception $e){
            return response()->json(array('message'=>$e->getMessage()));
        }
    }

    public function add(Request $request){

        $validated = $request->validate([
            'user_id' => 'required|exists:user,id',
        ]);

        $user_id = $validated['user_id'];

        $session = DB::table('dish_session')->insert([
            'user_id' => $user_id,
            'title' => $request->title,
            'cart_status' => 'choice',
            'created_at' => now()
        ]);

        if($session){
            return json_encode($session, JSON_UNESCAPED_UNICODE);
        } else return 'С сессией что то не так';
    }
}
