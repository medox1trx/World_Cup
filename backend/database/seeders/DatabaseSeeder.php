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
            WorldCupSeeder::class,
            CitiesSeeder::class,
            NewsArticleSeeder::class,
            FanZoneSeeder::class,
            HospitalitySeeder::class,
            TicketSeeder::class,
            TeamSeeder::class,
        ]);
    }
}
