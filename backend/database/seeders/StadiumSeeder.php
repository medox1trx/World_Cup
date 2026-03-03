<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Stadium;

class StadiumSeeder extends Seeder
{
    public function run()
    {
        $stadiums = [
    ['name' => 'Stade Azteca', 'city' => 'Mexico', 'country' => 'Mexique'],
    ['name' => 'Rose Bowl', 'city' => 'Pasadena', 'country' => 'USA'],
    ['name' => 'Gillette Stadium', 'city' => 'Foxborough', 'country' => 'USA'],
    ['name' => 'Mercedes-Benz Stadium', 'city' => 'Atlanta', 'country' => 'USA'],
    ['name' => 'BMO Field', 'city' => 'Toronto', 'country' => 'Canada'],
    ['name' => 'BC Place', 'city' => 'Vancouver', 'country' => 'Canada'],
    ['name' => 'Estadio Akron', 'city' => 'Guadalajara', 'country' => 'Mexique'],
    ['name' => 'NRG Stadium', 'city' => 'Houston', 'country' => 'USA'],
    ['name' => 'SoFi Stadium', 'city' => 'Los Angeles', 'country' => 'USA'],
    ['name' => 'Saputo Stadium', 'city' => 'Montreal', 'country' => 'Canada'],
    ['name' => 'Estadio BBVA', 'city' => 'Monterrey', 'country' => 'Mexique'],
];

        foreach ($stadiums as $s) {
            Stadium::create($s);
        }
    }
}
