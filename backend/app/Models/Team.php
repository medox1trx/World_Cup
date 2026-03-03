<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'group_id'];

    // Relation avec le groupe
    public function group()
    {
        return $this->belongsTo(Group::class);
    }
}
