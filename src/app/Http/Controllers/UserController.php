<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Session;
use App\Http\Resources\UserResource;
use App\Http\Resources\SessionResource;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
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
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    public function updatePhone(Request $request)
    {
        $request->validate([
            'phone'=>'required',
        ]);

        try {
            $session = Session::findOrFail((int)$request->session_id);
            $user = User::findOrFail($session->user_id);
            $user->phone = $request->phone;
            $user->save();
            return response()->json(['message' => 'Телефон клиента сохранен'], 200);
        } catch (Exception $e) {
            return response()->json(array('message'=>$e->getMessage()));
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}