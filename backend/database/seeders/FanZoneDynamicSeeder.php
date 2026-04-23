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
        Ville::truncate();
        Pays::truncate();
        Schema::enableForeignKeyConstraints();

        // ── PAYS ──
        $paysList = [
            ['nom' => 'United States', 'code_iso' => 'us'],
            ['nom' => 'Mexico',        'code_iso' => 'mx'],
            ['nom' => 'Canada',        'code_iso' => 'ca'],
        ];

        $paysModels = [];
        foreach ($paysList as $p) {
            $paysModels[$p['code_iso']] = Pays::create($p);
        }

        // ── VILLES ──
        $villesList = [
            ['nom' => 'New York',      'code_iso' => 'us'],
            ['nom' => 'Los Angeles',   'code_iso' => 'us'],
            ['nom' => 'Miami',         'code_iso' => 'us'],
            ['nom' => 'Dallas',        'code_iso' => 'us'],
            ['nom' => 'Mexico City',   'code_iso' => 'mx'],
            ['nom' => 'Monterrey',     'code_iso' => 'mx'],
            ['nom' => 'Toronto',       'code_iso' => 'ca'],
            ['nom' => 'Vancouver',     'code_iso' => 'ca'],
        ];

        $villeModels = [];
        foreach ($villesList as $v) {
            $villeModels[$v['nom']] = Ville::create([
                'nom' => $v['nom'],
                'pays_id' => $paysModels[$v['code_iso']]->id,
            ]);
        }

        // ── FAN ZONES ──
        $fanZones = [
            [
                'ville' => 'New York',
                'stade' => 'MetLife Stadium',
                'capacite' => '50 000',
                'nb_matchs' => 8,
                'adresse' => 'Liberty State Park, Jersey City',
                'zone_label' => 'Liberty Fan Park',
                'description' => 'Vivez la finale au pied de la Statue de la Liberté. Écrans 4K géants et ambiance électrique garantie.',
                'image_url' => 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=900&q=80&fit=crop',
                'groupe' => 'USA · East',
                'statut' => 'actif',
            ],
            [
                'ville' => 'Mexico City',
                'stade' => 'Estadio Azteca',
                'capacite' => '100 000',
                'nb_matchs' => 10,
                'adresse' => 'Zócalo, Mexico City',
                'zone_label' => 'Gran Fiesta Azteca',
                'description' => 'La plus grande fan zone d\'Amérique du Nord. Célébrez le match d\'ouverture dans le cœur historique de Mexico.',
                'image_url' => 'https://images.unsplash.com/photo-1512813195396-6e283a863cc1?w=900&q=80&fit=crop',
                'groupe' => 'Mexico · Central',
                'statut' => 'actif',
            ],
            [
                'ville' => 'Toronto',
                'stade' => 'BMO Field',
                'capacite' => '30 000',
                'nb_matchs' => 6,
                'adresse' => 'Nathan Phillips Square, Toronto',
                'zone_label' => 'Maple Leaf Zone',
                'description' => 'Le hub multiculturel du Canada. Gastronomie mondiale et passion du foot au cœur de Toronto.',
                'image_url' => 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=900&q=80&fit=crop',
                'groupe' => 'Canada · East',
                'statut' => 'actif',
            ],
            [
                'ville' => 'Los Angeles',
                'stade' => 'SoFi Stadium',
                'capacite' => '40 000',
                'nb_matchs' => 8,
                'adresse' => 'Santa Monica Pier, LA',
                'zone_label' => 'Pacific Fan Fest',
                'description' => 'Foot au bord de l\'océan. Écrans géants sur la plage et concerts de stars internationales.',
                'image_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80&fit=crop',
                'groupe' => 'USA · West',
                'statut' => 'actif',
            ],
            [
                'ville' => 'Miami',
                'stade' => 'Hard Rock Stadium',
                'capacite' => '35 000',
                'nb_matchs' => 7,
                'adresse' => 'Bayfront Park, Miami',
                'zone_label' => 'Magic City Fan Zone',
                'description' => 'L\'ambiance latine rencontre la ferveur mondiale. Musique, soleil et football non-stop.',
                'image_url' => 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=900&q=80&fit=crop',
                'groupe' => 'USA · South',
                'statut' => 'actif',
            ],
        ];

        foreach ($fanZones as $fz) {
            FanZone::create([
                'ville_id' => $villeModels[$fz['ville']]->id,
                'stade' => $fz['stade'],
                'capacite' => $fz['capacite'],
                'nb_matchs' => $fz['nb_matchs'],
                'adresse' => $fz['adresse'],
                'zone_label' => $fz['zone_label'],
                'description' => $fz['description'],
                'image_url' => $fz['image_url'],
                'groupe' => $fz['groupe'],
                'statut' => $fz['statut'],
            ]);
        }
    }
}
