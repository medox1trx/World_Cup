<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HospitalityUpdateSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing records safely (avoid FK constraint with truncate)
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('hospitalities')->delete();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        DB::statement('ALTER TABLE hospitalities AUTO_INCREMENT = 1;');
        $this->command->info('Table cleared.');

        // Data from frontend Hospitality.jsx — OFFRES DE MATCHES section
        $packages = [
            [
                'tier'        => 'MATCH UNIQUE',
                'badge'       => 'Populaire',
                'description' => "Vivez le plus beau des sports sur la plus grande scène, au match de votre choix. Maintenant disponible : Matchs de l'équipe des États-Unis et Demi-finales !",
                'perks'       => json_encode([
                    "Phase de groupes : 1 match au choix, incluant l'équipe des États-Unis",
                    "Phases à élimination directe : 1 match au choix, sauf la Finale (éligible : 16es, 8es, Quarts, Demies, Petite Finale)",
                    "Options d'hospitalité : Salon Bord de terrain, VIP, Salon des Trophées, Club des Champions, Pavillon FIFA",
                ]),
                'image_url'   => 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=700&q=80&fit=crop',
                'price'       => 950,
                'sort_order'  => 1,
            ],
            [
                'tier'        => 'SÉRIE PAR STADE',
                'badge'       => null,
                'description' => "Assistez à tous les matchs dans le stade de votre choix.",
                'perks'       => json_encode([
                    "Comprend de 4 à 9 matchs, selon le stade",
                    "Toutes les dates de match et toutes les phases sont éligibles",
                    "Options d'hospitalité : Salon Bord de terrain, VIP, Salon des Trophées, Club des Champions, Pavillon FIFA",
                ]),
                'image_url'   => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80&fit=crop',
                'price'       => 3500,
                'sort_order'  => 2,
            ],
            [
                'tier'        => 'SUIVRE MON ÉQUIPE',
                'badge'       => null,
                'description' => "Voyez votre équipe en action à chaque match de la phase de groupes, quel que soit le lieu.",
                'perks'       => json_encode([
                    "Toutes les dates de match et tous les lieux sont éligibles",
                    "« Suivre Mon Équipe » n'est actuellement pas disponible pour les équipes des pays hôtes (Canada, Mexique, États-Unis)",
                    "Options d'hospitalité : Salon Bord de terrain, VIP, Salon des Trophées, Club des Champions, Pavillon FIFA",
                ]),
                'image_url'   => 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=700&q=80&fit=crop',
                'price'       => 2200,
                'sort_order'  => 3,
            ],
        ];

        foreach ($packages as $pkg) {
            DB::table('hospitalities')->insert([
                'city_id'     => null,
                'country_id'  => null,
                'tier'        => $pkg['tier'],
                'price'       => $pkg['price'],
                'badge'       => $pkg['badge'],
                'is_featured' => false,
                'description' => $pkg['description'],
                'perks'       => $pkg['perks'],
                'cta_text'    => 'Réserver',
                'image_url'   => $pkg['image_url'],
                'sort_order'  => $pkg['sort_order'],
                'is_active'   => true,
                'created_at'  => now(),
                'updated_at'  => now(),
            ]);
            $this->command->info("✅ Inserted: {$pkg['tier']}");
        }

        $this->command->info('🎉 All 3 hospitality packages seeded successfully!');
    }
}
