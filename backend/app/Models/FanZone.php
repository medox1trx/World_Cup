<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FanZone extends Model
{
    protected $fillable = [
        'city_name',
        'country',
        'country_code',
        'stadium_name',
        'capacity',
        'matches_count',
        'zone_name',
        'description',
        'image_url',
        'opening_hours',
        'is_centenary',
        'group_label',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_centenary' => 'boolean',
        'is_active' => 'boolean',
    ];
}