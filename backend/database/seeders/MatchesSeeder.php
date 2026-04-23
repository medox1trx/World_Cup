<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FootballMatch;
use Illuminate\Support\Facades\DB;

class MatchesSeeder extends Seeder
{
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('matches')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $matches = [
            ['group_name' => 'Group B', 'home_team' => 'Mexico',        'away_team' => 'Uzbekistan',  'match_date' => '2026-06-11', 'match_time' => '17:00', 'venue' => 'Estadio Azteca', 'city' => 'Mexico City', 'stage' => 'group', 'status' => 'upcoming'],
            ['group_name' => 'Group C', 'home_team' => 'Canada',        'away_team' => 'Qatar',       'match_date' => '2026-06-12', 'match_time' => '15:00', 'venue' => 'BMO Field', 'city' => 'Toronto', 'stage' => 'group', 'status' => 'upcoming'],
            ['group_name' => 'Group A', 'home_team' => 'United States', 'away_team' => 'Iraq',        'match_date' => '2026-06-12', 'match_time' => '18:00', 'venue' => 'SoFi Stadium', 'city' => 'Los Angeles', 'stage' => 'group', 'status' => 'upcoming'],
            ['group_name' => 'Group D', 'home_team' => 'France',        'away_team' => 'Costa Rica',  'match_date' => '2026-06-13', 'match_time' => '14:00', 'venue' => 'MetLife Stadium', 'city' => 'East Rutherford', 'stage' => 'group', 'status' => 'upcoming'],
            ['group_name' => 'Group E', 'home_team' => 'Argentina',     'away_team' => 'Panama',      'match_date' => '2026-06-13', 'match_time' => '17:00', 'venue' => 'Mercedes-Benz Stadium', 'city' => 'Atlanta', 'stage' => 'group', 'status' => 'upcoming'],
            ['group_name' => 'Group F', 'home_team' => 'Brazil',        'away_team' => 'Australia',   'match_date' => '2026-06-14', 'match_time' => '13:00', 'venue' => 'NRG Stadium', 'city' => 'Houston', 'stage' => 'group', 'status' => 'upcoming'],
            ['group_name' => 'Group G', 'home_team' => 'England',       'away_team' => 'Hungary',     'match_date' => '2026-06-14', 'match_time' => '16:00', 'venue' => 'Lincoln Financial Field', 'city' => 'Philadelphia', 'stage' => 'group', 'status' => 'upcoming'],
            ['group_name' => 'Group H', 'home_team' => 'Spain',         'away_team' => 'Sweden',      'match_date' => '2026-06-15', 'match_time' => '12:00', 'venue' => 'Lumen Field', 'city' => 'Seattle', 'stage' => 'group', 'status' => 'upcoming'],
            ['group_name' => 'Group I', 'home_team' => 'Portugal',      'away_team' => 'Turkey',      'match_date' => '2026-06-15', 'match_time' => '15:00', 'venue' => 'Gillette Stadium', 'city' => 'Boston', 'stage' => 'group', 'status' => 'upcoming'],
            ['group_name' => 'Group J', 'home_team' => 'Netherlands',   'away_team' => 'Wales',       'match_date' => '2026-06-16', 'match_time' => '14:00', 'venue' => 'BC Place', 'city' => 'Vancouver', 'stage' => 'group', 'status' => 'upcoming'],
            ['group_name' => 'Group K', 'home_team' => 'Belgium',       'away_team' => 'New Zealand', 'match_date' => '2026-06-16', 'match_time' => '18:00', 'venue' => 'Arrowhead Stadium', 'city' => 'Kansas City', 'stage' => 'group', 'status' => 'upcoming'],
            ['group_name' => 'Group L', 'home_team' => 'Italy',         'away_team' => 'Ukraine',     'match_date' => '2026-06-17', 'match_time' => '13:00', 'venue' => "Levi's Stadium", 'city' => 'Santa Clara', 'stage' => 'group', 'status' => 'upcoming'],
        ];

        foreach ($matches as $data) {
            $homeTeam = \App\Models\Team::where('name', $data['home_team'])->first();
            $awayTeam = \App\Models\Team::where('name', $data['away_team'])->first();

            FootballMatch::create([
                'group_name'   => $data['group_name'],
                'home_team'    => $data['home_team'],
                'away_team'    => $data['away_team'],
                'home_team_id' => $homeTeam?->id,
                'away_team_id' => $awayTeam?->id,
                'match_date'   => $data['match_date'],
                'match_time'   => $data['match_time'],
                'venue'        => $data['venue'],
                'city'         => $data['city'],
                'stage'        => $data['stage'],
                'status'       => $data['status'],
                'home_score'   => null,
                'away_score'   => null,
            ]);
        }
    }
}
