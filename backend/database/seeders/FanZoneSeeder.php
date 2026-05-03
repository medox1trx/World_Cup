<?php

namespace Database\Seeders;

use App\Models\FanZone;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FanZoneSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        FanZone::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        
        $fanZones = [
            // USA
            [
                'city_name' => 'New York / New Jersey',
                'country' => 'USA',
                'country_code' => 'us',
                'stadium_name' => 'New York New Jersey Stadium',
                'capacity' => '82 500',
                'matches_count' => 8,
                'zone_name' => 'Central Park Great Lawn',
                'description' => 'The iconic Central Park transforms into a massive global viewing party. Join fans from around the world in the city that never sleeps to celebrate the beautiful game and the 2026 Final.',
                'image_url' => 'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=900&q=80&fit=crop', // NYC Central Park
                'opening_hours' => '10h – 00h',
                'is_centenary' => false,
                'group_label' => 'USA',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'city_name' => 'Los Angeles',
                'country' => 'USA',
                'country_code' => 'us',
                'stadium_name' => 'Los Angeles Stadium',
                'capacity' => '70 240',
                'matches_count' => 8,
                'zone_name' => 'Santa Monica Pier',
                'description' => 'Enjoy the World Cup with an ocean breeze. The LA Fan Festival brings together entertainment, Hollywood glamour, and world-class football on the Pacific coast.',
                'image_url' => 'https://images.unsplash.com/photo-1580659328701-a4fa7848dc67?w=900&q=80&fit=crop', // Santa Monica
                'opening_hours' => '10h – 00h',
                'is_centenary' => false,
                'group_label' => 'USA',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'city_name' => 'Miami',
                'country' => 'USA',
                'country_code' => 'us',
                'stadium_name' => 'Miami Stadium',
                'capacity' => '64 767',
                'matches_count' => 7,
                'zone_name' => 'South Beach / Lummus Park',
                'description' => 'Feel the rhythm of Miami at the Fan Festival. A perfect blend of tropical vibes, diverse cultures, and electrifying football action right by the beach.',
                'image_url' => 'https://images.unsplash.com/photo-1533222481259-ce20eda1e20b?w=900&q=80&fit=crop', // Miami Beach
                'opening_hours' => '10h – 00h',
                'is_centenary' => false,
                'group_label' => 'USA',
                'sort_order' => 3,
                'is_active' => true,
            ],
            // Mexico
            [
                'city_name' => 'Mexico City',
                'country' => 'Mexique',
                'country_code' => 'mx',
                'stadium_name' => 'Estadio Azteca',
                'capacity' => '83 264',
                'matches_count' => 5,
                'zone_name' => 'Zócalo',
                'description' => 'The historic heart of Mexico City hosts the ultimate Fan Festival. Experience the vibrant Mexican culture and passion for football where the opening match vibes will echo.',
                'image_url' => 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=900&q=80&fit=crop', // Mexico City
                'opening_hours' => '10h – 00h',
                'is_centenary' => false,
                'group_label' => 'Mexique',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'city_name' => 'Guadalajara',
                'country' => 'Mexique',
                'country_code' => 'mx',
                'stadium_name' => 'Estadio Guadalajara',
                'capacity' => '49 850',
                'matches_count' => 4,
                'zone_name' => 'Plaza de la Liberación',
                'description' => 'Celebrate in the cultural heart of Mexico. Mariachi music, incredible food, and intense football passion await at the Guadalajara Fan Festival.',
                'image_url' => 'https://images.unsplash.com/photo-1583095123995-1f92e5c8e31f?w=900&q=80&fit=crop', // Guadalajara
                'opening_hours' => '10h – 00h',
                'is_centenary' => false,
                'group_label' => 'Mexique',
                'sort_order' => 5,
                'is_active' => true,
            ],
            // Canada
            [
                'city_name' => 'Toronto',
                'country' => 'Canada',
                'country_code' => 'ca',
                'stadium_name' => 'Toronto Stadium',
                'capacity' => '45 000',
                'matches_count' => 6,
                'zone_name' => 'Nathan Phillips Square',
                'description' => 'Downtown Toronto becomes the epicenter of Canadian football fever. Watch matches live on giant screens surrounded by the city\'s spectacular skyline.',
                'image_url' => 'https://images.unsplash.com/photo-1507992781348-310259076fe0?w=900&q=80&fit=crop', // Toronto
                'opening_hours' => '10h – 00h',
                'is_centenary' => false,
                'group_label' => 'Canada',
                'sort_order' => 6,
                'is_active' => true,
            ],
            [
                'city_name' => 'Vancouver',
                'country' => 'Canada',
                'country_code' => 'ca',
                'stadium_name' => 'BC Place Vancouver',
                'capacity' => '54 500',
                'matches_count' => 7,
                'zone_name' => 'Concord Pacific Place',
                'description' => 'Nestled between the mountains and the ocean, Vancouver\'s Fan Zone offers breathtaking scenery and a passionate, diverse atmosphere for all football fans.',
                'image_url' => 'https://images.unsplash.com/photo-1559511260-66a654ae982a?w=900&q=80&fit=crop', // Vancouver
                'opening_hours' => '10h – 00h',
                'is_centenary' => false,
                'group_label' => 'Canada',
                'sort_order' => 7,
                'is_active' => true,
            ],
        ];

        foreach ($fanZones as $fanZone) {
            FanZone::create($fanZone);
        }
    }
}