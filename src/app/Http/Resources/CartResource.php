<?php

namespace App\Http\Resources;

use App\Models\Dish;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'session_id' => $this->session_id,
            'dish_id' => $this->dish_id,
            'price' => $this->price,
            'count' => $this->count,
            'value' => $this->value,
            'dish' => new DishResource(Dish::findOrFail($this->dish_id)),
        ];
    }
}