<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Pays;
use App\Models\Stadium;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CitiesSeeder extends Seeder
{
    private array $stadiums = [
        ['city' => 'Mexico City', 'country' => 'Mexico', 'stadium' => 'Estadio Azteca'],
        ['city' => 'Guadalajara', 'country' => 'Mexico', 'stadium' => 'Estadio Akron'],
        ['city' => 'Monterrey', 'country' => 'Mexico', 'stadium' => 'Estadio BBVA'],
        ['city' => 'Toronto', 'country' => 'Canada', 'stadium' => 'BMO Field'],
        ['city' => 'Vancouver', 'country' => 'Canada', 'stadium' => 'BC Place'],
        ['city' => 'New York/New Jersey', 'country' => 'USA', 'stadium' => 'MetLife Stadium'],
        ['city' => 'Los Angeles', 'country' => 'USA', 'stadium' => 'SoFi Stadium'],
        ['city' => 'San Francisco', 'country' => 'USA', 'stadium' => 'Levi\'s Stadium'],
        ['city' => 'Seattle', 'country' => 'USA', 'stadium' => 'Lumen Field'],
        ['city' => 'Dallas', 'country' => 'USA', 'stadium' => 'AT&T Stadium'],
        ['city' => 'Houston', 'country' => 'USA', 'stadium' => 'NRG Stadium'],
        ['city' => 'Kansas City', 'country' => 'USA', 'stadium' => 'GEHA Field at Arrowhead Stadium'],
        ['city' => 'Atlanta', 'country' => 'USA', 'stadium' => 'Mercedes-Benz Stadium'],
        ['city' => 'Miami', 'country' => 'USA', 'stadium' => 'Hard Rock Stadium'],
        ['city' => 'Boston', 'country' => 'USA', 'stadium' => 'Gillette Stadium'],
        ['city' => 'Philadelphia', 'country' => 'USA', 'stadium' => 'Lincoln Financial Field'],
    ];

    public function run(): void
    {
        foreach ($this->stadiums as $s) {
            $country = Pays::where('name', $s['country'])->first();
            if (!$country) {
                $country = Pays::create([
                    'name' => $s['country'],
                    'code' => strtoupper(substr($s['country'], 0, 2)),
                    'flag_url' => strtolower(substr($s['country'], 0, 2))
                ]);
            }

            $city = City::updateOrCreate(
                ['name' => $s['city']],
                [
                    'slug' => Str::slug($s['city']),
                    'country_id' => $country->id,
                    'description' => "Official host city for FIFA World Cup 2026.",
                    'stadium' => $s['stadium'],
                    'match_period' => "Group Stage & Knockout",
                    'image_url' => "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop",
                    'lat' => 0,
                    'lng' => 0
                ]
            );

            Stadium::updateOrCreate(
                ['name' => $s['stadium']],
                [
                    'city_id' => $city->id,
                    'capacity' => 60000,
                    'image_url' => "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop",
                    'description' => "Official venue for FIFA World Cup 2026 matches."
                ]
            );
        }
    }
}
