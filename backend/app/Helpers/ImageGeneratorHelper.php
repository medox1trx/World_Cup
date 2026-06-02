<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class ImageGeneratorHelper
{
    /**
     * Automatically generate and store a photorealistic AI image for Hotels, Stadiums, and Cities if needed.
     *
     * @param \Illuminate\Database\Eloquent\Model $model
     * @return void
     */
    public static function generateForEntity($model): void
    {
        $class = get_class($model);
        
        $folder = '';
        $fieldName = 'image_url';
        $prompt = '';
        $name = '';
        $slug = '';

        if ($model instanceof \App\Models\Hotel) {
            $folder = 'hotels';
            $fieldName = 'image';
            $name = $model->name;
            $slug = Str::slug($name ?: 'hotel');
            $style = $model->description ?: 'luxury';
            $city = $model->city ?: 'city';
            
            $prompt = "luxury 5-star hotel lobby room interior {$name} in {$city} photorealistic 8k travel booking quality";
        } elseif ($model instanceof \App\Models\Stadium) {
            $folder = 'stadiums';
            $fieldName = 'image_url';
            $name = $model->name;
            $slug = Str::slug($name ?: 'stadium');
            $cityName = $model->city?->name ?: 'city';
            
            $prompt = "modern football stadium {$name} in {$cityName} architectural sports photography 8k pitch crowd atmosphere";
        } elseif ($model instanceof \App\Models\City || $model instanceof \App\Models\Ville) {
            $folder = 'cities';
            $fieldName = 'image_url';
            $name = $model->name;
            $slug = Str::slug($name ?: 'city');
            $countryName = '';
            if ($model instanceof \App\Models\City) {
                $countryName = $model->country?->name ?: 'country';
            } elseif ($model instanceof \App\Models\Ville) {
                $countryName = $model->pays?->name ?: 'country';
            }
            
            $prompt = "city skyline landmarks of {$name} {$countryName} beautiful street sunset architecture travel tourism photography 8k";
        } else {
            return;
        }

        if (empty($name)) {
            return;
        }

        $currentValue = $model->getAttribute($fieldName);
        $targetFilename = "uploads/{$folder}/ai_{$slug}.jpg";
        $absoluteStoragePath = 'storage/' . $targetFilename;

        // Condition 1: Check if the current value is already pointing to the local generated file
        // AND that file actually exists in storage
        if (!empty($currentValue) && str_contains($currentValue, "ai_{$slug}.jpg")) {
            if (Storage::disk('public')->exists($targetFilename)) {
                // Already generated and fully loaded, nothing to do!
                return;
            }
        }

        // Condition 2: Reuse if the file already exists in local storage
        if (Storage::disk('public')->exists($targetFilename)) {
            $model->setAttribute($fieldName, $absoluteStoragePath);
            if ($model->exists) {
                $model->saveQuietly();
            }
            return;
        }

        // Acquire non-blocking file lock to guarantee exactly one Pollinations API call at a time from this server
        $lockFile = storage_path("app/image_gen.lock");
        $fp = fopen($lockFile, "c+");
        if (!$fp) {
            return;
        }

        if (!flock($fp, LOCK_EX | LOCK_NB)) {
            fclose($fp);
            // Image generation is locked by another thread/process, skip to keep the system responsive
            return;
        }

        // Condition 3: Generate the image using Pollinations AI
        try {
            Log::info("Generating AI Image for {$name} in folder {$folder} using Pollinations AI with browser simulation headers...");
            
            $url = "https://image.pollinations.ai/prompt/" . rawurlencode($prompt) . "?width=1024&height=768&nologo=true&seed=" . rand(1, 100000);
            
            // Fetch the image with a robust 60 seconds timeout and real browser headers
            $response = Http::withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept' => 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
                'Accept-Language' => 'en-US,en;q=0.9',
            ])->timeout(60)->get($url);
            
            if ($response->successful() && !empty($response->body())) {
                Storage::disk('public')->makeDirectory("uploads/{$folder}");
                Storage::disk('public')->put($targetFilename, $response->body());
                
                $model->setAttribute($fieldName, $absoluteStoragePath);
                if ($model->exists) {
                    $model->saveQuietly();
                }
                
                Log::info("Successfully generated and saved AI image for {$name} to {$absoluteStoragePath}");
            } else {
                Log::warning("Failed to generate AI image for {$name}. API status: " . $response->status());
            }
        } catch (\Exception $e) {
            Log::error("Error generating AI image for {$name}: " . $e->getMessage());
        } finally {
            // Always release the file lock
            flock($fp, LOCK_UN);
            fclose($fp);
        }
    }
}
