<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Joueur extends Model
{
    protected $fillable = ['name', 'number', 'position', 'goals', 'photo', 'team_id', 'country_id', 'age', 'club', 'bio'];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
