<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'name', 'code', 'flag', 'hero_image', 'confederation', 'group_id', 'coach', 'captain', 
        'world_ranking', 'world_cup_titles', 'description', 
        'key_player', 'image_url'
    ];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function joueurs()
    {
        return $this->hasMany(Joueur::class);
    }
}
