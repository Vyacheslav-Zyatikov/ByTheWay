<?php

namespace App\Http\Resources;

use App\Models\Restaurant;
use App\Models\Section;
use Illuminate\Http\Resources\Json\JsonResource;

class DishResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $section = new SectionResource(Section::findOrFail($this->section_id));

        return [
            'id' => $this->id,
            'section_id' => $this->section_id,
            'title' => $this->title,
            'description' => $this->description,
            'image' => $this->image,
            'price' => $this->price,
            'availability' => $this->availability,
            'restaurant' => new RestaurantResource(Restaurant::findOrFail($section->restaurant_id)),
        ];
    }
}