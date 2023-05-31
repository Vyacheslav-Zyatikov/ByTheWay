<?php

namespace App\Http\Controllers;

use App\Http\Resources\RestaurantResource;
use App\Http\Resources\SectionResource;
use App\Models\Dish;
use App\Models\Restaurant;
use App\Models\Section;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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
        $dishesRaw = Dish::restaurantDish($restaurant->id)->get();
        $dishes = $dishesRaw->groupBy('sec_title')->toArray();
        //dd($dishes);

        return Inertia::render('RestaurantPage', [
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

    public function login(Request $request): \Illuminate\Http\JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // $restaurant = Restaurant::where('email', $request->email)->get();

        // if ($restaurant && Hash::check($request->password, $restaurant->password)) {
        //     $request->session()->regenerate();

        //     return response()->json($restaurant, 200);
        // }

        if (Auth::guard('restaurant')->attempt($credentials)) {
            /** @var \App\Models\Restaurant $restaurant **/
            $restaurant = Auth::guard('restaurant')->user();
            $token =  $restaurant->createToken('ByTheWay', ['restaurant'])->plainTextToken;
            return response()->json(['restaurant' => $restaurant, 'token' => $token]);
        }

        // if (Auth::attempt($credentials)) {
        //     $request->session()->regenerate();
        //     return redirect()->intended('dashboard');
        // }

        // return back()->withErrors([
        //     'email' => 'The provided credentials do not match our records.',
        // ])->onlyInput('email');

        // return response()->json(true, 200);
        return response()->json([
            'errors' => [
                'status' => 401,
                'message' => 'Пользователь не авторизован',
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'title' => 'required',
            'image' => 'required|image',
            'description' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $pass = Hash::make($request->password);
        $imageName = Str::random() . '.' . $request->image->getClientOriginalExtension();
        Storage::putFileAs('public/images', $request->image, $imageName);

        $restaurant = Restaurant::make($request->post() + [
            'image' => $imageName,
            'rate' => 9.5,
            'password' => $pass,
        ]);
        $restaurant->password = $pass;
        $restaurant->save();

        // event(new Registered($restaurant));
         // Auth::guard('restaurant')->login($restaurant);
        $credentials = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        if (Auth::guard('restaurant')->attempt($credentials)) {
            /** @var \App\Models\Restaurant $restaurant **/
            $restaurant = Auth::guard('restaurant')->user();
            $token =  $restaurant->createToken('ByTheWay', ['restaurant'])->plainTextToken;
            return response()->json(['restaurant' => $restaurant, 'token' => $token]);
        }

        return response()->json([
            'errors' => [
                'status' => 401,
                'message' => 'Пользователь не зарегистрирован',
            ],
        ]);

        // return response()->json($restaurant, 201);
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

