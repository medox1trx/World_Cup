<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Team;
use App\Models\Joueur;
use App\Models\Group;
use Illuminate\Support\Facades\DB;

class JoueursSeeder extends Seeder
{
    // ──────────────────────────────────────────────────────────────────────────
    // SQUADS  (nom, numero, poste, buts)
    // poste values match the frontend POSTES list:
    //   Gardien | Défenseur | Milieu | Attaquant
    // ──────────────────────────────────────────────────────────────────────────
    private array $squads = [

        // ══════════════════════════════════════════════════════════════════════
        //  MOROCCO  🇲🇦
        // ══════════════════════════════════════════════════════════════════════
        'Morocco' => [
            ['nom' => 'Yassine Bounou',      'numero' => 1,  'poste' => 'Gardien',    'buts' => 0],
            ['nom' => 'Munir Mohamedi',      'numero' => 16, 'poste' => 'Gardien',    'buts' => 0],
            ['nom' => 'Anas Zniti',          'numero' => 23, 'poste' => 'Gardien',    'buts' => 0],

            ['nom' => 'Achraf Hakimi',       'numero' => 2,  'poste' => 'Défenseur',  'buts' => 2],
            ['nom' => 'Noussair Mazraoui',   'numero' => 3,  'poste' => 'Défenseur',  'buts' => 1],
            ['nom' => 'Nayef Aguerd',        'numero' => 5,  'poste' => 'Défenseur',  'buts' => 1],
            ['nom' => 'Romain Saïss',        'numero' => 6,  'poste' => 'Défenseur',  'buts' => 1],
            ['nom' => 'Yahya Attiyat Allah', 'numero' => 12, 'poste' => 'Défenseur',  'buts' => 0],
            ['nom' => 'Jawad El Yamiq',      'numero' => 15, 'poste' => 'Défenseur',  'buts' => 0],
            ['nom' => 'Adam Masina',         'numero' => 18, 'poste' => 'Défenseur',  'buts' => 0],

            ['nom' => 'Sofyan Amrabat',      'numero' => 4,  'poste' => 'Milieu',     'buts' => 0],
            ['nom' => 'Azzedine Ounahi',     'numero' => 8,  'poste' => 'Milieu',     'buts' => 1],
            ['nom' => 'Selim Amallah',       'numero' => 10, 'poste' => 'Milieu',     'buts' => 2],
            ['nom' => 'Ilias Chair',         'numero' => 17, 'poste' => 'Milieu',     'buts' => 1],
            ['nom' => 'Bilal El Khannouss',  'numero' => 20, 'poste' => 'Milieu',     'buts' => 1],
            ['nom' => 'Amine Harit',         'numero' => 22, 'poste' => 'Milieu',     'buts' => 0],

            ['nom' => 'Hakim Ziyech',        'numero' => 7,  'poste' => 'Attaquant',  'buts' => 3],
            ['nom' => 'Brahim Diaz',         'numero' => 9,  'poste' => 'Attaquant',  'buts' => 2],
            ['nom' => 'Youssef En-Nesyri',   'numero' => 11, 'poste' => 'Attaquant',  'buts' => 4],
            ['nom' => 'Abde Ezzalzouli',     'numero' => 14, 'poste' => 'Attaquant',  'buts' => 2],
            ['nom' => 'Soufiane Rahimi',     'numero' => 19, 'poste' => 'Attaquant',  'buts' => 1],
            ['nom' => 'Zakaria Aboukhlal',   'numero' => 21, 'poste' => 'Attaquant',  'buts' => 1],
            ['nom' => 'Ayoub El Kaabi',      'numero' => 13, 'poste' => 'Attaquant',  'buts' => 3],
        ],

        // ══════════════════════════════════════════════════════════════════════
        //  SPAIN  🇪🇸
        // ══════════════════════════════════════════════════════════════════════
        'Spain' => [
            ['nom' => 'Unai Simón',          'numero' => 1,  'poste' => 'Gardien',    'buts' => 0],
            ['nom' => 'David Raya',          'numero' => 13, 'poste' => 'Gardien',    'buts' => 0],
            ['nom' => 'Álex Remiro',         'numero' => 23, 'poste' => 'Gardien',    'buts' => 0],

            ['nom' => 'Dani Carvajal',       'numero' => 2,  'poste' => 'Défenseur',  'buts' => 1],
            ['nom' => 'Pau Cubarsí',         'numero' => 3,  'poste' => 'Défenseur',  'buts' => 0],
            ['nom' => 'Aymeric Laporte',     'numero' => 14, 'poste' => 'Défenseur',  'buts' => 0],
            ['nom' => 'Alejandro Grimaldo',  'numero' => 15, 'poste' => 'Défenseur',  'buts' => 1],
            ['nom' => 'Pedro Porro',         'numero' => 22, 'poste' => 'Défenseur',  'buts' => 0],
            ['nom' => 'Dani Vivian',         'numero' => 4,  'poste' => 'Défenseur',  'buts' => 0],
            ['nom' => 'Marc Cucurella',      'numero' => 18, 'poste' => 'Défenseur',  'buts' => 0],

            ['nom' => 'Rodri',               'numero' => 16, 'poste' => 'Milieu',     'buts' => 1],
            ['nom' => 'Pedri',               'numero' => 8,  'poste' => 'Milieu',     'buts' => 2],
            ['nom' => 'Gavi',                'numero' => 9,  'poste' => 'Milieu',     'buts' => 1],
            ['nom' => 'Fabián Ruiz',         'numero' => 10, 'poste' => 'Milieu',     'buts' => 2],
            ['nom' => 'Mikel Merino',        'numero' => 5,  'poste' => 'Milieu',     'buts' => 1],
            ['nom' => 'Dani Olmo',           'numero' => 7,  'poste' => 'Milieu',     'buts' => 2],

            ['nom' => 'Lamine Yamal',        'numero' => 19, 'poste' => 'Attaquant',  'buts' => 4],
            ['nom' => 'Nico Williams',       'numero' => 17, 'poste' => 'Attaquant',  'buts' => 3],
            ['nom' => 'Álvaro Morata',       'numero' => 11, 'poste' => 'Attaquant',  'buts' => 2],
            ['nom' => 'Mikel Oyarzabal',     'numero' => 6,  'poste' => 'Attaquant',  'buts' => 1],
            ['nom' => 'Joselu',              'numero' => 21, 'poste' => 'Attaquant',  'buts' => 1],
            ['nom' => 'Ferran Torres',       'numero' => 20, 'poste' => 'Attaquant',  'buts' => 1],
            ['nom' => 'Bryan Gil',           'numero' => 12, 'poste' => 'Attaquant',  'buts' => 0],
        ],

        // ══════════════════════════════════════════════════════════════════════
        //  PORTUGAL  🇵🇹
        // ══════════════════════════════════════════════════════════════════════
        'Portugal' => [
            ['nom' => 'Diogo Costa',         'numero' => 1,  'poste' => 'Gardien',    'buts' => 0],
            ['nom' => 'José Sá',             'numero' => 13, 'poste' => 'Gardien',    'buts' => 0],
            ['nom' => 'Rui Patrício',        'numero' => 12, 'poste' => 'Gardien',    'buts' => 0],

            ['nom' => 'Rúben Dias',          'numero' => 4,  'poste' => 'Défenseur',  'buts' => 1],
            ['nom' => 'João Cancelo',        'numero' => 20, 'poste' => 'Défenseur',  'buts' => 1],
            ['nom' => 'Nuno Mendes',         'numero' => 19, 'poste' => 'Défenseur',  'buts' => 0],
            ['nom' => 'Pepe',                'numero' => 3,  'poste' => 'Défenseur',  'buts' => 0],
            ['nom' => 'Danilo Pereira',      'numero' => 15, 'poste' => 'Défenseur',  'buts' => 0],
            ['nom' => 'Gonçalo Inácio',      'numero' => 5,  'poste' => 'Défenseur',  'buts' => 0],
            ['nom' => 'Diogo Dalot',         'numero' => 2,  'poste' => 'Défenseur',  'buts' => 0],

            ['nom' => 'Bruno Fernandes',     'numero' => 8,  'poste' => 'Milieu',     'buts' => 3],
            ['nom' => 'Bernardo Silva',      'numero' => 10, 'poste' => 'Milieu',     'buts' => 2],
            ['nom' => 'Vitinha',             'numero' => 16, 'poste' => 'Milieu',     'buts' => 1],
            ['nom' => 'João Neves',          'numero' => 18, 'poste' => 'Milieu',     'buts' => 1],
            ['nom' => 'Rúben Neves',         'numero' => 6,  'poste' => 'Milieu',     'buts' => 1],
            ['nom' => 'Matheus Nunes',       'numero' => 17, 'poste' => 'Milieu',     'buts' => 0],

            ['nom' => 'Cristiano Ronaldo',   'numero' => 7,  'poste' => 'Attaquant',  'buts' => 5],
            ['nom' => 'Rafael Leão',         'numero' => 11, 'poste' => 'Attaquant',  'buts' => 3],
            ['nom' => 'Gonçalo Ramos',       'numero' => 9,  'poste' => 'Attaquant',  'buts' => 3],
            ['nom' => 'Pedro Neto',          'numero' => 21, 'poste' => 'Attaquant',  'buts' => 1],
            ['nom' => 'Diogo Jota',          'numero' => 22, 'poste' => 'Attaquant',  'buts' => 2],
            ['nom' => 'Francisco Conceição', 'numero' => 23, 'poste' => 'Attaquant',  'buts' => 1],
            ['nom' => 'André Silva',         'numero' => 14, 'poste' => 'Attaquant',  'buts' => 0],
        ],
    ];

