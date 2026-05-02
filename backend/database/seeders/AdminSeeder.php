<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@fifa2026.com'],
            [
                'name'     => 'Admin FIFA',
                'password' => Hash::make('admin123'),
                'role'     => 'admin',
            ]
        );

        User::firstOrCreate(
            ['email' => 'user@fifa2026.com'],
            [
                'name'     => 'Utilisateur Test',
                'password' => Hash::make('user1234'),
                'role'     => 'user',
            ]
        );
    }
}
