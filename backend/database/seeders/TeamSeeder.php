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
        Team::truncate();

        $teams = [
            [
                'name' => 'Maroc',
                'code' => 'MAR',
                'flag' => 'ma',
                'group_name' => 'Groupe A',
                'coach' => 'Walid Regragui',
                'captain' => 'Romain Saïss',
                'world_ranking' => 13,
                'world_cup_titles' => 0,
                'key_player' => 'Achraf Hakimi',
                'description' => 'Les Lions de l\'Atlas, demi-finalistes historiques en 2022, reviennent avec une équipe soudée et talentueuse pour conquérir le monde.',
                'image_url' => 'https://images.unsplash.com/photo-1597830219514-e601f029924d?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'name' => 'Argentine',
                'code' => 'ARG',
                'flag' => 'ar',
                'group_name' => 'Groupe B',
                'coach' => 'Lionel Scaloni',
                'captain' => 'Lionel Messi',
                'world_ranking' => 1,
                'world_cup_titles' => 3,
                'key_player' => 'Lionel Messi',
                'description' => 'Les champions en titre sont de retour. L\'Albiceleste, menée par le légendaire Messi, reste la nation à battre.',
                'image_url' => 'https://images.unsplash.com/photo-1589133465492-4d40026e2a2a?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'name' => 'France',
                'code' => 'FRA',
                'flag' => 'fr',
                'group_name' => 'Groupe A',
                'coach' => 'Didier Deschamps',
                'captain' => 'Kylian Mbappé',
                'world_ranking' => 2,
                'world_cup_titles' => 2,
                'key_player' => 'Kylian Mbappé',
                'description' => 'Avec une profondeur de banc inégalée et des stars mondiales, les Bleus visent une troisième étoile.',
                'image_url' => 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'name' => 'Brésil',
                'code' => 'BRA',
                'flag' => 'br',
                'group_name' => 'Groupe B',
                'coach' => 'Dorival Júnior',
                'captain' => 'Danilo',
                'world_ranking' => 5,
                'world_cup_titles' => 5,
                'key_player' => 'Vinícius Júnior',
                'description' => 'La Seleção, nation la plus titrée, cherche à mettre fin à une longue attente pour son sixième sacre mondial.',
                'image_url' => 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'name' => 'Espagne',
                'code' => 'ESP',
                'flag' => 'es',
                'group_name' => 'Groupe C',
                'coach' => 'Luis de la Fuente',
                'captain' => 'Álvaro Morata',
                'world_ranking' => 8,
                'world_cup_titles' => 1,
                'key_player' => 'Lamine Yamal',
                'description' => 'La Roja, championne d\'Europe 2024, mise sur sa nouvelle génération dorée et son jeu de possession fluide.',
                'image_url' => 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'name' => 'Allemagne',
                'code' => 'GER',
                'flag' => 'de',
                'group_name' => 'Groupe C',
                'coach' => 'Julian Nagelsmann',
                'captain' => 'Joshua Kimmich',
                'world_ranking' => 11,
                'world_cup_titles' => 4,
                'key_player' => 'Jamal Musiala',
                'description' => 'La Mannschaft, en reconstruction réussie, veut retrouver son statut de géant mondial sur le terrain.',
                'image_url' => 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'name' => 'Angleterre',
                'code' => 'ENG',
                'flag' => 'gb',
                'group_name' => 'Groupe D',
                'coach' => 'Thomas Tuchel',
                'captain' => 'Harry Kane',
                'world_ranking' => 4,
                'world_cup_titles' => 1,
                'key_player' => 'Jude Bellingham',
                'description' => 'Les Three Lions, finalistes européens, comptent sur leur armada offensive pour ramener le trophée à la maison.',
                'image_url' => 'https://images.unsplash.com/photo-1511886929837-329f79011999?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'name' => 'Portugal',
                'code' => 'POR',
                'flag' => 'pt',
                'group_name' => 'Groupe D',
                'coach' => 'Roberto Martínez',
                'captain' => 'Cristiano Ronaldo',
                'world_ranking' => 6,
                'world_cup_titles' => 0,
                'key_player' => 'Cristiano Ronaldo',
                'description' => 'Une équipe mêlant expérience de légende et jeunes prodiges, prête à marquer l\'histoire mondiale.',
                'image_url' => 'https://images.unsplash.com/photo-1582239401768-3fa44026da73?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'name' => 'Italie',
                'code' => 'ITA',
                'flag' => 'it',
                'group_name' => 'Groupe E',
                'coach' => 'Luciano Spalletti',
                'captain' => 'Gianluigi Donnarumma',
                'world_ranking' => 10,
                'world_cup_titles' => 4,
                'key_player' => 'Federico Chiesa',
                'description' => 'Après avoir manqué la dernière édition, la Squadra Azzurra revient avec une ferveur renouvelée.',
                'image_url' => 'https://images.unsplash.com/photo-1559564614-a399728b70ba?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'name' => 'Japon',
                'code' => 'JPN',
                'flag' => 'jp',
                'group_name' => 'Groupe E',
                'coach' => 'Hajime Moriyasu',
                'captain' => 'Wataru Endo',
                'world_ranking' => 18,
                'world_cup_titles' => 0,
                'key_player' => 'Takefusa Kubo',
                'description' => 'Les Samouraïs Bleus, connus pour leur discipline et leur vitesse, sont capables de renverser n\'importe quel géant.',
                'image_url' => 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'name' => 'Sénégal',
                'code' => 'SEN',
                'flag' => 'sn',
                'group_name' => 'Groupe F',
                'coach' => 'Aliou Cissé',
                'captain' => 'Kalidou Koulibaly',
                'world_ranking' => 20,
                'world_cup_titles' => 0,
                'key_player' => 'Sadio Mané',
                'description' => 'La meilleure nation africaine de ces dernières années veut porter haut les couleurs du continent.',
                'image_url' => 'https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&q=80&w=800',
            ],
            [
                'name' => 'USA',
                'code' => 'USA',
                'flag' => 'us',
                'group_name' => 'Groupe F',
                'coach' => 'Mauricio Pochettino',
                'captain' => 'Christian Pulisic',
                'world_ranking' => 16,
                'world_cup_titles' => 0,
                'key_player' => 'Christian Pulisic',
                'description' => 'En tant que co-organisatrice, la Team USA veut montrer ses progrès immenses sur la scène internationale.',
                'image_url' => 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&q=80&w=800',
            ],
        ];

        foreach ($teams as $t) {
            Team::create($t);
        }
    }
}
