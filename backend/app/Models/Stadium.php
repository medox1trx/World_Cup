<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stadium extends Model
{
    use HasFactory;

    protected $table = 'stadiums';

    protected $fillable = [
        'name',
        'city_id',
        'capacity',
        'image_url',
        'description',
        'opened_year',
        'surface',
    ];

    public function city()
    {
        return $this->belongsTo(Ville::class, 'city_id');
    }

    public function matches()
    {
        return $this->hasMany(FootballMatch::class, 'stadium_id');
    }
}
