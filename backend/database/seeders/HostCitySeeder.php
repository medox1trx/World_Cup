<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Country;
use App\Models\City;

class HostCitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Nettoyer les tables avant de peupler
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        Country::truncate();
        City::truncate();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        $canada = Country::create(['name' => 'Canada']);
        $canada->cities()->createMany([
            ['name' => 'Toronto'],
            ['name' => 'Vancouver'],
        ]);

        $mexico = Country::create(['name' => 'Mexique']);
        $mexico->cities()->createMany([
            ['name' => 'Guadalajara'],
            ['name' => 'Mexico'],
            ['name' => 'Monterrey'],
        ]);

        $usa = Country::create(['name' => 'USA']);
        $usa->cities()->createMany([
            ['name' => 'Atlanta'],
            ['name' => 'Boston'],
            ['name' => 'Dallas'],
            ['name' => 'Houston'],
            ['name' => 'Kansas City'],
            ['name' => 'Los Angeles'],
            ['name' => 'Miami'],
            ['name' => 'New York / New Jersey'],
            ['name' => 'Philadelphia'],
            ['name' => 'San Francisco Bay Area'],
            ['name' => 'Seattle'],
        ]);
    }
}
