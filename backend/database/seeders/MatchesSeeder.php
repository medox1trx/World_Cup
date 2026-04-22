<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FootballMatch;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class MatchesSeeder extends Seeder
{
    public function run()
    {
        // Nettoyer la table avant de peupler
        DB::table('matches')->truncate();

        $matches = [
            // ════════════════════════════════
            // JOURNÉE 1 (June 11–17)
            // ════════════════════════════════

            // ── GROUPE A ──
            [
                'group_name' => 'Groupe A', 'home_team' => 'Mexique', 'home_flag' => '🇲🇽', 'away_team' => 'Afrique du Sud', 'away_flag' => '🇿🇦',
                'match_date' => '2026-06-11', 'match_time' => '21:00', 'venue' => 'Estadio Azteca', 'city' => 'Mexico City', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe A', 'home_team' => 'Corée du Sud', 'home_flag' => '🇰🇷', 'away_team' => 'Tchéquie', 'away_flag' => '🇨🇿',
                'match_date' => '2026-06-11', 'match_time' => '04:00', 'venue' => 'Estadio Akron', 'city' => 'Guadalajara', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE B ──
            [
                'group_name' => 'Groupe B', 'home_team' => 'Canada', 'home_flag' => '🇨🇦', 'away_team' => 'Bosnie-Herzégovine', 'away_flag' => '🇧🇦',
                'match_date' => '2026-06-12', 'match_time' => '21:00', 'venue' => 'BMO Field', 'city' => 'Toronto', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe B', 'home_team' => 'Qatar', 'home_flag' => '🇶🇦', 'away_team' => 'Suisse', 'away_flag' => '🇨🇭',
                'match_date' => '2026-06-13', 'match_time' => '21:00', 'venue' => "Levi's Stadium", 'city' => 'Santa Clara', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE C ──
            [
                'group_name' => 'Groupe C', 'home_team' => 'Brésil', 'home_flag' => '🇧🇷', 'away_team' => 'Maroc', 'away_flag' => '🇲🇦',
                'match_date' => '2026-06-13', 'match_time' => '00:00', 'venue' => 'MetLife Stadium', 'city' => 'East Rutherford', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe C', 'home_team' => 'Haïti', 'home_flag' => '🇭🇹', 'away_team' => 'Écosse', 'away_flag' => '🏴',
                'match_date' => '2026-06-13', 'match_time' => '03:00', 'venue' => 'Gillette Stadium', 'city' => 'Boston', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE D ──
            [
                'group_name' => 'Groupe D', 'home_team' => 'USA', 'home_flag' => '🇺🇸', 'away_team' => 'Paraguay', 'away_flag' => '🇵🇾',
                'match_date' => '2026-06-12', 'match_time' => '03:00', 'venue' => 'SoFi Stadium', 'city' => 'Los Angeles', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe D', 'home_team' => 'Australie', 'home_flag' => '🇦🇺', 'away_team' => 'Turquie', 'away_flag' => '🇹🇷',
                'match_date' => '2026-06-14', 'match_time' => '06:00', 'venue' => 'BC Place', 'city' => 'Vancouver', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE E ──
            [
                'group_name' => 'Groupe E', 'home_team' => 'Allemagne', 'home_flag' => '🇩🇪', 'away_team' => 'Curaçao', 'away_flag' => '🇨🇼',
                'match_date' => '2026-06-14', 'match_time' => '19:00', 'venue' => 'NRG Stadium', 'city' => 'Houston', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe E', 'home_team' => "Côte d'Ivoire", 'home_flag' => '🇨🇮', 'away_team' => 'Équateur', 'away_flag' => '🇪🇨',
                'match_date' => '2026-06-14', 'match_time' => '01:00', 'venue' => 'Lincoln Financial Field', 'city' => 'Philadelphie', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE F ──
            [
                'group_name' => 'Groupe F', 'home_team' => 'Pays-Bas', 'home_flag' => '🇳🇱', 'away_team' => 'Japon', 'away_flag' => '🇯🇵',
                'match_date' => '2026-06-14', 'match_time' => '22:00', 'venue' => 'AT&T Stadium', 'city' => 'Dallas', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe F', 'home_team' => 'Tunisie', 'home_flag' => '🇹🇳', 'away_team' => 'Suède', 'away_flag' => '🇸🇪',
                'match_date' => '2026-06-15', 'match_time' => '04:00', 'venue' => 'Estadio BBVA', 'city' => 'Monterrey', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE G ──
            [
                'group_name' => 'Groupe G', 'home_team' => 'Belgique', 'home_flag' => '🇧🇪', 'away_team' => 'Égypte', 'away_flag' => '🇪🇬',
                'match_date' => '2026-06-15', 'match_time' => '21:00', 'venue' => 'Lumen Field', 'city' => 'Seattle', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe G', 'home_team' => 'Iran', 'home_flag' => '🇮🇷', 'away_team' => 'Nouvelle-Zélande', 'away_flag' => '🇳🇿',
                'match_date' => '2026-06-16', 'match_time' => '03:00', 'venue' => 'SoFi Stadium', 'city' => 'Los Angeles', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE H ──
            [
                'group_name' => 'Groupe H', 'home_team' => 'Espagne', 'home_flag' => '🇪🇸', 'away_team' => 'Cap-Vert', 'away_flag' => '🇨🇻',
                'match_date' => '2026-06-15', 'match_time' => '18:00', 'venue' => 'Mercedes-Benz Stadium', 'city' => 'Atlanta', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe H', 'home_team' => 'Arabie Saoudite', 'home_flag' => '🇸🇦', 'away_team' => 'Uruguay', 'away_flag' => '🇺🇾',
                'match_date' => '2026-06-16', 'match_time' => '00:00', 'venue' => 'Hard Rock Stadium', 'city' => 'Miami', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE I ──
            [
                'group_name' => 'Groupe I', 'home_team' => 'France', 'home_flag' => '🇫🇷', 'away_team' => 'Sénégal', 'away_flag' => '🇸🇳',
                'match_date' => '2026-06-16', 'match_time' => '21:00', 'venue' => 'MetLife Stadium', 'city' => 'East Rutherford', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe I', 'home_team' => 'Norvège', 'home_flag' => '🇳🇴', 'away_team' => 'Irak', 'away_flag' => '🇮🇶',
                'match_date' => '2026-06-17', 'match_time' => '00:00', 'venue' => 'Gillette Stadium', 'city' => 'Boston', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE J ──
            [
                'group_name' => 'Groupe J', 'home_team' => 'Argentine', 'home_flag' => '🇦🇷', 'away_team' => 'Algérie', 'away_flag' => '🇩🇿',
                'match_date' => '2026-06-17', 'match_time' => '03:00', 'venue' => 'Arrowhead Stadium', 'city' => 'Kansas City', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe J', 'home_team' => 'Autriche', 'home_flag' => '🇦🇹', 'away_team' => 'Jordanie', 'away_flag' => '🇯🇴',
                'match_date' => '2026-06-17', 'match_time' => '06:00', 'venue' => "Levi's Stadium", 'city' => 'Santa Clara', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE K ──
            [
                'group_name' => 'Groupe K', 'home_team' => 'Portugal', 'home_flag' => '🇵🇹', 'away_team' => 'RD Congo', 'away_flag' => '🇨🇩',
                'match_date' => '2026-06-17', 'match_time' => '19:00', 'venue' => 'NRG Stadium', 'city' => 'Houston', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe K', 'home_team' => 'Ouzbékistan', 'home_flag' => '🇺🇿', 'away_team' => 'Colombie', 'away_flag' => '🇨🇴',
                'match_date' => '2026-06-18', 'match_time' => '04:00', 'venue' => 'Estadio Azteca', 'city' => 'Mexico City', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE L ──
            [
                'group_name' => 'Groupe L', 'home_team' => 'Angleterre', 'home_flag' => '🏴', 'away_team' => 'Croatie', 'away_flag' => '🇭🇷',
                'match_date' => '2026-06-17', 'match_time' => '22:00', 'venue' => 'AT&T Stadium', 'city' => 'Dallas', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe L', 'home_team' => 'Ghana', 'home_flag' => '🇬🇭', 'away_team' => 'Panama', 'away_flag' => '🇵🇦',
                'match_date' => '2026-06-18', 'match_time' => '01:00', 'venue' => 'BMO Field', 'city' => 'Toronto', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ════════════════════════════════
            // JOURNÉE 2 (June 18–23)
            // ════════════════════════════════

            // ── GROUPE A ──
            [
                'group_name' => 'Groupe A', 'home_team' => 'Afrique du Sud', 'home_flag' => '🇿🇦', 'away_team' => 'Tchéquie', 'away_flag' => '🇨🇿',
                'match_date' => '2026-06-18', 'match_time' => '18:00', 'venue' => 'Mercedes-Benz Stadium', 'city' => 'Atlanta', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe A', 'home_team' => 'Mexique', 'home_flag' => '🇲🇽', 'away_team' => 'Corée du Sud', 'away_flag' => '🇰🇷',
                'match_date' => '2026-06-19', 'match_time' => '03:00', 'venue' => 'Estadio Akron', 'city' => 'Guadalajara', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE B ──
            [
                'group_name' => 'Groupe B', 'home_team' => 'Suisse', 'home_flag' => '🇨🇭', 'away_team' => 'Bosnie-Herzégovine', 'away_flag' => '🇧🇦',
                'match_date' => '2026-06-18', 'match_time' => '21:00', 'venue' => 'SoFi Stadium', 'city' => 'Los Angeles', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe B', 'home_team' => 'Canada', 'home_flag' => '🇨🇦', 'away_team' => 'Qatar', 'away_flag' => '🇶🇦',
                'match_date' => '2026-06-19', 'match_time' => '00:00', 'venue' => 'BC Place', 'city' => 'Vancouver', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE C ──
            [
                'group_name' => 'Groupe C', 'home_team' => 'Écosse', 'home_flag' => '🏴', 'away_team' => 'Maroc', 'away_flag' => '🇲🇦',
                'match_date' => '2026-06-19', 'match_time' => '21:00', 'venue' => 'Gillette Stadium', 'city' => 'Boston', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe C', 'home_team' => 'Brésil', 'home_flag' => '🇧🇷', 'away_team' => 'Haïti', 'away_flag' => '🇭🇹',
                'match_date' => '2026-06-20', 'match_time' => '03:00', 'venue' => 'Lincoln Financial Field', 'city' => 'Philadelphie', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE D ──
            [
                'group_name' => 'Groupe D', 'home_team' => 'USA', 'home_flag' => '🇺🇸', 'away_team' => 'Australie', 'away_flag' => '🇦🇺',
                'match_date' => '2026-06-19', 'match_time' => '21:00', 'venue' => 'Lumen Field', 'city' => 'Seattle', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe D', 'home_team' => 'Paraguay', 'home_flag' => '🇵🇾', 'away_team' => 'Turquie', 'away_flag' => '🇹🇷',
                'match_date' => '2026-06-20', 'match_time' => '06:00', 'venue' => "Levi's Stadium", 'city' => 'Santa Clara', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE E ──
            [
                'group_name' => 'Groupe E', 'home_team' => 'Allemagne', 'home_flag' => '🇩🇪', 'away_team' => "Côte d'Ivoire", 'away_flag' => '🇨🇮',
                'match_date' => '2026-06-20', 'match_time' => '22:00', 'venue' => 'BMO Field', 'city' => 'Toronto', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe E', 'home_team' => 'Équateur', 'home_flag' => '🇪🇨', 'away_team' => 'Curaçao', 'away_flag' => '🇨🇼',
                'match_date' => '2026-06-21', 'match_time' => '02:00', 'venue' => 'Arrowhead Stadium', 'city' => 'Kansas City', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE F ──
            [
                'group_name' => 'Groupe F', 'home_team' => 'Pays-Bas', 'home_flag' => '🇳🇱', 'away_team' => 'Suède', 'away_flag' => '🇸🇪',
                'match_date' => '2026-06-20', 'match_time' => '19:00', 'venue' => 'NRG Stadium', 'city' => 'Houston', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe F', 'home_team' => 'Tunisie', 'home_flag' => '🇹🇳', 'away_team' => 'Japon', 'away_flag' => '🇯🇵',
                'match_date' => '2026-06-21', 'match_time' => '06:00', 'venue' => 'Estadio BBVA', 'city' => 'Monterrey', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE G ──
            [
                'group_name' => 'Groupe G', 'home_team' => 'Belgique', 'home_flag' => '🇧🇪', 'away_team' => 'Iran', 'away_flag' => '🇮🇷',
                'match_date' => '2026-06-21', 'match_time' => '21:00', 'venue' => 'SoFi Stadium', 'city' => 'Los Angeles', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe G', 'home_team' => 'Nouvelle-Zélande', 'home_flag' => '🇳🇿', 'away_team' => 'Égypte', 'away_flag' => '🇪🇬',
                'match_date' => '2026-06-22', 'match_time' => '03:00', 'venue' => 'BC Place', 'city' => 'Vancouver', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE H ──
            [
                'group_name' => 'Groupe H', 'home_team' => 'Espagne', 'home_flag' => '🇪🇸', 'away_team' => 'Arabie Saoudite', 'away_flag' => '🇸🇦',
                'match_date' => '2026-06-21', 'match_time' => '18:00', 'venue' => 'Mercedes-Benz Stadium', 'city' => 'Atlanta', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe H', 'home_team' => 'Uruguay', 'home_flag' => '🇺🇾', 'away_team' => 'Cap-Vert', 'away_flag' => '🇨🇻',
                'match_date' => '2026-06-22', 'match_time' => '00:00', 'venue' => 'Hard Rock Stadium', 'city' => 'Miami', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE I ──
            [
                'group_name' => 'Groupe I', 'home_team' => 'France', 'home_flag' => '🇫🇷', 'away_team' => 'Irak', 'away_flag' => '🇮🇶',
                'match_date' => '2026-06-22', 'match_time' => '23:00', 'venue' => 'Lincoln Financial Field', 'city' => 'Philadelphie', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe I', 'home_team' => 'Norvège', 'home_flag' => '🇳🇴', 'away_team' => 'Sénégal', 'away_flag' => '🇸🇳',
                'match_date' => '2026-06-23', 'match_time' => '02:00', 'venue' => 'MetLife Stadium', 'city' => 'East Rutherford', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE J ──
            [
                'group_name' => 'Groupe J', 'home_team' => 'Argentine', 'home_flag' => '🇦🇷', 'away_team' => 'Autriche', 'away_flag' => '🇦🇹',
                'match_date' => '2026-06-22', 'match_time' => '19:00', 'venue' => 'AT&T Stadium', 'city' => 'Dallas', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe J', 'home_team' => 'Jordanie', 'home_flag' => '🇯🇴', 'away_team' => 'Algérie', 'away_flag' => '🇩🇿',
                'match_date' => '2026-06-23', 'match_time' => '05:00', 'venue' => "Levi's Stadium", 'city' => 'Santa Clara', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE K ──
            [
                'group_name' => 'Groupe K', 'home_team' => 'Portugal', 'home_flag' => '🇵🇹', 'away_team' => 'Ouzbékistan', 'away_flag' => '🇺🇿',
                'match_date' => '2026-06-23', 'match_time' => '19:00', 'venue' => 'NRG Stadium', 'city' => 'Houston', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe K', 'home_team' => 'Colombie', 'home_flag' => '🇨🇴', 'away_team' => 'RD Congo', 'away_flag' => '🇨🇩',
                'match_date' => '2026-06-23', 'match_time' => '22:00', 'venue' => 'Estadio Akron', 'city' => 'Guadalajara', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE L ──
            [
                'group_name' => 'Groupe L', 'home_team' => 'Angleterre', 'home_flag' => '🏴', 'away_team' => 'Ghana', 'away_flag' => '🇬🇭',
                'match_date' => '2026-06-23', 'match_time' => '22:00', 'venue' => 'Gillette Stadium', 'city' => 'Boston', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe L', 'home_team' => 'Panama', 'home_flag' => '🇵🇦', 'away_team' => 'Croatie', 'away_flag' => '🇭🇷',
                'match_date' => '2026-06-24', 'match_time' => '01:00', 'venue' => 'BMO Field', 'city' => 'Toronto', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ════════════════════════════════
            // JOURNÉE 3 (June 24–28)
            // ════════════════════════════════

            // ── GROUPE A ──
            [
                'group_name' => 'Groupe A', 'home_team' => 'Afrique du Sud', 'home_flag' => '🇿🇦', 'away_team' => 'Corée du Sud', 'away_flag' => '🇰🇷',
                'match_date' => '2026-06-24', 'match_time' => '22:00', 'venue' => 'Estadio BBVA', 'city' => 'Monterrey', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe A', 'home_team' => 'Tchéquie', 'home_flag' => '🇨🇿', 'away_team' => 'Mexique', 'away_flag' => '🇲🇽',
                'match_date' => '2026-06-24', 'match_time' => '22:00', 'venue' => 'Estadio Azteca', 'city' => 'Mexico City', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE B ──
            [
                'group_name' => 'Groupe B', 'home_team' => 'Bosnie-Herzégovine', 'home_flag' => '🇧🇦', 'away_team' => 'Qatar', 'away_flag' => '🇶🇦',
                'match_date' => '2026-06-24', 'match_time' => '00:00', 'venue' => 'SoFi Stadium', 'city' => 'Los Angeles', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe B', 'home_team' => 'Suisse', 'home_flag' => '🇨🇭', 'away_team' => 'Canada', 'away_flag' => '🇨🇦',
                'match_date' => '2026-06-24', 'match_time' => '00:00', 'venue' => 'Lumen Field', 'city' => 'Seattle', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE C ──
            [
                'group_name' => 'Groupe C', 'home_team' => 'Écosse', 'home_flag' => '🏴', 'away_team' => 'Brésil', 'away_flag' => '🇧🇷',
                'match_date' => '2026-06-24', 'match_time' => '21:00', 'venue' => 'Hard Rock Stadium', 'city' => 'Miami', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe C', 'home_team' => 'Maroc', 'home_flag' => '🇲🇦', 'away_team' => 'Haïti', 'away_flag' => '🇭🇹',
                'match_date' => '2026-06-24', 'match_time' => '21:00', 'venue' => 'Arrowhead Stadium', 'city' => 'Kansas City', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE D ──
            [
                'group_name' => 'Groupe D', 'home_team' => 'Turquie', 'home_flag' => '🇹🇷', 'away_team' => 'USA', 'away_flag' => '🇺🇸',
                'match_date' => '2026-06-25', 'match_time' => '21:00', 'venue' => 'SoFi Stadium', 'city' => 'Los Angeles', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe D', 'home_team' => 'Paraguay', 'home_flag' => '🇵🇾', 'away_team' => 'Australie', 'away_flag' => '🇦🇺',
                'match_date' => '2026-06-25', 'match_time' => '21:00', 'venue' => "Levi's Stadium", 'city' => 'Santa Clara', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE E ──
            [
                'group_name' => 'Groupe E', 'home_team' => 'Équateur', 'home_flag' => '🇪🇨', 'away_team' => 'Allemagne', 'away_flag' => '🇩🇪',
                'match_date' => '2026-06-25', 'match_time' => '21:00', 'venue' => 'MetLife Stadium', 'city' => 'East Rutherford', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe E', 'home_team' => 'Curaçao', 'home_flag' => '🇨🇼', 'away_team' => "Côte d'Ivoire", 'away_flag' => '🇨🇮',
                'match_date' => '2026-06-25', 'match_time' => '21:00', 'venue' => 'Lincoln Financial Field', 'city' => 'Philadelphie', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE F ──
            [
                'group_name' => 'Groupe F', 'home_team' => 'Japon', 'home_flag' => '🇯🇵', 'away_team' => 'Suède', 'away_flag' => '🇸🇪',
                'match_date' => '2026-06-25', 'match_time' => '22:00', 'venue' => 'AT&T Stadium', 'city' => 'Dallas', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe F', 'home_team' => 'Tunisie', 'home_flag' => '🇹🇳', 'away_team' => 'Pays-Bas', 'away_flag' => '🇳🇱',
                'match_date' => '2026-06-25', 'match_time' => '22:00', 'venue' => 'Arrowhead Stadium', 'city' => 'Kansas City', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE G ──
            [
                'group_name' => 'Groupe G', 'home_team' => 'Égypte', 'home_flag' => '🇪🇬', 'away_team' => 'Iran', 'away_flag' => '🇮🇷',
                'match_date' => '2026-06-27', 'match_time' => '05:00', 'venue' => 'Lumen Field', 'city' => 'Seattle', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe G', 'home_team' => 'Nouvelle-Zélande', 'home_flag' => '🇳🇿', 'away_team' => 'Belgique', 'away_flag' => '🇧🇪',
                'match_date' => '2026-06-27', 'match_time' => '05:00', 'venue' => 'BC Place', 'city' => 'Vancouver', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE H ──
            [
                'group_name' => 'Groupe H', 'home_team' => 'Cap-Vert', 'home_flag' => '🇨🇻', 'away_team' => 'Arabie Saoudite', 'away_flag' => '🇸🇦',
                'match_date' => '2026-06-27', 'match_time' => '02:00', 'venue' => 'Arrowhead Stadium', 'city' => 'Kansas City', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe H', 'home_team' => 'Uruguay', 'home_flag' => '🇺🇾', 'away_team' => 'Espagne', 'away_flag' => '🇪🇸',
                'match_date' => '2026-06-27', 'match_time' => '02:00', 'venue' => 'Estadio Akron', 'city' => 'Guadalajara', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE I ──
            [
                'group_name' => 'Groupe I', 'home_team' => 'Norvège', 'home_flag' => '🇳🇴', 'away_team' => 'France', 'away_flag' => '🇫🇷',
                'match_date' => '2026-06-26', 'match_time' => '21:00', 'venue' => 'Gillette Stadium', 'city' => 'Boston', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe I', 'home_team' => 'Sénégal', 'home_flag' => '🇸🇳', 'away_team' => 'Irak', 'away_flag' => '🇮🇶',
                'match_date' => '2026-06-26', 'match_time' => '21:00', 'venue' => 'BMO Field', 'city' => 'Toronto', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE J ──
            [
                'group_name' => 'Groupe J', 'home_team' => 'Algérie', 'home_flag' => '🇩🇿', 'away_team' => 'Autriche', 'away_flag' => '🇦🇹',
                'match_date' => '2026-06-28', 'match_time' => '04:00', 'venue' => 'Arrowhead Stadium', 'city' => 'Kansas City', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe J', 'home_team' => 'Jordanie', 'home_flag' => '🇯🇴', 'away_team' => 'Argentine', 'away_flag' => '🇦🇷',
                'match_date' => '2026-06-28', 'match_time' => '04:00', 'venue' => 'AT&T Stadium', 'city' => 'Dallas', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE K ──
            [
                'group_name' => 'Groupe K', 'home_team' => 'Colombie', 'home_flag' => '🇨🇴', 'away_team' => 'Portugal', 'away_flag' => '🇵🇹',
                'match_date' => '2026-06-28', 'match_time' => '01:30', 'venue' => 'Hard Rock Stadium', 'city' => 'Miami', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe K', 'home_team' => 'RD Congo', 'home_flag' => '🇨🇩', 'away_team' => 'Ouzbékistan', 'away_flag' => '🇺🇿',
                'match_date' => '2026-06-28', 'match_time' => '01:30', 'venue' => 'Mercedes-Benz Stadium', 'city' => 'Atlanta', 'stage' => 'group', 'status' => 'upcoming'
            ],

            // ── GROUPE L ──
            [
                'group_name' => 'Groupe L', 'home_team' => 'Panama', 'home_flag' => '🇵🇦', 'away_team' => 'Angleterre', 'away_flag' => '🏴',
                'match_date' => '2026-06-28', 'match_time' => '23:00', 'venue' => 'MetLife Stadium', 'city' => 'East Rutherford', 'stage' => 'group', 'status' => 'upcoming'
            ],
            [
                'group_name' => 'Groupe L', 'home_team' => 'Croatie', 'home_flag' => '🇭🇷', 'away_team' => 'Ghana', 'away_flag' => '🇬🇭',
                'match_date' => '2026-06-28', 'match_time' => '23:00', 'venue' => 'Lincoln Financial Field', 'city' => 'Philadelphie', 'stage' => 'group', 'status' => 'upcoming'
            ],
        ];

        foreach ($matches as $match) {
            FootballMatch::create($match);
        }
    }
}
