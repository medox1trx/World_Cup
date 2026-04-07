<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HighlightSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Highlight::create([
            'title' => 'Maroc vs Espagne - Demi-Finales 2022',
            'image_url' => 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
            'duration' => '4:32',
            'category' => 'Match de Légende',
            'views' => 2400000,
            'likes' => 150000,
            'status' => 'published'
        ]);

        \App\Models\Highlight::create([
            'title' => 'Top 10 : Plus beaux buts de l\'histoire',
            'image_url' => 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&q=80',
            'duration' => '10:15',
            'category' => 'Compilations',
            'views' => 5100000,
            'likes' => 420000,
            'status' => 'published'
        ]);

        \App\Models\Highlight::create([
            'title' => 'Ambiance : Les supporters à Casablanca',
            'image_url' => 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80',
            'duration' => '6:40',
            'category' => 'Fan Experience',
            'views' => 850000,
            'likes' => 92000,
            'status' => 'published'
        ]);
        
        \App\Models\Highlight::create([
          'title' => 'Finale 2026 : Le sacre historique',
          'image_url' => 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80',
          'duration' => '15:20',
          'category' => 'Match de Légende',
          'views' => 12500000,
          'likes' => 890000,
          'status' => 'published'
        ]);
    }
}
