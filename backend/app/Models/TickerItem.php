<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TickerItem extends Model
{
    protected $fillable = [
        'text',
        'label',
        'label_color',
        'url',
        'active',
        'sort_order',
    ];

    protected $casts = [
        'active' => 'boolean',
        'sort_order' => 'integer',
    ];
}
