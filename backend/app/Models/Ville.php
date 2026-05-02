<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ville extends Model
{
    use HasFactory;

    protected $table = 'cities';

    protected $fillable = [
        'name',
        'country_id',
        'slug',
        'description',
        'stadium',
        'match_period',
        'image_url',
    ];

    public function pays()
    {
        return $this->belongsTo(Pays::class, 'country_id');
    }

    public function fanZones()
    {
        return $this->hasMany(FanZone::class, 'ville_id');
    }
}
