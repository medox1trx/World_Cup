<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorldCupSeeder extends Seeder
{
    public function run(): void
    {
        // ── STATS ─────────────────────────────────────────────
        DB::table('stats')->insert([
            ['key' => 'total_teams',   'value' => '48',  'label' => 'Teams',   'sort_order' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'total_matches', 'value' => '104', 'label' => 'Matches', 'sort_order' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'total_venues',  'value' => '16',  'label' => 'Venues',  'sort_order' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'total_days',    'value' => '48',  'label' => 'Days',    'sort_order' => 4, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // ── MATCHES ───────────────────────────────────────────
        $matches = [
            // Group A
            ['home_team' => 'Morocco', 'away_team' => 'France', 'home_flag' => '🇲🇦', 'away_flag' => '🇫🇷', 'venue' => 'Grand Stade de Casablanca', 'city' => 'Casablanca', 'match_date' => '2030-06-08', 'match_time' => '17:00:00', 'stage' => 'group', 'group_name' => 'Group A', 'status' => 'upcoming'],
            ['home_team' => 'Brazil', 'away_team' => 'Cameroon', 'home_flag' => '🇧🇷', 'away_flag' => '🇨🇲', 'venue' => 'Agadir Stadium', 'city' => 'Agadir', 'match_date' => '2030-06-08', 'match_time' => '20:00:00', 'stage' => 'group', 'group_name' => 'Group A', 'status' => 'upcoming'],
            
            // Group B
            ['home_team' => 'Spain', 'away_team' => 'England', 'home_flag' => '🇪🇸', 'away_flag' => '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'venue' => 'Santiago Bernabéu', 'city' => 'Madrid', 'match_date' => '2030-06-09', 'match_time' => '18:00:00', 'stage' => 'group', 'group_name' => 'Group B', 'status' => 'upcoming'],
            ['home_team' => 'Japan', 'away_team' => 'Ecuador', 'home_flag' => '🇯🇵', 'away_flag' => '🇪🇨', 'venue' => 'Camp Nou', 'city' => 'Barcelona', 'match_date' => '2030-06-09', 'match_time' => '21:00:00', 'stage' => 'group', 'group_name' => 'Group B', 'status' => 'upcoming'],

            // Group C
            ['home_team' => 'Portugal', 'away_team' => 'Argentina', 'home_flag' => '🇵🇹', 'away_flag' => '🇦🇷', 'venue' => 'Estádio da Luz', 'city' => 'Lisbon', 'match_date' => '2030-06-10', 'match_time' => '19:00:00', 'stage' => 'group', 'group_name' => 'Group C', 'status' => 'upcoming'],
            ['home_team' => 'Mexico', 'away_team' => 'Poland', 'home_flag' => '🇲🇽', 'away_flag' => '🇵🇱', 'venue' => 'Estádio do Dragão', 'city' => 'Porto', 'match_date' => '2030-06-10', 'match_time' => '21:00:00', 'stage' => 'group', 'group_name' => 'Group C', 'status' => 'upcoming'],

            // Knockouts
            ['home_team' => 'TBD', 'away_team' => 'TBD', 'home_flag' => '?', 'away_flag' => '?', 'venue' => 'Tangier Stadium', 'city' => 'Tangier', 'match_date' => '2030-07-02', 'match_time' => '18:00:00', 'stage' => 'round_of_16', 'group_name' => null, 'status' => 'upcoming'],
            ['home_team' => 'TBD', 'away_team' => 'TBD', 'home_flag' => '?', 'away_flag' => '?', 'venue' => 'Metropolitano', 'city' => 'Madrid', 'match_date' => '2030-07-10', 'match_time' => '20:00:00', 'stage' => 'quarter', 'group_name' => null, 'status' => 'upcoming'],
            ['home_team' => 'TBD', 'away_team' => 'TBD', 'home_flag' => '?', 'away_flag' => '?', 'venue' => 'Lusail Stadium', 'city' => 'Lusail', 'match_date' => '2030-07-15', 'match_time' => '21:00:00', 'stage' => 'semi', 'group_name' => null, 'status' => 'upcoming'],
            ['home_team' => 'TBD', 'away_team' => 'TBD', 'home_flag' => '?', 'away_flag' => '?', 'venue' => 'Grand Stade de Casablanca', 'city' => 'Casablanca', 'match_date' => '2030-07-21', 'match_time' => '20:00:00', 'stage' => 'final', 'group_name' => null, 'status' => 'upcoming'],
        ];

        foreach ($matches as $match) {
            DB::table('matches')->insert(array_merge($match, ['created_at' => now(), 'updated_at' => now()]));
        }

        // ── STANDINGS ──────────────────────────────────────────
        $groups = [
            'Group A' => [
                ['name' => 'Morocco', 'code' => 'ma', 'pts' => 0],
                ['name' => 'France', 'code' => 'fr', 'pts' => 0],
                ['name' => 'Brazil', 'code' => 'br', 'pts' => 0],
                ['name' => 'Cameroon', 'code' => 'cm', 'pts' => 0],
            ],
            'Group B' => [
                ['name' => 'Spain', 'code' => 'es', 'pts' => 0],
                ['name' => 'England', 'code' => 'gb-eng', 'pts' => 0],
                ['name' => 'Japan', 'code' => 'jp', 'pts' => 0],
                ['name' => 'Ecuador', 'code' => 'ec', 'pts' => 0],
            ],
            'Group C' => [
                ['name' => 'Portugal', 'code' => 'pt', 'pts' => 0],
                ['name' => 'Argentina', 'code' => 'ar', 'pts' => 0],
                ['name' => 'Mexico', 'code' => 'mx', 'pts' => 0],
                ['name' => 'Poland', 'code' => 'pl', 'pts' => 0],
            ],
            'Group D' => [
                ['name' => 'Germany', 'code' => 'de', 'pts' => 0],
                ['name' => 'Belgium', 'code' => 'be', 'pts' => 0],
                ['name' => 'Canada', 'code' => 'ca', 'pts' => 0],
                ['name' => 'Algeria', 'code' => 'dz', 'pts' => 0],
            ],
            'Group E' => [
                ['name' => 'Italy', 'code' => 'it', 'pts' => 0],
                ['name' => 'Uruguay', 'code' => 'uy', 'pts' => 0],
                ['name' => 'Senegal', 'code' => 'sn', 'pts' => 0],
                ['name' => 'South Korea', 'code' => 'kr', 'pts' => 0],
            ],
            'Group F' => [
                ['name' => 'Netherlands', 'code' => 'nl', 'pts' => 0],
                ['name' => 'Croatia', 'code' => 'hr', 'pts' => 0],
                ['name' => 'Egypt', 'code' => 'eg', 'pts' => 0],
                ['name' => 'Australia', 'code' => 'au', 'pts' => 0],
            ],
        ];

        foreach ($groups as $groupName => $teams) {
            foreach ($teams as $idx => $t) {
                DB::table('team_standings')->insert([
                    'group_name' => $groupName,
                    'position' => $idx + 1,
                    'team_name' => $t['name'],
                    'team_code' => $t['code'],
                    'played' => 0, 'won' => 0, 'drawn' => 0, 'lost' => 0,
                    'goals_for' => 0, 'goals_against' => 0, 'goal_difference' => 0,
                    'points' => $t['pts'],
                    'created_at' => now(), 'updated_at' => now()
                ]);
            }
        }
    }
}