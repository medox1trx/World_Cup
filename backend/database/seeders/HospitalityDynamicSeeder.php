<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Hospitality;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class HospitalityDynamicSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Hospitality::truncate();
        Schema::enableForeignKeyConstraints();

        $items = [
            [
                'ville' => 'New York/New Jersey',
                'tier' => 'Platinum Match Club',
                'image_url' => 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200',
            ],
            [
                'ville' => 'Los Angeles',
                'tier' => 'Gold Suite Experience',
                'image_url' => 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1200',
            ],
        ];

        foreach ($items as $item) {
            $city = City::where('name', $item['ville'])->first();
            
            Hospitality::create([
                'city_id'     => $city ? $city->id : 1,
                'tier'        => $item['tier'],
                'price'       => 1500,
                'description' => 'A world-class hospitality experience.',
                'image_url'   => $item['image_url'],
                'cta_text'    => 'Book Now',
                'is_active'   => true,
                'sort_order'  => 0,
            ]);
        }
    }
}
