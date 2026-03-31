<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = ['name', 'code', 'group_name', 'rank', 'key_player', 'image_url'];
}
