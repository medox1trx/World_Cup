<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// ⚠️ Cannot use "Match" — reserved keyword in PHP 8
class FootballMatch extends Model
{
    protected $table = 'matches';

    protected $fillable = [
        'home_team', 'away_team',
        'home_flag', 'away_flag',
        'venue', 'city',
        'match_date', 'match_time',
        'stage', 'group_name',
        'home_score', 'away_score',
        'status',
    ];

    protected $casts = [
        'match_date' => 'date',
    ];
}