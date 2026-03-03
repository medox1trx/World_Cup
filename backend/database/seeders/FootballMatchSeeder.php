<?php

namespace Database\Seeders; // <- important !

use Illuminate\Database\Seeder;
use App\Models\FootballMatch;

class FootballMatchSeeder extends Seeder
{
    public function run(): void
    {
        $matches = [
    ['home_team' => 'Mexique', 'away_team' => 'Afrique du Sud', 'match_datetime' => '2026-06-11 20:00:00', 'phase_id'=>1, 'group_id'=>1, 'stadium_id'=>1],
    ['home_team' => 'République de Corée', 'away_team' => 'Canada', 'match_datetime' => '2026-06-12 02:00:00', 'phase_id'=>1, 'group_id'=>1, 'stadium_id'=>2],
    ['home_team' => 'Italie', 'away_team' => 'USA', 'match_datetime' => '2026-06-12 20:00:00', 'phase_id'=>1, 'group_id'=>2, 'stadium_id'=>3],
    ['home_team' => 'Paraguay', 'away_team' => 'Nouvelle-Zélande', 'match_datetime' => '2026-06-13 03:00:00', 'phase_id'=>1, 'group_id'=>2, 'stadium_id'=>4],
    ['home_team' => 'France', 'away_team' => 'Brésil', 'match_datetime' => '2026-06-13 18:00:00', 'phase_id'=>1, 'group_id'=>3, 'stadium_id'=>5],
    ['home_team' => 'Argentine', 'away_team' => 'Nigéria', 'match_datetime' => '2026-06-14 21:00:00', 'phase_id'=>1, 'group_id'=>3, 'stadium_id'=>6],
    ['home_team' => 'Espagne', 'away_team' => 'Allemagne', 'match_datetime' => '2026-06-15 18:00:00', 'phase_id'=>1, 'group_id'=>4, 'stadium_id'=>7],
    ['home_team' => 'Portugal', 'away_team' => 'Maroc', 'match_datetime' => '2026-06-15 21:00:00', 'phase_id'=>1, 'group_id'=>4, 'stadium_id'=>8],
    ['home_team' => 'Angleterre', 'away_team' => 'Pays-Bas', 'match_datetime' => '2026-06-16 18:00:00', 'phase_id'=>1, 'group_id'=>5, 'stadium_id'=>9],
    ['home_team' => 'Japon', 'away_team' => 'Costa Rica', 'match_datetime' => '2026-06-16 21:00:00', 'phase_id'=>1, 'group_id'=>5, 'stadium_id'=>10],
    // Ajoute plein d'autres matchs pour tous les groupes…
];

        foreach ($matches as $m) {
            FootballMatch::create($m);
        }
    }
}
