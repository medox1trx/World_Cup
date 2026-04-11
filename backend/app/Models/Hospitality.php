<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hospitality extends Model
{
    protected $fillable = [
        'tier',
        'price',
        'badge',
        'is_featured',
        'description',
        'perks',
        'cta_text',
        'image_url',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'perks' => 'array',
    ];
}