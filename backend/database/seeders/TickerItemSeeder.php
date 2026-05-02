<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TickerItem;

class TickerItemSeeder extends Seeder
{
    public function run()
    {
        TickerItem::truncate();

        $items = [
            [
                'text' => 'Billetterie ouverte ! Réservez vos places pour la finale à New York / New Jersey.',
                'label' => 'EN DIRECT',
                'label_color' => '#ffffff',
                'url' => '/tickets',
            ],
            [
                'text' => 'Découvrez les 16 villes hôtes de la Coupe du Monde FIFA 2026.',
                'label' => 'EN DIRECT',
                'label_color' => '#4ade80',
                'url' => '/cities',
            ],
            [
                'text' => 'Le tirage au sort des groupes aura lieu le 1er décembre 2025.',
                'label' => 'EN DIRECT',
                'label_color' => '#fbbf24',
                'url' => '/standings',
            ],
            [
                'text' => 'Fan Zones officielles : Accès gratuit, concerts et écrans géants.',
                'label' => 'EN DIRECT',
                'label_color' => '#60a5fa',
                'url' => '/fans',
            ],
        ];

        foreach ($items as $item) {
            TickerItem::create($item);
        }
    }
}
