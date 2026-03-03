<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Group;

class GroupSeeder extends Seeder
{
    public function run()
    {
        for($i=0; $i<12; $i++){
            Group::create([
                'name' => 'Groupe ' . chr(65 + $i) // Groupe A → L
            ]);
        }
    }
}
