<?php

namespace Database\Seeders;

use App\Models\FootballMatch;
use App\Models\Team;
use App\Models\City;
use App\Models\Stadium;
use Illuminate\Database\Seeder;

class MatchesSeeder extends Seeder
{
    private array $matches = [
        ['t1' => 'Mexico', 't2' => 'South Africa', 'date' => '2026-06-11 15:00:00', 'city' => 'Mexico City', 'stadium' => 'Estadio Azteca'],
        ['t1' => 'Canada', 't2' => 'Bosnia and Herzegovina', 'date' => '2026-06-12 15:00:00', 'city' => 'Toronto', 'stadium' => 'BMO Field'],
        ['t1' => 'Brazil', 't2' => 'Morocco', 'date' => '2026-06-13 18:00:00', 'city' => 'New York/New Jersey', 'stadium' => 'MetLife Stadium'],
        ['t1' => 'USA', 't2' => 'Paraguay', 'date' => '2026-06-12 21:00:00', 'city' => 'Los Angeles', 'stadium' => 'SoFi Stadium'],
        ['t1' => 'Germany', 't2' => 'Curacao', 'date' => '2026-06-14 13:00:00', 'city' => 'Houston', 'stadium' => 'NRG Stadium'],
        ['t1' => 'Netherlands', 't2' => 'Japan', 'date' => '2026-06-14 16:00:00', 'city' => 'Dallas', 'stadium' => 'AT&T Stadium'],
        ['t1' => 'Belgium', 't2' => 'Egypt', 'date' => '2026-06-15 15:00:00', 'city' => 'Seattle', 'stadium' => 'Lumen Field'],
        ['t1' => 'Spain', 't2' => 'Cape Verde', 'date' => '2026-06-15 12:00:00', 'city' => 'Atlanta', 'stadium' => 'Mercedes-Benz Stadium'],
        ['t1' => 'France', 't2' => 'Senegal', 'date' => '2026-06-16 15:00:00', 'city' => 'New York/New Jersey', 'stadium' => 'MetLife Stadium'],
        ['t1' => 'Argentina', 't2' => 'Algeria', 'date' => '2026-06-16 21:00:00', 'city' => 'Kansas City', 'stadium' => 'GEHA Field at Arrowhead Stadium'],
        ['t1' => 'Portugal', 't2' => 'DR Congo', 'date' => '2026-06-17 13:00:00', 'city' => 'Houston', 'stadium' => 'NRG Stadium'],
        ['t1' => 'England', 't2' => 'Croatia', 'date' => '2026-06-17 16:00:00', 'city' => 'Dallas', 'stadium' => 'AT&T Stadium'],
    ];

    public function run(): void
    {
        foreach ($this->matches as $m) {
            $team1 = Team::where('name', $m['t1'])->first();
            $team2 = Team::where('name', $m['t2'])->first();
            $city = City::where('name', $m['city'])->first();
            $stadium = Stadium::where('name', $m['stadium'])->first();

            if (!$team1 || !$team2 || !$city || !$stadium) continue;

            FootballMatch::updateOrCreate(
                [
                    'team1_id' => $team1->id,
                    'team2_id' => $team2->id,
                    'match_date' => date('Y-m-d', strtotime($m['date'])),
                ],
                [
                    'city_id' => $city->id,
                    'stadium_id' => $stadium->id,
                    'city' => $city->name,
                    'venue' => $stadium->name,
                    'match_time' => date('H:i:s', strtotime($m['date'])),
                    'status' => 'upcoming',
                    'stage' => 'group',
                    'group_name' => $team1->group->name ?? 'Unknown',
                    'home_score' => null,
                    'away_score' => null,
                ]
            );
        }
    }
}
