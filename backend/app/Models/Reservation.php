<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reservation extends Model
{
    protected $fillable = [
        'accommodation_id',
        'user_id',
        'total_price',
        'status',
        'check_in',
        'check_out',
        'guests',
        'notes',
    ];

    protected $casts = [
        'check_in'  => 'date',
        'check_out' => 'date',
        'total_price' => 'float',
    ];

    public function accommodation(): BelongsTo
    {
        return $this->belongsTo(Accommodation::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