    // ──────────────────────────────────────────────────────────────────────────
    // Coach updates per team  (coach column exists on teams table)
    // ──────────────────────────────────────────────────────────────────────────
    private array $coaches = [
        'Morocco'  => 'Walid Regragui',
        'Spain'    => 'Luis de la Fuente',
        'Portugal' => 'Roberto Martínez',
    ];

    // ──────────────────────────────────────────────────────────────────────────
    // Fallback team data — used only when the team does NOT exist yet
    // (avoids FK errors when running JoueursSeeder standalone)
    // ──────────────────────────────────────────────────────────────────────────
    private array $teamFallbacks = [
        'Morocco' => [
            'confederation' => 'CAF',
            'code'          => 'MAR',
            'flag'          => 'https://flagcdn.com/w320/ma.png',
            'world_ranking' => 13,
            'world_cup_titles' => 0,
            'captain'       => 'Romain Saïss',
            'key_player'    => 'Achraf Hakimi',
            'description'   => 'Les Lions de l\'Atlas, demi-finalistes historiques en 2022.',
            'image_url'     => null,
            'hero_image'    => null,
        ],
        'Spain' => [
            'confederation' => 'UEFA',
            'code'          => 'ESP',
            'flag'          => 'https://flagcdn.com/w320/es.png',
            'world_ranking' => 8,
            'world_cup_titles' => 1,
            'captain'       => 'Álvaro Morata',
            'key_player'    => 'Lamine Yamal',
            'description'   => 'La Roja, championne d\'Europe 2024.',
            'image_url'     => null,
            'hero_image'    => null,
        ],
        'Portugal' => [
            'confederation' => 'UEFA',
            'code'          => 'POR',
            'flag'          => 'https://flagcdn.com/w320/pt.png',
            'world_ranking' => 6,
            'world_cup_titles' => 0,
            'captain'       => 'Cristiano Ronaldo',
            'key_player'    => 'Cristiano Ronaldo',
            'description'   => 'Une équipe mêlant légende et jeunes prodiges.',
            'image_url'     => null,
            'hero_image'    => null,
        ],
    ];

