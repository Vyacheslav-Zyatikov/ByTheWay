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
            ->orderBy('sec_title');
    }

    public function section() {
        return $this->belongsTo(Section::class);
    }

    public function orders() {
        return $this->belongsToMany(Order::class);
    }

    public function sessions() {
        return $this->belongsToMany(Session::class);
    }

    public function dish_orders() {
        return $this->hasMany(DishOrder::class);
    }

    public function dish_sessions() {
        return $this->hasMany(DishSession::class);
    }
}
