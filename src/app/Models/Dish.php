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
           ->select('dish.*', 'section.title as sec_title', 'section.id as sec_id')
           ->where('restaurant_id', '=', $id)
           ->orderBy('sec_id');
    }

    public function section() {
        return $this->belongsTo(Section::class);
    }

    public function dish_session() {
        return $this->hasMany(Cart::class);
    }
}
