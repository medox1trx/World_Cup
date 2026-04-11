<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\City;
use App\Models\Accommodation;
use Illuminate\Support\Str;

class CitiesSeeder extends Seeder
{
    public function run(): void
    {
        $citiesData = [
            [
                'name' => 'Atlanta',
                'description' => 'A major global city with a rich history and a passion for sports.',
                'stadium' => 'Mercedes-Benz Stadium',
                'match_period' => 'June - July 2026',
                'image_url' => 'https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?w=800&q=80',
                'lat' => 33.7490,
                'lng' => -84.3880,
            ],
            [
                'name' => 'Boston',
                'description' => 'One of the oldest municipalities in the United States, known for its deep sporting roots.',
                'stadium' => 'Gillette Stadium',
                'match_period' => 'June - July 2026',
                'image_url' => 'https://images.unsplash.com/photo-1506501139174-099022df5260?w=800&q=80',
                'lat' => 42.0909,
                'lng' => -71.2643,
            ],
            [
                'name' => 'Dallas',
                'description' => 'A modern metropolis in North Texas, offering a massive, state-of-the-art stadium.',
                'stadium' => 'AT&T Stadium',
                'match_period' => 'June - July 2026',
                'image_url' => 'https://images.unsplash.com/photo-1543851508-30bbd743f54d?w=1200&q=80',
                'lat' => 32.7473,
                'lng' => -97.0945,
            ],
            [
                'name' => 'Houston',
                'description' => 'A large metropolis in Texas, known for its energy industry and diverse culture.',
                'stadium' => 'NRG Stadium',
                'match_period' => 'June - July 2026',
                'image_url' => 'https://images.unsplash.com/photo-1531219432768-9f540ce91ef3?w=1200&q=80',
                'lat' => 29.6847,
                'lng' => -95.4107,
            ],
            [
                'name' => 'Kansas City',
                'description' => 'Straddling the Kansas-Missouri border, known for its barbecue, jazz heritage and fountains.',
                'stadium' => 'GEHA Field at Arrowhead Stadium',
                'match_period' => 'June - July 2026',
                'image_url' => 'https://images.unsplash.com/photo-1506143925201-0252c51780b0?w=1200&q=80',
                'lat' => 39.0489,
                'lng' => -94.4839,
            ],
            [
                'name' => 'Los Angeles',
                'description' => 'The entertainment capital of the world, offering gorgeous weather and an iconic new stadium.',
                'stadium' => 'SoFi Stadium',
                'match_period' => 'June - July 2026',
                'image_url' => 'https://images.unsplash.com/photo-1580655653885-65763b2597ad?w=1200&q=80',
                'lat' => 33.9535,
                'lng' => -118.3390,
            ],
            [
                'name' => 'Miami',
                'description' => 'A major center and leader in finance, commerce, culture, media, and international trade.',
                'stadium' => 'Hard Rock Stadium',
                'match_period' => 'June - July 2026',
                'image_url' => 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=1200&q=80',
                'lat' => 25.9580,
                'lng' => -80.2389,
            ],
            [
                'name' => 'New York / New Jersey',
                'description' => 'The most populous city in the United States, hosting matches at the famous MetLife Stadium.',
                'stadium' => 'MetLife Stadium',
                'match_period' => 'June - July 2026',
                'image_url' => 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=80',
                'lat' => 40.8128,
                'lng' => -74.0745,
            ],
            [
                'name' => 'Philadelphia',
                'description' => 'The birthplace of the United States, filled with rich history and passionate sports fans.',
                'stadium' => 'Lincoln Financial Field',
                'match_period' => 'June - July 2026',
                'image_url' => 'https://images.unsplash.com/photo-1544259509-00977823337e?w=1200&q=80',
                'lat' => 39.9008,
                'lng' => -75.1675,
            ],
            [
                'name' => 'San Francisco Bay Area',
                'description' => 'A diverse, vibrant region known for its iconic bridge and tech industry.',
                'stadium' => 'Levi\'s Stadium',
                'match_period' => 'June - July 2026',
                'image_url' => 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1200&q=80',
                'lat' => 37.4032,
                'lng' => -121.9700,
            ],
            [
                'name' => 'Seattle',
                'description' => 'A seaport city on the West Coast, surrounded by water, mountains and evergreen forests.',
                'stadium' => 'Lumen Field',
                'match_period' => 'June - July 2026',
                'image_url' => 'https://images.unsplash.com/photo-1542223616-740d5dff7f56?w=1200&q=80',
                'lat' => 47.5952,
                'lng' => -122.3316,
            ]
        ];

        foreach ($citiesData as $data) {
            $city = City::updateOrCreate(
                ['slug' => Str::slug($data['name'])],
                $data
            );

            // Generate 10 accommodations for each city (total ~110)
            \App\Models\Accommodation::factory()
                ->count(10)
                ->create([
                    'city_id' => $city->id,
                ]);
        }
    }
}
