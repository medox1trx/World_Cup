<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    // Relation avec les équipes
    public function teams()
    {
        return $this->hasMany(Team::class);
    }

    // Relation avec les matches
    public function matches()
    {
        return $this->hasMany(FootballMatch::class);
    }
}
