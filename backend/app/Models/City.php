<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class City extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'country_id',
        'description',
        'stadium',
        'match_period',
        'image_url',
        'lat',
        'lng',
    ];

    public function country(): BelongsTo
    {
        return $this->belongsTo(Pays::class, 'country_id');
    }

    public function accommodations(): HasMany
    {
        return $this->hasMany(Accommodation::class);
    }
}
