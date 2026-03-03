<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FootballMatch extends Model
{
    use HasFactory;

    protected $fillable = [
        'home_team',
        'away_team',
        'match_date',
        'phase_id',
        'group_id',
        'stadium_id'
    ];

    public function phase()
    {
        return $this->belongsTo(Phase::class);
    }

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function stadium()
    {
        return $this->belongsTo(Stadium::class);
    }
}
