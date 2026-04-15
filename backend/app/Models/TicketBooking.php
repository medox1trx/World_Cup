<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketBooking extends Model
{
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}
