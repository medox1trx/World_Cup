<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FanZone extends Model
{
    use HasFactory;

    protected $table = 'fan_zones';

    protected $fillable = [
        'city_id',
        'stadium_name',
        'capacity',
        'matches_count',
        'address',
        'zone_label',
        'description',
        'image_url',
        'group_label',
        'status',
    ];

    public function city()
    {
        return $this->belongsTo(Ville::class, 'city_id');
    }

    public function pays()
    {
        return $this->hasOneThrough(Pays::class, Ville::class, 'id', 'id', 'city_id', 'country_id');
    }
}