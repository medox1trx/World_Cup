<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ville extends Model
{
    use HasFactory;

    protected $table = 'villes';

    protected $fillable = [
        'nom',
        'pays_id',
    ];

    public function pays()
    {
        return $this->belongsTo(Pays::class, 'pays_id');
    }

    public function fanZones()
    {
        return $this->hasMany(FanZone::class, 'ville_id');
    }
}
