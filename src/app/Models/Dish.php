<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Dish extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'dishs';

	protected $fillable = [
		'title',
		'description',
        'image',
        'price',
        'availability',
	];


    public function section() {
        return $this->belongsTo(Section::class,'id');
    }
}