    // ──────────────────────────────────────────────────────────────────────────
    public function run(): void
    {
        // Ensure a group exists for fallback team creation
        $defaultGroup = Group::first();

        foreach ($this->squads as $teamName => $players) {

            // ── 1. Get or create the team ──────────────────────────────────
            $team = Team::firstOrCreate(
                ['name' => $teamName],
                array_merge(
                    $this->teamFallbacks[$teamName],
                    [
                        'coach'    => $this->coaches[$teamName],
                        'group_id' => $defaultGroup?->id,
                    ]
                )
            );

            // ── 2. Update coach name (in case team already existed) ────────
            $team->update(['coach' => $this->coaches[$teamName]]);

            $this->command->info("🟢 Team: {$teamName} (id={$team->id}) — coach updated to \"{$this->coaches[$teamName]}\"");

            // ── 3. Insert / update players ────────────────────────────────
            foreach ($players as $playerData) {
                Joueur::updateOrCreate(
                    [
                        'nom'     => $playerData['nom'],
                        'team_id' => $team->id,
                    ],
                    [
                        'numero' => $playerData['numero'],
                        'poste'  => $playerData['poste'],
                        'buts'   => $playerData['buts'],
                        'photo'  => null,  // left empty — to be filled manually
                    ]
                );

                $this->command->line("   ✅  #{$playerData['numero']} {$playerData['nom']} ({$playerData['poste']})");
            }

            $this->command->info("   → " . count($players) . " players seeded for {$teamName}.\n");
        }

        $this->command->info('✨ JoueursSeeder completed successfully!');
    }
}
