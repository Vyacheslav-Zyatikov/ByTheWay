<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dish extends Model
{
    use HasFactory;

    protected $table = 'dish';

    protected $guarded = [ // зеркальный вариант $fillable (все, кроме id)
        'id'
    ];

    public static function scopeRestaurantDish($query, $id)
    {
       return $query
           ->join('section', 'section_id', '=', 'section.id')
           ->select('dish.id', 'dish.section_id', 'dish.title', 'dish.description', 'dish.image', 'dish.price')
           ->where('restaurant_id', '=', $id);
           //->selectRaw('SELECT id FROM section WHERE section.restaurant_id = $id')
           //->dd();
            //->where('restaurant_id', '=', $id);
       /*
        return $query
            ->join('section', 'section_id', '=', 'section.id')
            ->where('restaurant_id', '=', $id)->dd();
       */
    }

    public function section() {
        return $this->belongsTo(Section::class);
    }

    public function dish_session() {
        return $this->hasMany(Cart::class);
    }
}
