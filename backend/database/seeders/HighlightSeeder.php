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
            'title' => 'Maroc vs Portugal - Qualifs 2026',
            'image_url' => 'https://i.ytimg.com/vi/kO-r4xSmbN0/maxresdefault.jpg',
            'video_url' => 'https://www.youtube.com/watch?v=kO-r4xSmbN0',
            'duration' => '10:32',
            'category' => 'Match de Légende',
            'views' => 2400000,
            'likes' => 150000,
            'status' => 'published'
        ]);

        \App\Models\Highlight::create([
            'title' => 'Top 10 : Plus beaux buts de l\'histoire',
            'image_url' => 'https://www.soccer.com/wcm/connect/b41c5002-4568-47e2-a64c-dad7a03f66ea/1/10goalsCR7.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-b41c5002-4568-47e2-a64c-dad7a03f66ea/1-m-BdXvb',
            'video_url' => 'https://www.youtube.com/watch?v=0mHZcc65iKc',
            'duration' => '10:15',
            'category' => 'Compilations',
            'views' => 5100000,
            'likes' => 420000,
            'status' => 'published'
        ]);

        \App\Models\Highlight::create([
            'title' => 'Ambiance : Les supporters à Casablanca',
            'image_url' => 'https://sport.le360.ma/resizer/v2/QEYZPVRLUBB2TM3JSH6723OTT4.JPG?auth=059839b3fd1c43b07e4458f049fb61a541107239e4c4af13c2cab2dfdd8ef43c&smart=true&width=1216&height=684',
            'video_url' => 'https://www.youtube.com/watch?v=tom7qCL2t-A',
            'duration' => '6:40',
            'category' => 'Fan Experience',
            'views' => 850000,
            'likes' => 92000,
            'status' => 'published'
        ]);
        
        \App\Models\Highlight::create([
          'title' => 'Finale 2026 : Le sacre historique',
          'image_url' => 'https://e85ty3xsocd.exactdn.com/uploads/2026/01/15014222/La-selection-marocaine-lors-du-match-Maroc-Nigeria-de-la-CAN-2025-Le-14-janvier-2026-Rabat-%C2%A9-Ayoub-Jouadi-LeBrief.jpeg',
          'video_url' => 'https://www.youtube.com/watch?v=BkzSfAIfqns&t=0s',
          'duration' => '15:20',
          'category' => 'Match de Légende',
          'views' => 12500000,
          'likes' => 890000,
          'status' => 'published'
        ]);
    }
}
