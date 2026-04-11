<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class City extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'description',
        'stadium',
        'match_period',
        'image_url',
        'lat',
        'lng',
    ];

    public function accommodations(): HasMany
    {
        return $this->hasMany(Accommodation::class);
    }
}
