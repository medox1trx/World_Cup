<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            HighlightSeeder::class,
            CitiesSeeder::class,
            NewsArticleSeeder::class,
            FanZoneDynamicSeeder::class,
            HospitalitySeeder::class,
            TicketSeeder::class,
            GroupSeeder::class,
            TeamSeeder::class,
            JoueursSeeder::class,
            MatchesSeeder::class,
            RefereeSeeder::class,
        ]);
    }
}
