<?php
 
namespace Database\Seeders;
 
use Illuminate\Database\Seeder;
use App\Models\Team;
use App\Models\Joueur;
use Illuminate\Support\Facades\DB;
 
class JoueursSeeder extends Seeder
{
    private array $squads = [
        'Morocco' => [
            ['name' => 'Achraf Hakimi', 'number' => 2, 'position' => 'Défenseur', 'goals' => 2],
            ['name' => 'Hakim Ziyech', 'number' => 7, 'position' => 'Attaquant', 'goals' => 3],
            ['name' => 'Youssef En-Nesyri', 'number' => 11, 'position' => 'Attaquant', 'goals' => 4],
            ['name' => 'Brahim Diaz', 'number' => 9, 'position' => 'Attaquant', 'goals' => 2],
        ],
        'Spain' => [
            ['name' => 'Lamine Yamal', 'number' => 19, 'position' => 'Attaquant', 'goals' => 4],
            ['name' => 'Nico Williams', 'number' => 17, 'position' => 'Attaquant', 'goals' => 3],
            ['name' => 'Pedri', 'number' => 8, 'position' => 'Milieu', 'goals' => 2],
        ],
        'Portugal' => [
            ['name' => 'Cristiano Ronaldo', 'number' => 7, 'position' => 'Attaquant', 'goals' => 5],
            ['name' => 'Bruno Fernandes', 'number' => 8, 'position' => 'Milieu', 'goals' => 3],
            ['name' => 'Rafael Leão', 'number' => 11, 'position' => 'Attaquant', 'goals' => 3],
        ],
        'France' => [
            ['name' => 'Kylian Mbappé', 'number' => 10, 'position' => 'Attaquant', 'goals' => 6],
            ['name' => 'Antoine Griezmann', 'number' => 7, 'position' => 'Milieu', 'goals' => 2],
            ['name' => 'Ousmane Dembélé', 'number' => 11, 'position' => 'Attaquant', 'goals' => 1],
        ],
        'Argentina' => [
            ['name' => 'Lionel Messi', 'number' => 10, 'position' => 'Attaquant', 'goals' => 5],
            ['name' => 'Julián Álvarez', 'number' => 9, 'position' => 'Attaquant', 'goals' => 4],
            ['name' => 'Alexis Mac Allister', 'number' => 20, 'position' => 'Milieu', 'goals' => 2],
        ],
        'England' => [
            ['name' => 'Harry Kane', 'number' => 9, 'position' => 'Attaquant', 'goals' => 5],
            ['name' => 'Jude Bellingham', 'number' => 10, 'position' => 'Milieu', 'goals' => 3],
            ['name' => 'Bukayo Saka', 'number' => 7, 'position' => 'Attaquant', 'goals' => 2],
        ],
        'Brazil' => [
            ['name' => 'Vinícius Júnior', 'number' => 7, 'position' => 'Attaquant', 'goals' => 4],
            ['name' => 'Rodrygo', 'number' => 10, 'position' => 'Attaquant', 'goals' => 3],
            ['name' => 'Endrick', 'number' => 9, 'position' => 'Attaquant', 'goals' => 2],
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
                        'country_id' => $team->country_id,
                    ]
                );
            }
        }
    }
}
