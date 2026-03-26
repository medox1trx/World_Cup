<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\City;
use App\Models\Accommodation;

class AccommodationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cities = City::all();
        
        $types = ['Hotel', 'Appartement', 'Villa', 'Chambre'];
        $adjectives = ['Luxe', 'Moderne', 'Cosy', 'Spacieux', 'Charmant', 'Élégant', 'Central', 'Vue sur Mer'];
        $nouns = ['Horizon', 'Sérénité', 'Confort', 'Palais', 'Retraite', 'Oasis', 'Belvédère', 'Résidence'];

        foreach ($cities as $city) {
            // Créer 5 à 8 hébergements par ville
            $count = rand(5, 8);
            for ($i = 0; $i < $count; $i++) {
                $type = $types[array_rand($types)];
                $name = $adjectives[array_rand($adjectives)] . ' ' . $nouns[array_rand($nouns)];
                
                Accommodation::create([
                    'city_id' => $city->id,
                    'name' => $name . ($type === 'Hotel' ? ' Hotel' : ''),
                    'type' => $type,
                    'price' => rand(50, 500),
                    'rating' => rand(40, 50) / 10,
                    'image_url' => "https://images.unsplash.com/photo-" . (1400000000000 + rand(1000000, 9000000)) . "?auto=format&fit=crop&q=80&w=600",
                    'description' => "Un magnifique " . strtolower($type) . " situé au cœur de " . $city->name . ". Idéal pour profiter de l'ambiance Coupe du Monde."
                ]);
            }
        }
    }
}
