<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $table = 'section';

    protected $guarded = [ // зеркальный вариант $fillable (все, кроме id)
        'id'
    ];

    public function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }

    public function dishes() {
        return $this->hasMany(Dish::class);
    }

    public function dish_sessions() {
        return $this->hasMany(Cart::class);
    }
}