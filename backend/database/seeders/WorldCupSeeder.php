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
            ['home_team' => 'Brazil',    'away_team' => 'France',    'home_flag' => '🇧🇷', 'away_flag' => '🇫🇷', 'venue' => 'Lusail Stadium',     'city' => 'Lusail',        'match_date' => '2030-06-15', 'match_time' => '18:00:00', 'stage' => 'group', 'group_name' => 'Group A', 'status' => 'upcoming'],
            ['home_team' => 'Germany',   'away_team' => 'Argentina', 'home_flag' => '🇩🇪', 'away_flag' => '🇦🇷', 'venue' => 'Al Bayt Stadium',    'city' => 'Al Khor',       'match_date' => '2030-06-16', 'match_time' => '15:00:00', 'stage' => 'group', 'group_name' => 'Group B', 'status' => 'upcoming'],
            ['home_team' => 'Spain',     'away_team' => 'England',   'home_flag' => '🇪🇸', 'away_flag' => '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'venue' => 'Education City',     'city' => 'Doha',          'match_date' => '2030-06-17', 'match_time' => '21:00:00', 'stage' => 'group', 'group_name' => 'Group C', 'status' => 'upcoming'],
            ['home_team' => 'Portugal',  'away_team' => 'Morocco',   'home_flag' => '🇵🇹', 'away_flag' => '🇲🇦', 'venue' => 'Estadio da Luz',     'city' => 'Lisbon',        'match_date' => '2030-06-18', 'match_time' => '18:00:00', 'stage' => 'group', 'group_name' => 'Group D', 'status' => 'upcoming'],
            ['home_team' => 'USA',       'away_team' => 'Mexico',    'home_flag' => '🇺🇸', 'away_flag' => '🇲🇽', 'venue' => 'MetLife Stadium',    'city' => 'New York',      'match_date' => '2030-06-19', 'match_time' => '20:00:00', 'stage' => 'group', 'group_name' => 'Group E', 'status' => 'upcoming'],
            ['home_team' => 'Italy',     'away_team' => 'Japan',     'home_flag' => '🇮🇹', 'away_flag' => '🇯🇵', 'venue' => 'San Siro',          'city' => 'Milan',         'match_date' => '2030-06-20', 'match_time' => '18:00:00', 'stage' => 'group', 'group_name' => 'Group F', 'status' => 'upcoming'],
        ];

        foreach ($matches as $match) {
            DB::table('matches')->insert(array_merge($match, ['created_at' => now(), 'updated_at' => now()]));
        }
    }
}