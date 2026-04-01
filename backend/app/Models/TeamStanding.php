<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamStanding extends Model
{
    protected $fillable = [
        'group_name', 'position', 'team_name', 'team_code',
        'played', 'won', 'drawn', 'lost',
        'goals_for', 'goals_against', 'goal_difference', 'points'
    ];
}
