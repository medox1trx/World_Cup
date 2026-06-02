<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\FanZone;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FanZoneDynamicSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        FanZone::truncate();
        Schema::enableForeignKeyConstraints();

        // 10 Real Fan Zones with high quality custom generated images & premium curated Unsplash backups
        $fanZonesData = [
            [
                'city_name' => 'New York/New Jersey',
                'zone_label' => 'FIFA Fan Festival NY/NJ',
                'description' => 'Experience the World Cup final fever in the heart of Liberty State Park with beautiful Manhattan skyline views, giant screens, live music, and diverse food options.',
                'image_source' => 'uploads/fan_zones/fz_new_york.png',
                'is_local' => true,
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=Liberty+State+Park+NJ',
                'capacity' => '45,000',
            ],
            [
                'city_name' => 'Los Angeles',
                'zone_label' => 'FIFA Fan Festival Los Angeles',
                'description' => 'Soak up the California sun at the Santa Monica Pier. Enjoy daily football action, interactive fan games, beach soccer tournaments, and celebrity appearances.',
                'image_source' => 'uploads/fan_zones/fz_los_angeles.png',
                'is_local' => true,
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=Santa+Monica+Pier+LA',
                'capacity' => '35,000',
            ],
            [
                'city_name' => 'Miami',
                'zone_label' => 'FIFA Fan Festival Miami',
                'description' => 'Feel the vibrant tropical beat at Lummus Park, South Beach. Massive screens on the sand, global DJs, local culinary delights, and unforgettable beachfront celebrations.',
                'image_source' => 'uploads/fan_zones/fz_miami.png',
                'is_local' => true,
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=Lummus+Park+South+Beach',
                'capacity' => '40,000',
            ],
            [
                'city_name' => 'Mexico City',
                'zone_label' => 'FIFA Fan Festival Mexico City',
                'description' => 'The historic Zócalo square plays host to a massive sea of passionate fans. Experience intense stadium atmosphere, traditional street food, and iconic cultural performances.',
                'image_source' => 'uploads/fan_zones/fz_mexico_city.png',
                'is_local' => true,
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=Zocalo+Mexico+City',
                'capacity' => '80,000',
            ],
            [
                'city_name' => 'Toronto',
                'zone_label' => 'FIFA Fan Festival Toronto',
                'description' => 'Gather at Nathan Phillips Square for the ultimate multicultural football party. Surrounded by stunning skyscrapers, live match broadcasts, and family-friendly activations.',
                'image_source' => 'uploads/fan_zones/fz_toronto.png',
                'is_local' => true,
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=Nathan+Phillips+Square+Toronto',
                'capacity' => '25,000',
            ],
            [
                'city_name' => 'Vancouver',
                'zone_label' => 'FIFA Fan Festival Vancouver',
                'description' => 'Located at Concord Pacific Place between the beautiful snowcapped mountains and the ocean, Vancouver\'s Fan Zone offers pure scenery and amazing Canadian soccer spirit.',
                'image_source' => 'uploads/fan_zones/fz_vancouver.png',
                'is_local' => true,
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=Concord+Pacific+Place+Vancouver',
                'capacity' => '30,000',
            ],
            [
                'city_name' => 'Dallas',
                'zone_label' => 'FIFA Fan Festival Dallas',
                'description' => 'Fair Park transforms into a legendary, high-energy Texas-sized celebration. Massive high-definition screens, live country music concerts, and premium local barbecue.',
                'image_source' => 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800',
                'is_local' => false,
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=Fair+Park+Dallas',
                'capacity' => '50,000',
            ],
            [
                'city_name' => 'Atlanta',
                'zone_label' => 'FIFA Fan Festival Atlanta',
                'description' => 'Centered at Centennial Olympic Park in downtown Atlanta. A hub of high-tech fan entertainment, historic monuments, local hip-hop acts, and delicious Southern hospitality.',
                'image_source' => 'https://images.unsplash.com/photo-1489945052260-4f21c52268b9?q=80&w=800',
                'is_local' => false,
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=Centennial+Olympic+Park+Atlanta',
                'capacity' => '30,000',
            ],
            [
                'city_name' => 'San Francisco',
                'zone_label' => 'FIFA Fan Festival SF',
                'description' => 'Watch live broadcasts on Marina Green with the legendary Golden Gate Bridge in the background. Complete with food trucks, microbreweries, and youth soccer clinics.',
                'image_source' => 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800',
                'is_local' => false,
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=Marina+Green+San+Francisco',
                'capacity' => '20,000',
            ],
            [
                'city_name' => 'Boston',
                'zone_label' => 'FIFA Fan Festival Boston',
                'description' => 'Celebrate the legacy at the historic Boston Common. Combining New England\'s rich history, top-tier food stalls, and a brilliant colonial-inspired fan village.',
                'image_source' => 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=800',
                'is_local' => false,
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=Boston+Common+Boston',
                'capacity' => '25,000',
            ],
        ];

        // Ensure target folders exist
        Storage::disk('public')->makeDirectory('uploads/fan_zones');

        $ctx = stream_context_create([
            'http' => [
                'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\r\n"
            ]
        ]);

        $this->command->info('Configuring premium generated images & downloading remaining ones...');

        foreach ($fanZonesData as $fz) {
            $city = City::where('name', $fz['city_name'])->first();
            $dbPath = $fz['image_source'];

            // For the non-local ones, download them to public storage
            if (!$fz['is_local']) {
                $slug = Str::slug($fz['zone_label']);
                $filename = "uploads/fan_zones/seeder_{$slug}.jpg";
                
                try {
                    $this->command->info("Downloading backup image for: {$fz['zone_label']}");
                    $imgData = @file_get_contents($fz['image_source'], false, $ctx);
                    if ($imgData !== false) {
                        Storage::disk('public')->put($filename, $imgData);
                        $dbPath = $filename;
                    }
                } catch (\Exception $e) {
                    $this->command->warn("Using URL fallback for: {$fz['zone_label']}");
                }
            }

            FanZone::create([
                'city_id' => $city ? $city->id : 1,
                'stadium_name' => 'Official Site',
                'capacity' => $fz['capacity'],
                'matches_count' => 64,
                'address' => 'Official Celebration Site',
                'zone_label' => $fz['zone_label'],
                'description' => $fz['description'],
                'image_url' => $dbPath,
                'location_url' => $fz['location_url'],
                'group_label' => 'Official',
                'status' => 'active',
            ]);
        }

        $this->command->info('FanZoneDynamicSeeder successfully configured with custom generated high-quality images!');
    }
}
