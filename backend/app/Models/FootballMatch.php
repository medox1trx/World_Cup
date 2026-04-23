<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// ⚠️ Cannot use "Match" — reserved keyword in PHP 8
class FootballMatch extends Model
{
    protected $table = 'matches';

    protected $fillable = [
        'home_team', 'away_team',
        'home_team_id', 'away_team_id',
        'home_flag', 'away_flag',
        'venue', 'city',
        'match_date', 'match_time',
        'stage', 'group_name',
        'home_score', 'away_score',
        'status',
        'stadium_image', 'video_url', 'referee', 'assistant_referees',
        'weather_condition', 'weather_temp',
    ];

    protected $casts = [
        'match_date' => 'date',
    ];

    public function homeTeam()
    {
        return $this->belongsTo(Team::class, 'home_team_id');
    }

    public function awayTeam()
    {
        return $this->belongsTo(Team::class, 'away_team_id');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'match_id');
    }
}