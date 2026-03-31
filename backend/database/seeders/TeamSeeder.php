<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Team;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teams = [
            ['name' => 'Maroc', 'code' => 'ma', 'group_name' => 'Groupe A', 'rank' => 12, 'key_player' => 'Achraf Hakimi', 'image_url' => 'https://images.unsplash.com/photo-1518081461904-9d8f13635102?w=500&q=80'],
            ['name' => 'Espagne', 'code' => 'es', 'group_name' => 'Groupe G', 'rank' => 3, 'key_player' => 'Lamine Yamal', 'image_url' => 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&q=80'],
            ['name' => 'Portugal', 'code' => 'pt', 'group_name' => 'Groupe H', 'rank' => 6, 'key_player' => 'Rafael Leão', 'image_url' => 'https://images.unsplash.com/photo-1582239401768-3fa44026da73?w=500&q=80'],
            ['name' => 'Argentine', 'code' => 'ar', 'group_name' => 'Groupe B', 'rank' => 1, 'key_player' => 'Lionel Messi', 'image_url' => 'https://images.unsplash.com/photo-1589133465492-4d40026e2a2a?w=500&q=80'],
            ['name' => 'France', 'code' => 'fr', 'group_name' => 'Groupe A', 'rank' => 2, 'key_player' => 'Kylian Mbappé', 'image_url' => 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=500&q=80'],
            ['name' => 'Brésil', 'code' => 'br', 'group_name' => 'Groupe B', 'rank' => 5, 'key_player' => 'Vinicius Jr', 'image_url' => 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=500&q=80'],
            ['name' => 'Angleterre', 'code' => 'gb', 'group_name' => 'Groupe C', 'rank' => 4, 'key_player' => 'Jude Bellingham', 'image_url' => 'https://images.unsplash.com/photo-1511886929837-329f79011999?w=500&q=80'],
            ['name' => 'Allemagne', 'code' => 'de', 'group_name' => 'Groupe D', 'rank' => 16, 'key_player' => 'Jamal Musiala', 'image_url' => 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=500&q=80'],
            ['name' => 'Belgique', 'code' => 'be', 'group_name' => 'Groupe D', 'rank' => 8, 'key_player' => 'Kevin De Bruyne', 'image_url' => 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=500&q=80'],
            ['name' => 'Colombie', 'code' => 'co', 'group_name' => 'Groupe A', 'rank' => 14, 'key_player' => 'Luis Díaz', 'image_url' => 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80'],
            ['name' => 'Sénégal', 'code' => 'sn', 'group_name' => 'Groupe E', 'rank' => 20, 'key_player' => 'Sadio Mané', 'image_url' => 'https://images.unsplash.com/photo-1508344928928-7165b67de128?w=500&q=80'],
            ['name' => 'Japon', 'code' => 'jp', 'group_name' => 'Groupe A', 'rank' => 18, 'key_player' => 'Takefusa Kubo', 'image_url' => 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&q=80'],
            ['name' => 'USA', 'code' => 'us', 'group_name' => 'Groupe B', 'rank' => 13, 'key_player' => 'Christian Pulisic', 'image_url' => 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=500&q=80'],
            ['name' => 'Mexique', 'code' => 'mx', 'group_name' => 'Groupe B', 'rank' => 15, 'key_player' => 'Santiago Giménez', 'image_url' => 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=500&q=80'],
            ['name' => 'Italie', 'code' => 'it', 'group_name' => 'Groupe E', 'rank' => 9, 'key_player' => 'Federico Chiesa', 'image_url' => 'https://images.unsplash.com/photo-1559564614-a399728b70ba?w=500&q=80'],
            ['name' => 'Uruguay', 'code' => 'uy', 'group_name' => 'Groupe E', 'rank' => 11, 'key_player' => 'Darwin Núñez', 'image_url' => 'https://images.unsplash.com/photo-1510051640316-cee39563ddab?w=500&q=80'],
        ];

        foreach ($teams as $team) {
            Team::create($team);
        }
    }
}
