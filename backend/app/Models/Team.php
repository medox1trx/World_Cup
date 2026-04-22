<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'name', 'code', 'flag', 'group_name', 'coach', 'captain', 
        'world_ranking', 'world_cup_titles', 'description', 
        'description', 'key_player', 'image_url'
    ];

    public function joueurs()
    {
        return $this->hasMany(Joueur::class);
    }
}
