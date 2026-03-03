<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Team;

class TeamSeeder extends Seeder
{
    public function run()
    {
       $teams = [
    // Groupe A
    ['name' => 'Mexique', 'group_id' => 1, 'iso' => 'MX'],
    ['name' => 'Afrique du Sud', 'group_id' => 1, 'iso' => 'ZA'],
    ['name' => 'République de Corée', 'group_id' => 1, 'iso' => 'KR'],
    ['name' => 'Canada', 'group_id' => 1, 'iso' => 'CA'],

    // Groupe B
    ['name' => 'Italie', 'group_id' => 2, 'iso' => 'IT'],
    ['name' => 'USA', 'group_id' => 2, 'iso' => 'US'],
    ['name' => 'Paraguay', 'group_id' => 2, 'iso' => 'PY'],
    ['name' => 'Nouvelle-Zélande', 'group_id' => 2, 'iso' => 'NZ'],

    // Groupe C
    ['name' => 'France', 'group_id' => 3, 'iso' => 'FR'],
    ['name' => 'Brésil', 'group_id' => 3, 'iso' => 'BR'],
    ['name' => 'Argentine', 'group_id' => 3, 'iso' => 'AR'],
    ['name' => 'Nigéria', 'group_id' => 3, 'iso' => 'NG'],

    // Groupe D
    ['name' => 'Espagne', 'group_id' => 4, 'iso' => 'ES'],
    ['name' => 'Allemagne', 'group_id' => 4, 'iso' => 'DE'],
    ['name' => 'Portugal', 'group_id' => 4, 'iso' => 'PT'],
    ['name' => 'Maroc', 'group_id' => 4, 'iso' => 'MA'],

    // Groupe E
    ['name' => 'Angleterre', 'group_id' => 5, 'iso' => 'GB'],
    ['name' => 'Pays-Bas', 'group_id' => 5, 'iso' => 'NL'],
    ['name' => 'Japon', 'group_id' => 5, 'iso' => 'JP'],
    ['name' => 'Costa Rica', 'group_id' => 5, 'iso' => 'CR'],

    // etc… continuer jusqu’au groupe L
];

        foreach ($teams as $t) {
            Team::create($t);
        }
    }
}
