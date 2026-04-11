<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Accommodation extends Model
{
    use HasFactory;

    protected $fillable = [
        'city_id',
        'name',
        'type',
        'price_per_night',
        'location',
        'rooms',
        'beds',
        'baths',
        'capacity',
        'description',
        'amenities',
        'rating',
        'phone',
        'email',
        'website',
        'image_url',
    ];

    protected $casts = [
        'price_per_night' => 'float',
        'amenities' => 'array',
        'rating' => 'float',
        'rooms' => 'integer',
        'beds' => 'integer',
        'baths' => 'integer',
        'capacity' => 'integer',
    ];

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
