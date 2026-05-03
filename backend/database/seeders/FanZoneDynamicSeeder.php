<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\FanZone;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class FanZoneDynamicSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        FanZone::truncate();
        Schema::enableForeignKeyConstraints();

        $fanZones = [
            [
                'ville' => 'New York/New Jersey',
                'name' => 'FIFA Fan Festival New York/New Jersey',
                'image_url' => 'https://images.unsplash.com/photo-1459749411177-042180ceea72?q=80&w=1200',
            ],
            [
                'ville' => 'Mexico City',
                'name' => 'FIFA Fan Festival Mexico City',
                'image_url' => 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200',
            ],
        ];

        foreach ($fanZones as $fz) {
            $city = City::where('name', $fz['ville'])->first();
            
            FanZone::create([
                'city_id' => $city ? $city->id : 1,
                'stadium_name' => 'Official Site',
                'capacity' => 'Various',
                'matches_count' => 64,
                'address' => 'Official Celebration Site',
                'zone_label' => $fz['name'],
                'description' => 'Experience the beautiful game with thousands of fans.',
                'image_url' => $fz['image_url'],
                'group_label' => 'Official',
                'status' => 'active',
            ]);
        }
    }
}
