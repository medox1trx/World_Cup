<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CityFactory extends Factory
{
    public function definition(): array
    {
        $name = $this->faker->city;
        return [
            'slug' => Str::slug($name),
            'name' => $name,
            'description' => $this->faker->paragraph,
            'stadium' => $this->faker->company . ' Stadium',
            'match_period' => 'June - July 2026',
            'image_url' => 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80',
            'lat' => $this->faker->latitude,
            'lng' => $this->faker->longitude,
        ];
    }
}
