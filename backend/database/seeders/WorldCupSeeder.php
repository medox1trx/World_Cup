<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorldCupSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        // ── STATS ─────────────────────────────────────────────
        DB::table('stats')->truncate();
        DB::table('stats')->insert([
            ['key' => 'total_teams',   'value' => '48',  'label' => 'Nations',  'sort_order' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'total_matches', 'value' => '104', 'label' => 'Matchs',   'sort_order' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'total_venues',  'value' => '16',  'label' => 'Stades',   'sort_order' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'total_days',    'value' => '39',  'label' => 'Jours',    'sort_order' => 4, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Note: Les matches sont maintenant gérés par MatchesSeeder.php

        // ── STANDINGS (12 groupes × 4 équipes) ───────────────
        DB::table('team_standings')->truncate();

        $groups = [
            'Groupe A' => [
                ['name' => 'Mexique', 'code' => 'mx'],
                ['name' => 'Afrique du Sud', 'code' => 'za'],
                ['name' => 'Corée du Sud', 'code' => 'kr'],
                ['name' => 'Tchéquie', 'code' => 'cz'],
            ],
            'Groupe B' => [
                ['name' => 'Canada', 'code' => 'ca'],
                ['name' => 'Bosnie-Herzégovine', 'code' => 'ba'],
                ['name' => 'Qatar', 'code' => 'qa'],
                ['name' => 'Suisse', 'code' => 'ch'],
            ],
            'Groupe C' => [
                ['name' => 'Brésil', 'code' => 'br'],
                ['name' => 'Maroc', 'code' => 'ma'],
                ['name' => 'Haïti', 'code' => 'ht'],
                ['name' => 'Écosse', 'code' => 'sc'],
            ],
            'Groupe D' => [
                ['name' => 'USA', 'code' => 'us'],
                ['name' => 'Paraguay', 'code' => 'py'],
                ['name' => 'Australie', 'code' => 'au'],
                ['name' => 'Turquie', 'code' => 'tr'],
            ],
            'Groupe E' => [
                ['name' => 'Allemagne', 'code' => 'de'],
                ['name' => 'Curaçao', 'code' => 'cw'],
                ['name' => "Côte d'Ivoire", 'code' => 'ci'],
                ['name' => 'Équateur', 'code' => 'ec'],
            ],
            'Groupe F' => [
                ['name' => 'Pays-Bas', 'code' => 'nl'],
                ['name' => 'Japon', 'code' => 'jp'],
                ['name' => 'Tunisie', 'code' => 'tn'],
                ['name' => 'Suède', 'code' => 'se'],
            ],
            'Groupe G' => [
                ['name' => 'Belgique', 'code' => 'be'],
                ['name' => 'Égypte', 'code' => 'eg'],
                ['name' => 'Iran', 'code' => 'ir'],
                ['name' => 'Nouvelle-Zélande', 'code' => 'nz'],
            ],
            'Groupe H' => [
                ['name' => 'Espagne', 'code' => 'es'],
                ['name' => 'Cap-Vert', 'code' => 'cv'],
                ['name' => 'Arabie Saoudite', 'code' => 'sa'],
                ['name' => 'Uruguay', 'code' => 'uy'],
            ],
            'Groupe I' => [
                ['name' => 'France', 'code' => 'fr'],
                ['name' => 'Sénégal', 'code' => 'sn'],
                ['name' => 'Norvège', 'code' => 'no'],
                ['name' => 'Irak', 'code' => 'iq'],
            ],
            'Groupe J' => [
                ['name' => 'Argentine', 'code' => 'ar'],
                ['name' => 'Algérie', 'code' => 'dz'],
                ['name' => 'Autriche', 'code' => 'at'],
                ['name' => 'Jordanie', 'code' => 'jo'],
            ],
            'Groupe K' => [
                ['name' => 'Portugal', 'code' => 'pt'],
                ['name' => 'RD Congo', 'code' => 'cd'],
                ['name' => 'Ouzbékistan', 'code' => 'uz'],
                ['name' => 'Colombie', 'code' => 'co'],
            ],
            'Groupe L' => [
                ['name' => 'Angleterre', 'code' => 'gb'],
                ['name' => 'Croatie', 'code' => 'hr'],
                ['name' => 'Ghana', 'code' => 'gh'],
                ['name' => 'Panama', 'code' => 'pa'],
            ],
        ];

        foreach ($groups as $groupName => $teams) {
            foreach ($teams as $idx => $t) {
                DB::table('team_standings')->insert([
                    'group_name'     => $groupName,
                    'position'       => $idx + 1,
                    'team_name'      => $t['name'],
                    'team_code'      => $t['code'],
                    'played'         => 0, 'won'  => 0, 'drawn' => 0, 'lost' => 0,
                    'goals_for'      => 0, 'goals_against' => 0, 'goal_difference' => 0,
                    'points'         => 0,
                    'created_at'     => now(), 'updated_at' => now(),
                ]);
            }
        }
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}