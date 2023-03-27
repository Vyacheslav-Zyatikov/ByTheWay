<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Section extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'section';

	protected $fillable = [
        'resturant_id',
		'title',
	];
    public function restaurant() {
        return $this->belongsTo(Restaurant::class,'id');
    }
    public function dish() {
        return $this->hasMany(Dish::class,'section_id');
    }
}