<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Phase;

class PhaseSeeder extends Seeder
{
    public function run()
    {
        $phases = [
            "Phase de groupes",
            "Seizièmes de finale",
            "Huitièmes de finale",
            "Quart de finale",
            "Demi-finale",
            "Match pour la troisième place",
            "Finale"
        ];

        foreach ($phases as $phase) {
            Phase::create(['name' => $phase]);
        }
    }
}
