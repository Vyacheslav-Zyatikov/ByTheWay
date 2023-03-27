<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $restaurants = DB::table('sections')
        ->join('restaurants', 'restaurants.id', '=', 'sections.restaurant_id')
        ->join('dishs', 'dishs.sections_id', '=', 'sections.id')
        ->select(
            'sections.title',
            'restaurants.title as name_restaurant',
            'dishs.title',
            'dishs.description',
            'dishs.image',
            'dishs.price',
            'dishs.availability'
        )
        ->get();

        return json_encode($restaurants, JSON_UNESCAPED_UNICODE);
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
        $restaurant = Restaurant::create($request->all());
        return response()->json($restaurant, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Section $section)
    {
        $id = $section->id;
        $section = DB::table('sections')
            ->join('restaurants', 'restaurants.id', '=', 'sections.restaurant_id')
            ->join('dishs', 'dishs.sections_id', '=', 'sections.id')
            ->where('sections.id', $id)
            ->select(
                'sections.title',
                'restaurants.title as name_restaurant',
                'dishs.title',
                'dishs.description',
                'dishs.image',
                'dishs.price',
                'dishs.availability'
            )
            ->first();

        return json_encode($section, JSON_UNESCAPED_UNICODE);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Section $section)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Section $section)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Section $section)
    {
        //
    }
}