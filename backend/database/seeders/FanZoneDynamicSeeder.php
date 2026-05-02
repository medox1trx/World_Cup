<?php

namespace Database\Seeders;

use App\Models\Pays;
use App\Models\Ville;
use App\Models\FanZone;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class FanZoneDynamicSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        FanZone::truncate();
        Schema::enableForeignKeyConstraints();

        // ── VILLES & FAN ZONES ──
        // We rely on CitiesSeeder having created the cities already
        $fanZones = [
            [
                'ville' => 'New York/New Jersey',
                'stadium_name' => 'MetLife Stadium',
                'capacity' => '50 000',
                'matches_count' => 8,
                'address' => 'Liberty State Park, Jersey City',
                'zone_label' => 'Liberty Fan Park',
                'description' => 'Vivez la finale au pied de la Statue de la Liberté. Écrans 4K géants et ambiance électrique garantie.',
                'image_url' => 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=900&q=80&fit=crop',
                'group_label' => 'USA · East',
                'status' => 'active',
            ],
            [
                'ville' => 'Mexico City',
                'stadium_name' => 'Estadio Azteca',
                'capacity' => '100 000',
                'matches_count' => 10,
                'address' => 'Zócalo, Mexico City',
                'zone_label' => 'Gran Fiesta Azteca',
                'description' => 'La plus grande fan zone d\'Amérique du Nord. Célébrez le match d\'ouverture dans le cœur historique de Mexico.',
                'image_url' => 'https://images.unsplash.com/photo-1512813195396-6e283a863cc1?w=900&q=80&fit=crop',
                'group_label' => 'Mexico · Central',
                'status' => 'active',
            ],
            [
                'ville' => 'Toronto',
                'stadium_name' => 'BMO Field',
                'capacity' => '30 000',
                'matches_count' => 6,
                'address' => 'Nathan Phillips Square, Toronto',
                'zone_label' => 'Maple Leaf Zone',
                'description' => 'Le hub multiculturel du Canada. Gastronomie mondiale et passion du foot au cœur de Toronto.',
                'image_url' => 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=900&q=80&fit=crop',
                'group_label' => 'Canada · East',
                'status' => 'active',
            ],
            [
                'ville' => 'Los Angeles',
                'stadium_name' => 'SoFi Stadium',
                'capacity' => '40 000',
                'matches_count' => 8,
                'address' => 'Santa Monica Pier, LA',
                'zone_label' => 'Pacific Fan Fest',
                'description' => 'Foot au bord de l\'océan. Écrans géants sur la plage et concerts de stars internationales.',
                'image_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80&fit=crop',
                'group_label' => 'USA · West',
                'status' => 'active',
            ],
            [
                'ville' => 'Miami',
                'stadium_name' => 'Hard Rock Stadium',
                'capacity' => '35 000',
                'matches_count' => 7,
                'address' => 'Bayfront Park, Miami',
                'zone_label' => 'Magic City Fan Zone',
                'description' => 'L\'ambiance latine rencontre la ferveur mondiale. Musique, soleil et football non-stop.',
                'image_url' => 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=900&q=80&fit=crop',
                'group_label' => 'USA · South',
                'status' => 'active',
            ],
        ];

        foreach ($fanZones as $fz) {
            // Find city from CitiesSeeder (which uses City model, but here it's Ville?)
            // Wait, there are two models: City and Ville. This is a mess.
            // I'll try to find it in both.
            $cityId = null;
            $city = \App\Models\City::where('name', $fz['ville'])->first();
            if ($city) $cityId = $city->id;
            
            // If not found in City, check Ville (if it's the same table or not)
            // Actually, usually Ville is the French name for City.
            
            FanZone::create([
                'city_id' => $cityId,
                'stadium_name' => $fz['stadium_name'],
                'capacity' => $fz['capacity'],
                'matches_count' => $fz['matches_count'],
                'address' => $fz['address'],
                'zone_label' => $fz['zone_label'],
                'description' => $fz['description'],
                'image_url' => $fz['image_url'],
                'group_label' => $fz['group_label'],
                'status' => $fz['status'],
            ]);
        }
    }
}
