<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\Group;
use App\Models\Pays;
use App\Models\Confederation;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TeamSeeder extends Seeder
{
    private array $data = [
        'Group A' => [
            ['name' => 'Mexico', 'code' => 'mx', 'conf' => 'CONCACAF'],
            ['name' => 'South Africa', 'code' => 'za', 'conf' => 'CAF'],
            ['name' => 'South Korea', 'code' => 'kr', 'conf' => 'AFC'],
            ['name' => 'Czechia', 'code' => 'cz', 'conf' => 'UEFA'],
        ],
        'Group B' => [
            ['name' => 'Canada', 'code' => 'ca', 'conf' => 'CONCACAF'],
            ['name' => 'Bosnia and Herzegovina', 'code' => 'ba', 'conf' => 'UEFA'],
            ['name' => 'Qatar', 'code' => 'qa', 'conf' => 'AFC'],
            ['name' => 'Switzerland', 'code' => 'ch', 'conf' => 'UEFA'],
        ],
        'Group C' => [
            ['name' => 'Brazil', 'code' => 'br', 'conf' => 'CONMEBOL'],
            ['name' => 'Morocco', 'code' => 'ma', 'conf' => 'CAF'],
            ['name' => 'Haiti', 'code' => 'ht', 'conf' => 'CONCACAF'],
            ['name' => 'Scotland', 'code' => 'gb-sct', 'conf' => 'UEFA'],
        ],
        'Group D' => [
            ['name' => 'USA', 'code' => 'us', 'conf' => 'CONCACAF'],
            ['name' => 'Paraguay', 'code' => 'py', 'conf' => 'CONMEBOL'],
            ['name' => 'Australia', 'code' => 'au', 'conf' => 'AFC'],
            ['name' => 'Turkey', 'code' => 'tr', 'conf' => 'UEFA'],
        ],
        'Group E' => [
            ['name' => 'Germany', 'code' => 'de', 'conf' => 'UEFA'],
            ['name' => 'Curacao', 'code' => 'cw', 'conf' => 'CONCACAF'],
            ['name' => 'Ivory Coast', 'code' => 'ci', 'conf' => 'CAF'],
            ['name' => 'Ecuador', 'code' => 'ec', 'conf' => 'CONMEBOL'],
        ],
        'Group F' => [
            ['name' => 'Netherlands', 'code' => 'nl', 'conf' => 'UEFA'],
            ['name' => 'Japan', 'code' => 'jp', 'conf' => 'AFC'],
            ['name' => 'Sweden', 'code' => 'se', 'conf' => 'UEFA'],
            ['name' => 'Tunisia', 'code' => 'tn', 'conf' => 'CAF'],
        ],
        'Group G' => [
            ['name' => 'Belgium', 'code' => 'be', 'conf' => 'UEFA'],
            ['name' => 'Egypt', 'code' => 'eg', 'conf' => 'CAF'],
            ['name' => 'Iran', 'code' => 'ir', 'conf' => 'AFC'],
            ['name' => 'New Zealand', 'code' => 'nz', 'conf' => 'OFC'],
        ],
        'Group H' => [
            ['name' => 'Spain', 'code' => 'es', 'conf' => 'UEFA'],
            ['name' => 'Cape Verde', 'code' => 'cv', 'conf' => 'CAF'],
            ['name' => 'Saudi Arabia', 'code' => 'sa', 'conf' => 'AFC'],
            ['name' => 'Uruguay', 'code' => 'uy', 'conf' => 'CONMEBOL'],
        ],
        'Group I' => [
            ['name' => 'France', 'code' => 'fr', 'conf' => 'UEFA'],
            ['name' => 'Senegal', 'code' => 'sn', 'conf' => 'CAF'],
            ['name' => 'Iraq', 'code' => 'iq', 'conf' => 'AFC'],
            ['name' => 'Norway', 'code' => 'no', 'conf' => 'UEFA'],
        ],
        'Group J' => [
            ['name' => 'Argentina', 'code' => 'ar', 'conf' => 'CONMEBOL'],
            ['name' => 'Algeria', 'code' => 'dz', 'conf' => 'CAF'],
            ['name' => 'Austria', 'code' => 'at', 'conf' => 'UEFA'],
            ['name' => 'Jordan', 'code' => 'jo', 'conf' => 'AFC'],
        ],
        'Group K' => [
            ['name' => 'Portugal', 'code' => 'pt', 'conf' => 'UEFA'],
            ['name' => 'DR Congo', 'code' => 'cd', 'conf' => 'CAF'],
            ['name' => 'Uzbekistan', 'code' => 'uz', 'conf' => 'AFC'],
            ['name' => 'Colombia', 'code' => 'co', 'conf' => 'CONMEBOL'],
        ],
        'Group L' => [
            ['name' => 'England', 'code' => 'gb-eng', 'conf' => 'UEFA'],
            ['name' => 'Croatia', 'code' => 'hr', 'conf' => 'UEFA'],
            ['name' => 'Ghana', 'code' => 'gh', 'conf' => 'CAF'],
            ['name' => 'Panama', 'code' => 'pa', 'conf' => 'CONCACAF'],
        ],
    ];

    public function run(): void
    {
        foreach ($this->data as $groupName => $teams) {
            $group = Group::where('name', $groupName)->first();
            if (!$group) continue;

            foreach ($teams as $t) {
                // Ensure Confederation exists
                $conf = Confederation::firstOrCreate(['name' => $t['conf']]);

                // Ensure Country exists
                $country = Pays::updateOrCreate(
                    ['code' => strtoupper($t['code'])],
                    ['name' => $t['name'], 'flag_url' => $t['code']]
                );

                Team::updateOrCreate(
                    ['name' => $t['name']],
                    [
                        'group_id' => $group->id,
                        'country_id' => $country->id,
                        'confederation_id' => $conf->id,
                        'flag' => $t['code'],
                        'points' => 0,
                        'goals_for' => 0,
                        'goals_against' => 0,
                        'matches_played' => 0,
                    ]
                );
            }
        }
    }
}
