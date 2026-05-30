<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    protected $fillable = ['name', 'description', 'address', 'city', 'country', 'image', 'website_url'];

    // AI image generation is handled by generate_images.php and ImageGeneratorHelper
    // The booted hook is intentionally kept lightweight; images are generated on-demand
    // via the standalone ingest script to prevent concurrent API flooding.
}
