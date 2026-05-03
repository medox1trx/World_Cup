<?php

namespace Database\Seeders;

use App\Models\Referee;
use Illuminate\Database\Seeder;

class RefereeSeeder extends Seeder
{
    public function run(): void
    {
        // Truncate first to ensure we only have what we want
        Referee::truncate();

        Referee::create([
            'name'               => 'Felix Zwayer',
            'first_name'         => 'Felix',
            'last_name'          => 'Zwayer',
            'nationality'        => 'Germany',
            'nationality_code'   => 'de',
            'role'               => 'main',
            'age'                => 42,
            'experience_years'   => 15,
            'matches_officiated' => 250,
            'photo_url'          => 'referees/referee_1.png',
            'fifa_badge'         => 'elite',
            'notes'              => 'Arbitre international expérimenté.'
        ]);
    }
}
