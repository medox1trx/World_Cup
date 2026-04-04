<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'nom',
        'pays',
        'logo',
        'groupe'
    ];
    public function standing()
    {
        return $this->hasOne(TeamStanding::class);
    }
}
