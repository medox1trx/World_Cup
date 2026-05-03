<?php

namespace Database\Seeders;

use App\Models\FootballMatch;
use App\Models\Team;
use App\Models\Stadium;
use App\Models\Ville;
use Illuminate\Database\Seeder;

class MatchesSeeder extends Seeder
{
    // Each entry: [team1, team2, date, time, group, stage, stadium, city]
    private array $matches = [
        // ── GROUP STAGE ───────────────────────────────────────────────
        // June 11
        ['Mexique','Afrique du Sud','2026-06-11','20:00','Groupe A','group','Estadio Azteca','Mexico City'],
        // June 12
        ['République de Corée','Tchéquie','2026-06-12','03:00','Groupe A','group','Estadio Akron','Guadalajara'],
        ['Canada','Bosnie-et-Herzégovine','2026-06-12','20:00','Groupe B','group','BMO Field','Toronto'],
        // June 13
        ['États-Unis','Paraguay','2026-06-13','02:00','Groupe D','group','SoFi Stadium','Los Angeles'],
        ['Qatar','Suisse','2026-06-13','20:00','Groupe B','group','Levi\'s Stadium','San Francisco Bay Area'],
        ['Brésil','Maroc','2026-06-13','23:00','Groupe C','group','MetLife Stadium','New York/New Jersey'],
        // June 14
        ['Haïti','Écosse','2026-06-14','02:00','Groupe C','group','Gillette Stadium','Boston'],
        ['Australie','Turquie','2026-06-14','05:00','Groupe D','group','BC Place','Vancouver'],
        ['Allemagne','Curaçao','2026-06-14','18:00','Groupe E','group','NRG Stadium','Houston'],
        ['Pays-Bas','Japon','2026-06-14','21:00','Groupe F','group','AT&T Stadium','Dallas'],
        // June 15
        ['Côte d\'Ivoire','Équateur','2026-06-15','00:00','Groupe E','group','Lincoln Financial Field','Philadelphia'],
        ['Suède','Tunisie','2026-06-15','03:00','Groupe F','group','Estadio BBVA','Monterrey'],
        ['Espagne','Cap-Vert','2026-06-15','17:00','Groupe H','group','Mercedes-Benz Stadium','Atlanta'],
        ['Belgique','Égypte','2026-06-15','20:00','Groupe G','group','Lumen Field','Seattle'],
        ['Arabie saoudite','Uruguay','2026-06-15','23:00','Groupe H','group','Hard Rock Stadium','Miami'],
        // June 16
        ['RI Iran','Nouvelle-Zélande','2026-06-16','02:00','Groupe G','group','SoFi Stadium','Los Angeles'],
        ['France','Sénégal','2026-06-16','20:00','Groupe I','group','MetLife Stadium','New York/New Jersey'],
        ['Irak','Norvège','2026-06-16','23:00','Groupe I','group','Gillette Stadium','Boston'],
        // June 17
        ['Argentine','Algérie','2026-06-17','02:00','Groupe J','group','Arrowhead Stadium','Kansas City'],
        ['Autriche','Jordanie','2026-06-17','05:00','Groupe J','group','Levi\'s Stadium','San Francisco Bay Area'],
        ['Portugal','RD Congo','2026-06-17','18:00','Groupe K','group','NRG Stadium','Houston'],
        ['Angleterre','Croatie','2026-06-17','21:00','Groupe L','group','AT&T Stadium','Dallas'],
        // June 18
        ['Ghana','Panamá','2026-06-18','00:00','Groupe L','group','BMO Field','Toronto'],
        ['Ouzbékistan','Colombie','2026-06-18','03:00','Groupe K','group','Estadio Azteca','Mexico City'],
        ['Tchéquie','Afrique du Sud','2026-06-18','17:00','Groupe A','group','Mercedes-Benz Stadium','Atlanta'],
        ['Suisse','Bosnie-et-Herzégovine','2026-06-18','20:00','Groupe B','group','SoFi Stadium','Los Angeles'],
        ['Canada','Qatar','2026-06-18','23:00','Groupe B','group','BC Place','Vancouver'],
        // June 19
        ['Mexique','République de Corée','2026-06-19','02:00','Groupe A','group','Estadio Akron','Guadalajara'],
        ['États-Unis','Australie','2026-06-19','20:00','Groupe D','group','Lumen Field','Seattle'],
        ['Écosse','Maroc','2026-06-19','23:00','Groupe C','group','Gillette Stadium','Boston'],
        // June 20
        ['Brésil','Haïti','2026-06-20','01:30','Groupe C','group','Lincoln Financial Field','Philadelphia'],
        ['Turquie','Paraguay','2026-06-20','04:00','Groupe D','group','Levi\'s Stadium','San Francisco Bay Area'],
        ['Pays-Bas','Suède','2026-06-20','18:00','Groupe F','group','NRG Stadium','Houston'],
        ['Allemagne','Côte d\'Ivoire','2026-06-20','21:00','Groupe E','group','BMO Field','Toronto'],
        // June 21
        ['Équateur','Curaçao','2026-06-21','01:00','Groupe E','group','Arrowhead Stadium','Kansas City'],
        ['Tunisie','Japon','2026-06-21','05:00','Groupe F','group','Estadio BBVA','Monterrey'],
        ['Espagne','Arabie saoudite','2026-06-21','17:00','Groupe H','group','Mercedes-Benz Stadium','Atlanta'],
        ['Belgique','RI Iran','2026-06-21','20:00','Groupe G','group','SoFi Stadium','Los Angeles'],
        ['Uruguay','Cap-Vert','2026-06-21','23:00','Groupe H','group','Hard Rock Stadium','Miami'],
        // June 22
        ['Nouvelle-Zélande','Égypte','2026-06-22','02:00','Groupe G','group','BC Place','Vancouver'],
        ['Argentine','Autriche','2026-06-22','18:00','Groupe J','group','AT&T Stadium','Dallas'],
        ['France','Irak','2026-06-22','22:00','Groupe I','group','Lincoln Financial Field','Philadelphia'],
        // June 23
        ['Norvège','Sénégal','2026-06-23','01:00','Groupe I','group','MetLife Stadium','New York/New Jersey'],
        ['Jordanie','Algérie','2026-06-23','04:00','Groupe J','group','Levi\'s Stadium','San Francisco Bay Area'],
        ['Portugal','Ouzbékistan','2026-06-23','18:00','Groupe K','group','NRG Stadium','Houston'],
        ['Angleterre','Ghana','2026-06-23','21:00','Groupe L','group','Gillette Stadium','Boston'],
        // June 24
        ['Panamá','Croatie','2026-06-24','00:00','Groupe L','group','BMO Field','Toronto'],
        ['Colombie','RD Congo','2026-06-24','03:00','Groupe K','group','Estadio Akron','Guadalajara'],
        ['Suisse','Canada','2026-06-24','20:00','Groupe B','group','BC Place','Vancouver'],
        ['Bosnie-et-Herzégovine','Qatar','2026-06-24','20:00','Groupe B','group','Lumen Field','Seattle'],
        ['Écosse','Brésil','2026-06-24','23:00','Groupe C','group','Hard Rock Stadium','Miami'],
        ['Maroc','Haïti','2026-06-24','23:00','Groupe C','group','Mercedes-Benz Stadium','Atlanta'],
        // June 25
        ['Tchéquie','Mexique','2026-06-25','02:00','Groupe A','group','Estadio Azteca','Mexico City'],
        ['Afrique du Sud','République de Corée','2026-06-25','02:00','Groupe A','group','Estadio BBVA','Monterrey'],
        ['Curaçao','Côte d\'Ivoire','2026-06-25','21:00','Groupe E','group','Lincoln Financial Field','Philadelphia'],
        ['Équateur','Allemagne','2026-06-25','21:00','Groupe E','group','MetLife Stadium','New York/New Jersey'],
        // June 26
        ['Japon','Suède','2026-06-26','00:00','Groupe F','group','AT&T Stadium','Dallas'],
        ['Tunisie','Pays-Bas','2026-06-26','00:00','Groupe F','group','Arrowhead Stadium','Kansas City'],
        ['Turquie','États-Unis','2026-06-26','03:00','Groupe D','group','SoFi Stadium','Los Angeles'],
        ['Paraguay','Australie','2026-06-26','03:00','Groupe D','group','Levi\'s Stadium','San Francisco Bay Area'],
        ['Norvège','France','2026-06-26','20:00','Groupe I','group','Gillette Stadium','Boston'],
        ['Sénégal','Irak','2026-06-26','20:00','Groupe I','group','BMO Field','Toronto'],
        // June 27
        ['Cap-Vert','Arabie saoudite','2026-06-27','01:00','Groupe H','group','NRG Stadium','Houston'],
        ['Uruguay','Espagne','2026-06-27','01:00','Groupe H','group','Estadio Akron','Guadalajara'],
        ['Égypte','RI Iran','2026-06-27','04:00','Groupe G','group','Lumen Field','Seattle'],
        ['Nouvelle-Zélande','Belgique','2026-06-27','04:00','Groupe G','group','BC Place','Vancouver'],
        ['Panamá','Angleterre','2026-06-27','22:00','Groupe L','group','MetLife Stadium','New York/New Jersey'],
        ['Croatie','Ghana','2026-06-27','22:00','Groupe L','group','Lincoln Financial Field','Philadelphia'],
        // June 28
        ['Colombie','Portugal','2026-06-28','00:30','Groupe K','group','Hard Rock Stadium','Miami'],
        ['RD Congo','Ouzbékistan','2026-06-28','00:30','Groupe K','group','Mercedes-Benz Stadium','Atlanta'],
        ['Algérie','Autriche','2026-06-28','03:00','Groupe J','group','Arrowhead Stadium','Kansas City'],
        ['Jordanie','Argentine','2026-06-28','03:00','Groupe J','group','AT&T Stadium','Dallas'],

        // ── ROUND OF 32 (Seizièmes) ───────────────────────────────────
        ['2A','2B','2026-06-28','20:00',null,'round_of_32','SoFi Stadium','Los Angeles'],
        ['1C','2F','2026-06-29','18:00',null,'round_of_32','NRG Stadium','Houston'],
        ['1E','3ABCDF','2026-06-29','21:30',null,'round_of_32','Gillette Stadium','Boston'],
        ['1F','2C','2026-06-30','02:00',null,'round_of_32','Estadio BBVA','Monterrey'],
        ['2E','2I','2026-06-30','18:00',null,'round_of_32','AT&T Stadium','Dallas'],
        ['1I','3CDFGH','2026-06-30','22:00',null,'round_of_32','MetLife Stadium','New York/New Jersey'],
        ['1A','3CEFHI','2026-07-01','02:00',null,'round_of_32','Estadio Azteca','Mexico City'],
        ['1L','3EHIJK','2026-07-01','17:00',null,'round_of_32','Mercedes-Benz Stadium','Atlanta'],
        ['1G','3AEHIJ','2026-07-01','21:00',null,'round_of_32','Lumen Field','Seattle'],
        ['1D','3BEFIJ','2026-07-02','01:00',null,'round_of_32','Levi\'s Stadium','San Francisco Bay Area'],
        ['1H','2J','2026-07-02','20:00',null,'round_of_32','SoFi Stadium','Los Angeles'],
        ['2K','2L','2026-07-03','00:00',null,'round_of_32','BMO Field','Toronto'],
        ['1B','3EFGIJ','2026-07-03','04:00',null,'round_of_32','BC Place','Vancouver'],
        ['2D','2G','2026-07-03','19:00',null,'round_of_32','AT&T Stadium','Dallas'],
        ['1J','2H','2026-07-03','23:00',null,'round_of_32','Hard Rock Stadium','Miami'],
        ['1K','3DEIJL','2026-07-04','02:30',null,'round_of_32','Arrowhead Stadium','Kansas City'],

        // ── ROUND OF 16 (Huitièmes) ────────────────────────────────────
        ['W73','W75','2026-07-04','18:00',null,'round_of_16','NRG Stadium','Houston'],
        ['W74','W77','2026-07-04','22:00',null,'round_of_16','Lincoln Financial Field','Philadelphia'],
        ['W76','W78','2026-07-05','21:00',null,'round_of_16','MetLife Stadium','New York/New Jersey'],
        ['W79','W80','2026-07-06','01:00',null,'round_of_16','Estadio Azteca','Mexico City'],
        ['W83','W84','2026-07-06','20:00',null,'round_of_16','AT&T Stadium','Dallas'],
        ['W81','W82','2026-07-07','01:00',null,'round_of_16','Lumen Field','Seattle'],
        ['W86','W88','2026-07-07','17:00',null,'round_of_16','Mercedes-Benz Stadium','Atlanta'],
        ['W85','W87','2026-07-07','21:00',null,'round_of_16','BC Place','Vancouver'],

        // ── QUARTER FINALS ─────────────────────────────────────────────
        ['W89','W90','2026-07-09','21:00',null,'quarter_final','Gillette Stadium','Boston'],
        ['W93','W94','2026-07-10','20:00',null,'quarter_final','SoFi Stadium','Los Angeles'],
        ['W91','W92','2026-07-11','22:00',null,'quarter_final','Hard Rock Stadium','Miami'],
        ['W95','W96','2026-07-12','02:00',null,'quarter_final','Arrowhead Stadium','Kansas City'],

        // ── SEMI FINALS ────────────────────────────────────────────────
        ['W97','W98','2026-07-14','20:00',null,'semi_final','AT&T Stadium','Dallas'],
        ['W99','W100','2026-07-15','20:00',null,'semi_final','Mercedes-Benz Stadium','Atlanta'],

        // ── THIRD PLACE ────────────────────────────────────────────────
        ['RU101','RU102','2026-07-18','22:00',null,'third_place','Hard Rock Stadium','Miami'],

        // ── FINAL ──────────────────────────────────────────────────────
        ['W101','W102','2026-07-19','20:00',null,'final','MetLife Stadium','New York/New Jersey'],
    ];

