<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Joueur extends Model
{
    protected $fillable = ['nom', 'numero', 'poste', 'buts', 'photo', 'team_id'];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
