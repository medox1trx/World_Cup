<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Referee extends Model
{
    protected $fillable = [
        'name',
        'first_name',
        'last_name',
        'nationality',
        'nationality_code',
        'role',
        'age',
        'experience_years',
        'matches_officiated',
        'photo_url',
        'fifa_badge',
        'notes',
    ];
}
