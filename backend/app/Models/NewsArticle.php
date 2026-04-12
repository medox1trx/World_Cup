<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsArticle extends Model
{
    use HasFactory;

    protected $fillable = [
        'tag',
        'title',
        'description',
        'image_url',
        'url',
        'source_name',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];
}
