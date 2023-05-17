<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Restaurant extends Model
{
    use HasApiTokens, HasFactory;

    protected $table = 'restaurant';

    protected $guarded = [ // зеркальный вариант $fillable (все, кроме id)
        'id'
    ];

    public function sections(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Section::class);
    }
}
