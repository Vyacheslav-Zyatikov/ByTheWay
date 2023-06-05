<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'order';

    protected $guarded = [ // зеркальный вариант $fillable (все, кроме id)
        'id'
    ];

    public function sessions() {
        return $this->hasMany(Session::class);
    }

    public function dishes() {
        return $this->belongsToMany(Dish::class);
    }

    public function dish_orders() {
        return $this->hasMany(DishOrder::class);
    }
}
