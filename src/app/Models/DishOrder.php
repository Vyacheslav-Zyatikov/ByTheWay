<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DishOrder extends Model
{
    use HasFactory;

    protected $table = 'dish_order';

    protected $guarded = [ // зеркальный вариант $fillable (все, кроме id)
        'id'
    ];

    public function order() {
        return $this->belongsTo(Order::class);
    }

    public function dish() {
        return $this->belongsTo(Dish::class);
    }
}
