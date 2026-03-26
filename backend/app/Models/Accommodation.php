<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Accommodation extends Model
{
    protected $fillable = ['city_id', 'name', 'type', 'price', 'rating', 'image_url', 'description'];

    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
