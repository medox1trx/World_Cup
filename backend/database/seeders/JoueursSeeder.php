<?php
 
namespace Database\Seeders;
 
use Illuminate\Database\Seeder;
use App\Models\Team;
use App\Models\Joueur;
use Illuminate\Support\Facades\DB;
 
class JoueursSeeder extends Seeder
{
    private array $squads = [
        'Maroc' => [
            ['name' => 'Achraf Hakimi', 'number' => 2, 'position' => 'Défenseur', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Achraf_Hakimi_%28cropped%29.jpg/500px-Achraf_Hakimi_%28cropped%29.jpg'],
            ['name' => 'Hakim Ziyech', 'number' => 7, 'position' => 'Milieu', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Hakim_Ziyech_2021.jpg'],
            ['name' => 'Youssef En-Nesyri', 'number' => 11, 'position' => 'Attaquant', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Ennesyri.jpg/500px-Ennesyri.jpg'],
            ['name' => 'Brahim Diaz', 'number' => 10, 'position' => 'Milieu', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Brahim_Diaz_2_vs_Niger_%28cropped%29_%28cropped%29.jpg/500px-Brahim_Diaz_2_vs_Niger_%28cropped%29_%28cropped%29.jpg'],
        ],
        'Espagne' => [
            ['name' => 'Lamine Yamal', 'number' => 19, 'position' => 'Attaquant', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Lamine_Yamal_in_2025.jpg/500px-Lamine_Yamal_in_2025.jpg'],
            ['name' => 'Nico Williams', 'number' => 17, 'position' => 'Attaquant', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/ATHLETIC-OSASUNA_SEMIFINAL._MAIDER_GOIKOETXEA_%28168%29_%28cropped%29.jpg/500px-ATHLETIC-OSASUNA_SEMIFINAL._MAIDER_GOIKOETXEA_%28168%29_%28cropped%29.jpg'],
            ['name' => 'Pedri', 'number' => 20, 'position' => 'Milieu', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Pedri.jpg/500px-Pedri.jpg'],
        ],
        'Portugal' => [
            ['name' => 'Cristiano Ronaldo', 'number' => 7, 'position' => 'Attaquant', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/President_Donald_Trump_meets_with_Cristiano_Ronaldo_in_the_Oval_Office_%2854933344262%29_%28cropped_and_rotated%29.jpg/500px-President_Donald_Trump_meets_with_Cristiano_Ronaldo_in_the_Oval_Office_%2854933344262%29_%28cropped_and_rotated%29.jpg'],
            ['name' => 'Bruno Fernandes', 'number' => 8, 'position' => 'Milieu', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Bruno_Fernandes_USMNT_v_Portugal_Mar_31_2026-27_%28cropped%29.jpg/500px-Bruno_Fernandes_USMNT_v_Portugal_Mar_31_2026-27_%28cropped%29.jpg'],
            ['name' => 'Rafael Leão', 'number' => 17, 'position' => 'Attaquant', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/0/02/RafaelLe%C3%A3oPortugal23.jpg'],
        ],
        'France' => [
            ['name' => 'Kylian Mbappé', 'number' => 10, 'position' => 'Attaquant', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Picture_with_Mbapp%C3%A9_%28cropped_and_rotated%29.jpg/500px-Picture_with_Mbapp%C3%A9_%28cropped_and_rotated%29.jpg'],
            ['name' => 'Antoine Griezmann', 'number' => 7, 'position' => 'Attaquant', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/FRA-ARG_%2810%29_%28cropped%29.jpg/500px-FRA-ARG_%2810%29_%28cropped%29.jpg'],
            ['name' => 'Ousmane Dembélé', 'number' => 11, 'position' => 'Attaquant', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Ousmane_Demb%C3%A9l%C3%A9_2018_%28cropped%29.jpg'],
        ],
        'Argentine' => [
            ['name' => 'Lionel Messi', 'number' => 10, 'position' => 'Attaquant', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Lionel_Messi_White_House_2026_%283x4_cropped%29.jpg/500px-Lionel_Messi_White_House_2026_%283x4_cropped%29.jpg'],
            ['name' => 'Julián Álvarez', 'number' => 9, 'position' => 'Attaquant', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Juli%C3%A1n_%C3%81lvarez_%28cropped%29.jpg/500px-Juli%C3%A1n_%C3%81lvarez_%28cropped%29.jpg'],
            ['name' => 'Alexis Mac Allister', 'number' => 20, 'position' => 'Milieu', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Alexis_Mac_Allister_04012026_%281%29.jpg/500px-Alexis_Mac_Allister_04012026_%281%29.jpg'],
        ],
        'Angleterre' => [
            ['name' => 'Harry Kane', 'number' => 9, 'position' => 'Attaquant', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Harry_Kane_on_October_10%2C_2023.jpg/500px-Harry_Kane_on_October_10%2C_2023.jpg'],
            ['name' => 'Jude Bellingham', 'number' => 10, 'position' => 'Milieu', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/25th_Laureus_World_Sports_Awards_-_Red_Carpet_-_Jude_Bellingham_-_240422_190551-2_%28cropped%29.jpg/500px-25th_Laureus_World_Sports_Awards_-_Red_Carpet_-_Jude_Bellingham_-_240422_190551-2_%28cropped%29.jpg'],
            ['name' => 'Bukayo Saka', 'number' => 7, 'position' => 'Attaquant', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/1_bukayo_saka_arsenal_2025_%28cropped%29.jpg/500px-1_bukayo_saka_arsenal_2025_%28cropped%29.jpg'],
        ],
        'Brésil' => [
            ['name' => 'Vinícius Júnior', 'number' => 7, 'position' => 'Attaquant', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/2023_05_06_Final_de_la_Copa_del_Rey_-_52879242230_%28cropped%29.jpg/500px-2023_05_06_Final_de_la_Copa_del_Rey_-_52879242230_%28cropped%29.jpg'],
            ['name' => 'Rodrygo', 'number' => 10, 'position' => 'Attaquant', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Rodrygo_2023_%28cropped%29.jpg/500px-Rodrygo_2023_%28cropped%29.jpg'],
            ['name' => 'Endrick', 'number' => 9, 'position' => 'Attaquant', 'goals' => 0, 'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Endrick-Palmeiras-Liverpool-abr24.jpg/500px-Endrick-Palmeiras-Liverpool-abr24.jpg'],
        ],
    ];

    public function run(): void
    {
        foreach ($this->squads as $teamName => $players) {
            $team = Team::where('name', $teamName)->first();
            if (!$team) continue;

            foreach ($players as $playerData) {
                Joueur::updateOrCreate(
                    ['name' => $playerData['name'], 'team_id' => $team->id],
                    [
                        'number' => $playerData['number'],
                        'position' => $playerData['position'],
                        'goals' => $playerData['goals'],
                        'photo' => $playerData['photo'],
                        'country_id' => $team->country_id,
                    ]
                );
            }
        }
    }
}
