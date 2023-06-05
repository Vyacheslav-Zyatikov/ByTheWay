<?php

namespace App\Http\Resources;

use App\Models\Dish;
use Illuminate\Http\Resources\Json\JsonResource;

class DishOrderResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'order_id' => $this->order_id,
            'dish_id' => $this->dish_id,
            'price' => $this->price,
            'count' => $this->count,
            'value' => $this->value,
            'dish' => new DishResource(Dish::findOrFail($this->dish_id)),
        ];
    }
}