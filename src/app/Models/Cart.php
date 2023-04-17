<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $table = 'dish_session';

    protected $guarded = [ // зеркальный вариант $fillable (все, кроме id)
        'id'
    ];

    public function session() {
        return $this->belongsTo(Session::class);
    }

    public function dish() {
        return $this->belongsTo(Dish::class);
    }
}