    // Map French/display names → DB team name variants
    private function findTeam(string $name): ?\App\Models\Team
    {
        // Direct match first
        $t = Team::where('name', $name)->first();
        if ($t) return $t;

        // Try case-insensitive
        $t = Team::whereRaw('LOWER(name) = ?', [strtolower($name)])->first();
        if ($t) return $t;

        // French → English common aliases
        $aliases = [
            'Mexique'               => ['Mexico'],
            'Afrique du Sud'        => ['South Africa'],
            'République de Corée'   => ['South Korea','Korea Republic'],
            'Tchéquie'              => ['Czech Republic','Czechia'],
            'Bosnie-et-Herzégovine' => ['Bosnia and Herzegovina','Bosnia'],
            'États-Unis'            => ['USA','United States'],
            'Brésil'                => ['Brazil'],
            'Haïti'                 => ['Haiti'],
            'Écosse'                => ['Scotland'],
            'Australie'             => ['Australia'],
            'Turquie'               => ['Turkey'],
            'Allemagne'             => ['Germany'],
            'Curaçao'               => ['Curacao'],
            'Pays-Bas'              => ['Netherlands','Holland'],
            'Japon'                 => ['Japan'],
            'Côte d\'Ivoire'        => ['Ivory Coast',"Cote d'Ivoire"],
            'Équateur'              => ['Ecuador'],
            'Suède'                 => ['Sweden'],
            'Tunisie'               => ['Tunisia'],
            'Espagne'               => ['Spain'],
            'Cap-Vert'              => ['Cape Verde'],
            'Belgique'              => ['Belgium'],
            'Égypte'                => ['Egypt'],
            'Arabie saoudite'       => ['Saudi Arabia'],
            'RI Iran'               => ['Iran'],
            'Nouvelle-Zélande'      => ['New Zealand'],
            'France'                => ['France'],
            'Sénégal'               => ['Senegal'],
            'Irak'                  => ['Iraq'],
            'Norvège'               => ['Norway'],
            'Argentine'             => ['Argentina'],
            'Algérie'               => ['Algeria'],
            'Autriche'              => ['Austria'],
            'Jordanie'              => ['Jordan'],
            'Portugal'              => ['Portugal'],
            'RD Congo'              => ['DR Congo','Congo DR'],
            'Angleterre'            => ['England'],
            'Croatie'               => ['Croatia'],
            'Ghana'                 => ['Ghana'],
            'Ouzbékistan'           => ['Uzbekistan'],
            'Colombie'              => ['Colombia'],
            'Panamá'                => ['Panama'],
            'Maroc'                 => ['Morocco'],
        ];

        if (isset($aliases[$name])) {
            foreach ($aliases[$name] as $alias) {
                $t = Team::whereRaw('LOWER(name) = ?', [strtolower($alias)])->first();
                if ($t) return $t;
            }
        }

        return null;
    }

