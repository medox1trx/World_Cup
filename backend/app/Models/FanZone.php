<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FanZone extends Model
{
    use HasFactory;

    protected $table = 'fan_zones';

    protected $fillable = [
        'ville_id',
        'stade',
        'capacite',
        'nb_matchs',
        'adresse',
        'zone_label',
        'description',
        'image_url',
        'groupe',
        'statut',
    ];

    public function ville()
    {
        return $this->belongsTo(Ville::class, 'ville_id');
    }

    public function pays()
    {
        return $this->hasOneThrough(Pays::class, Ville::class, 'id', 'id', 'ville_id', 'pays_id');
    }
}