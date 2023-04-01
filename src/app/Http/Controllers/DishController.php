<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DishController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dishs = DB::table('dish')
        ->join('section','section.id', "=", 'dish.section_id')
        ->select(
            'dish.title',
            'dish.description',
            'dish.image',
            'dish.price',
            'dish.availability',
            'section.title as name_section',         
        )
        ->get();

        return json_encode($dishs, JSON_UNESCAPED_UNICODE);
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
        $dish = Dish::create($request->all());
        return response()->json($dish, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Dish $dish)
    {        
        $section = $dish->section()->value('title');
        $dish->title_section = $section;
        $dish = json_encode($dish, JSON_UNESCAPED_UNICODE);

        return $dish;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dish $dish)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dish $dish)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dish $dish)
    {
        //
    }
}