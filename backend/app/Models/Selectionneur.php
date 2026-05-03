<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Selectionneur extends Model
{
    protected $fillable = ['name', 'photo', 'team_id'];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
