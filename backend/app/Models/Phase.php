<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phase extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    // Relation avec les matches
    public function matches()
    {
        return $this->hasMany(FootballMatch::class);
    }
}
