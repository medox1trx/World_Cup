<?php

namespace Database\Seeders;

use App\Models\Referee;
use Illuminate\Database\Seeder;

class RefereeSeeder extends Seeder
{
    private array $referees = [
        ['name' => 'Abdulrahman Al Jassim', 'country' => 'Qatar'],
        ['name' => 'Khamis Al-Marri', 'country' => 'Qatar'],
        ['name' => 'Ivan Bebek', 'country' => 'Croatia'],
        ['name' => 'Jerome Brisard', 'country' => 'France'],
        ['name' => 'Bastian Dankert', 'country' => 'Germany'],
        ['name' => 'Raphael Claus', 'country' => 'Brazil'],
        ['name' => 'Ramon Abatti', 'country' => 'Brazil'],
        ['name' => 'Cesar Ramos', 'country' => 'Mexico'],
        ['name' => 'Katia Garcia', 'country' => 'Mexico'],
        ['name' => 'Drew Fischer', 'country' => 'Canada'],
        ['name' => 'Cristian Garay', 'country' => 'Chile'],
        ['name' => 'Ma Ning', 'country' => 'China'],
        ['name' => 'Mustapha Ghorbal', 'country' => 'Algeria'],
        ['name' => 'Adham Makhadmeh', 'country' => 'Jordan'],
        ['name' => 'Dahana Beida', 'country' => 'Mauritania'],
        ['name' => 'Yael Falcon', 'country' => 'Argentina'],
    ];

    public function run(): void
    {
        foreach ($this->referees as $r) {
            Referee::updateOrCreate(
                ['name' => $r['name']],
                ['country' => $r['country'] ?? 'Unknown']
            );
        }
    }
}
