<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = ['accommodation_id', 'guest_name', 'guest_email', 'arrival_date', 'guests_count'];

    public function accommodation()
    {
        return $this->belongsTo(Accommodation::class);
    }
}
