<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// ⚠️ Cannot use "Match" — reserved keyword in PHP 8
class FootballMatch extends Model
{
    protected $table = 'matches';

    protected $fillable = [
        'team1_id', 'team2_id',
        'stadium_id', 'city_id',
        'referee_id', 'weather_id',
        'video_url',
        'match_date', 'match_time',
        'stage', 'group_name',
        'home_score', 'away_score',
        'status',
    ];

    protected $casts = [
        'match_date' => 'date',
    ];

    public function team1()
    {
        return $this->belongsTo(Team::class, 'team1_id');
    }

    public function team2()
    {
        return $this->belongsTo(Team::class, 'team2_id');
    }

    public function stadium()
    {
        return $this->belongsTo(Stadium::class);
    }

    public function city()
    {
        return $this->belongsTo(Ville::class, 'city_id');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'match_id');
    }
}