    private function findStadium(string $name): ?\App\Models\Stadium
    {
        return Stadium::where('name', 'like', '%' . explode(' ', $name)[0] . '%')->first();
    }

    private function findCity(string $name): ?\App\Models\Ville
    {
        return Ville::where('name', 'like', '%' . $name . '%')->first()
            ?? Ville::whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($name) . '%'])->first();
    }

    public function run(): void
    {
        foreach ($this->matches as $m) {
            [$t1name, $t2name, $date, $time, $group, $stage, $stadiumName, $cityName] = $m;

            $team1   = $this->findTeam($t1name);
            $team2   = $this->findTeam($t2name);
            $stadium = $this->findStadium($stadiumName);
            $city    = $this->findCity($cityName);

            FootballMatch::updateOrCreate(
                [
                    'match_date' => $date,
                    'match_time' => $time . ':00',
                    'home_team'  => $t1name,  // text fallback for uniqueness
                    'away_team'  => $t2name,
                ],
                [
                    'team1_id'   => $team1?->id,
                    'team2_id'   => $team2?->id,
                    'stadium_id' => $stadium?->id,
                    'city_id'    => $city?->id,
                    'venue'      => $stadiumName,
                    'city'       => $cityName,
                    'city_name'  => $cityName,
                    'group_name' => $group,
                    'stage'      => $stage,
                    'status'     => 'upcoming',
                    'home_score' => null,
                    'away_score' => null,
                ]
            );
        }

        $this->command->info('✅ Seeded ' . count($this->matches) . ' matches successfully.');
    }
}
