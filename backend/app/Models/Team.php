<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'name', 'country_id', 'confederation_id', 'hero_image', 'group_id', 'coach', 'captain', 
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

    public function country()
    {
        return $this->belongsTo(Pays::class, 'country_id');
    }

    public function confederation()
    {
        return $this->belongsTo(Confederation::class);
    }

    public function selectionneur()
    {
        return $this->hasOne(Selectionneur::class);
    }

    // Accessors for compatibility
    public function getFlagAttribute()
    {
        return $this->country ? $this->country->flag_url : null;
    }

    public function getCodeAttribute()
    {
        return $this->country ? $this->country->code : null;
    }
}
