<?php

namespace App\Http\Resources;

use App\Models\Restaurant;
use App\Models\Session;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray($request)
    {
        $rest = new RestaurantResource(Restaurant::findOrFail($this->restaurant_id));
        $restTitle = $rest->title;

        $session = new SessionResource(Session::findOrFail($this->session_id));
        $user = new UserResource(User::findOrFail($session->user_id));
        $userPhone = $user->phone;

        return [
            'id' => $this->id,
            'session_id' => $this->session_id,
            'restaurant_id' => $this->restaurant_id,
            'total' => $this->total,
            'status' => $this->status,
            'restaurant' => $restTitle,
            'userPhone' => $userPhone,
            'dishes' => DishOrderResource::collection($this->dish_orders),
        ];
    }
}