<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Team;

class TeamSeeder extends Seeder
{
    public function run(): void
    {
        \Schema::disableForeignKeyConstraints();
        Team::truncate();
        \Schema::enableForeignKeyConstraints();

        $teams = [
            // GROUP A
            ['name'=>'United States', 'code'=>'USA', 'flag'=>'us', 'group_name'=>'Group A', 'world_ranking'=>11, 'world_cup_titles'=>0, 'coach'=>'Mauricio Pochettino', 'captain'=>'Christian Pulisic', 'key_player'=>'Christian Pulisic', 'description'=>'Hosts looking to leverage home advantage.', 'image_url'=>'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=800'],
            ['name'=>'Poland',        'code'=>'POL', 'flag'=>'pl', 'group_name'=>'Group A', 'world_ranking'=>26, 'world_cup_titles'=>0, 'coach'=>'Michał Probierz', 'captain'=>'Robert Lewandowski', 'key_player'=>'Robert Lewandowski', 'description'=>'Experience and power in attack.', 'image_url'=>'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800'],
            ['name'=>'Nigeria',       'code'=>'NGA', 'flag'=>'ng', 'group_name'=>'Group A', 'world_ranking'=>30, 'world_cup_titles'=>0, 'coach'=>'Finidi George', 'captain'=>'William Troost-Ekong', 'key_player'=>'Victor Osimhen', 'description'=>'The Super Eagles bring speed and talent.', 'image_url'=>'https://images.unsplash.com/photo-1508344928928-7165b67de128?w=800'],
            ['name'=>'Iraq',          'code'=>'IRQ', 'flag'=>'iq', 'group_name'=>'Group A', 'world_ranking'=>58, 'world_cup_titles'=>0, 'coach'=>'Jesús Casas', 'captain'=>'Jalal Hassan', 'key_player'=>'Ayman Hussein', 'description'=>'Determined to make an impact.', 'image_url'=>'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800'],

            // GROUP B
            ['name'=>'Mexico',        'code'=>'MEX', 'flag'=>'mx', 'group_name'=>'Group B', 'world_ranking'=>15, 'world_cup_titles'=>0, 'coach'=>'Javier Aguirre', 'captain'=>'Edson Álvarez', 'key_player'=>'Hirving Lozano', 'description'=>'Home hosts at the iconic Azteca.', 'image_url'=>'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800'],
            ['name'=>'Switzerland',   'code'=>'SUI', 'flag'=>'ch', 'group_name'=>'Group B', 'world_ranking'=>19, 'world_cup_titles'=>0, 'coach'=>'Murat Yakin', 'captain'=>'Granit Xhaka', 'key_player'=>'Granit Xhaka', 'description'=>'Consistent and tough to beat.', 'image_url'=>'https://images.unsplash.com/photo-1511886929837-329f79011999?w=800'],
            ['name'=>'Algeria',       'code'=>'ALG', 'flag'=>'dz', 'group_name'=>'Group B', 'world_ranking'=>43, 'world_cup_titles'=>0, 'coach'=>'Vladimir Petkovic', 'captain'=>'Riyad Mahrez', 'key_player'=>'Riyad Mahrez', 'description'=>'Fennecs looking for glory.', 'image_url'=>'https://images.unsplash.com/photo-1597830219514-e601f029924d?w=800'],
            ['name'=>'Uzbekistan',    'code'=>'UZB', 'flag'=>'uz', 'group_name'=>'Group B', 'world_ranking'=>64, 'world_cup_titles'=>0, 'coach'=>'Srečko Katanec', 'captain'=>'Eldor Shomurodov', 'key_player'=>'Eldor Shomurodov', 'description'=>'Rising force in Asian football.', 'image_url'=>'https://images.unsplash.com/photo-1559564614-a399728b70ba?w=800'],

            // GROUP C
            ['name'=>'Canada',        'code'=>'CAN', 'flag'=>'ca', 'group_name'=>'Group C', 'world_ranking'=>40, 'world_cup_titles'=>0, 'coach'=>'Jesse Marsch', 'captain'=>'Alphonso Davies', 'key_player'=>'Alphonso Davies', 'description'=>'Golden generation ready to shine at home.', 'image_url'=>'https://images.unsplash.com/photo-1559564614-a399728b70ba?w=800'],
            ['name'=>'Denmark',       'code'=>'DEN', 'flag'=>'dk', 'group_name'=>'Group C', 'world_ranking'=>21, 'world_cup_titles'=>0, 'coach'=>'Kasper Hjulmand', 'captain'=>'Simon Kjær', 'key_player'=>'Christian Eriksen', 'description'=>'Dynamic European side.', 'image_url'=>'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800'],
            ['name'=>'Egypt',         'code'=>'EGY', 'flag'=>'eg', 'group_name'=>'Group C', 'world_ranking'=>36, 'world_cup_titles'=>0, 'coach'=>'Hossam Hassan', 'captain'=>'Mohamed Salah', 'key_player'=>'Mohamed Salah', 'description'=>'The Pharaohs led by superstar Salah.', 'image_url'=>'https://images.unsplash.com/photo-1597830219514-e601f029924d?w=800'],
            ['name'=>'Qatar',         'code'=>'QAT', 'flag'=>'qa', 'group_name'=>'Group C', 'world_ranking'=>34, 'world_cup_titles'=>0, 'coach'=>'Tintín Márquez', 'captain'=>'Hassan Al-Haydos', 'key_player'=>'Akram Afif', 'description'=>'Asian champions looking to prove themselves.', 'image_url'=>'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=800'],

            // GROUP D
            ['name'=>'France',        'code'=>'FRA', 'flag'=>'fr', 'group_name'=>'Group D', 'world_ranking'=>2, 'world_cup_titles'=>2, 'coach'=>'Didier Deschamps', 'captain'=>'Kylian Mbappé', 'key_player'=>'Kylian Mbappé', 'description'=>'Title favorites with world-class talent.', 'image_url'=>'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800'],
            ['name'=>'Uruguay',       'code'=>'URU', 'flag'=>'uy', 'group_name'=>'Group D', 'world_ranking'=>14, 'world_cup_titles'=>2, 'coach'=>'Marcelo Bielsa', 'captain'=>'José Giménez', 'key_player'=>'Federico Valverde', 'description'=>'The Bielsa effect in full swing.', 'image_url'=>'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=800'],
            ['name'=>'Ivory Coast',   'code'=>'CIV', 'flag'=>'ci', 'group_name'=>'Group D', 'world_ranking'=>38, 'world_cup_titles'=>0, 'coach'=>'Emerse Faé', 'captain'=>'Franck Kessié', 'key_player'=>'Sébastien Haller', 'description'=>'African giants with power and skill.', 'image_url'=>'https://images.unsplash.com/photo-1508344928928-7165b67de128?w=800'],
            ['name'=>'Costa Rica',    'code'=>'CRC', 'flag'=>'cr', 'group_name'=>'Group D', 'world_ranking'=>52, 'world_cup_titles'=>0, 'coach'=>'Claudio Vivas', 'captain'=>'Francisco Calvo', 'key_player'=>'Joel Campbell', 'description'=>'Looking to repeat 2014 heroics.', 'image_url'=>'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800'],

            // GROUP E
            ['name'=>'Argentina',     'code'=>'ARG', 'flag'=>'ar', 'group_name'=>'Group E', 'world_ranking'=>1, 'world_cup_titles'=>3, 'coach'=>'Lionel Scaloni', 'captain'=>'Lionel Messi', 'key_player'=>'Lionel Messi', 'description'=>'The World Champions looking for another title.', 'image_url'=>'https://images.unsplash.com/photo-1589133465492-4d40026e2a2a?w=800'],
            ['name'=>'Japan',         'code'=>'JPN', 'flag'=>'jp', 'group_name'=>'Group E', 'world_ranking'=>18, 'world_cup_titles'=>0, 'coach'=>'Hajime Moriyasu', 'captain'=>'Wataru Endo', 'key_player'=>'Takefusa Kubo', 'description'=>'Technically gifted Samurais.', 'image_url'=>'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800'],
            ['name'=>'Mali',          'code'=>'MLI', 'flag'=>'ml', 'group_name'=>'Group E', 'world_ranking'=>47, 'world_cup_titles'=>0, 'coach'=>'Eric Chelle', 'captain'=>'Hamari Traoré', 'key_player'=>'Yves Bissouma', 'description'=>'Dynamic side with high potential.', 'image_url'=>'https://images.unsplash.com/photo-1508344928928-7165b67de128?w=800'],
            ['name'=>'Panama',        'code'=>'PAN', 'flag'=>'pa', 'group_name'=>'Group E', 'world_ranking'=>43, 'world_cup_titles'=>0, 'coach'=>'Thomas Christiansen', 'captain'=>'Aníbal Godoy', 'key_player'=>'Ismael Díaz', 'description'=>'Central American strength.', 'image_url'=>'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=800'],

            // GROUP F
            ['name'=>'Brazil',        'code'=>'BRA', 'flag'=>'br', 'group_name'=>'Group F', 'world_ranking'=>5, 'world_cup_titles'=>5, 'coach'=>'Dorival Júnior', 'captain'=>'Danilo', 'key_player'=>'Vinícius Júnior', 'description'=>'The Samba Kings seeking the Hexa.', 'image_url'=>'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800'],
            ['name'=>'Austria',       'code'=>'AUT', 'flag'=>'at', 'group_name'=>'Group F', 'world_ranking'=>25, 'world_cup_titles'=>0, 'coach'=>'Ralf Rangnick', 'captain'=>'David Alaba', 'key_player'=>'Marcel Sabitzer', 'description'=>'Disciplined and tactical side.', 'image_url'=>'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800'],
            ['name'=>'South Africa',  'code'=>'RSA', 'flag'=>'za', 'group_name'=>'Group F', 'world_ranking'=>59, 'world_cup_titles'=>0, 'coach'=>'Hugo Broos', 'captain'=>'Ronwen Williams', 'key_player'=>'Percy Tau', 'description'=>'Bafana Bafana looking to impress.', 'image_url'=>'https://images.unsplash.com/photo-1508344928928-7165b67de128?w=800'],
            ['name'=>'Australia',     'code'=>'AUS', 'flag'=>'au', 'group_name'=>'Group F', 'world_ranking'=>23, 'world_cup_titles'=>0, 'coach'=>'Tony Popovic', 'captain'=>'Mat Ryan', 'key_player'=>'Mitchell Duke', 'description'=>'The Socceroos fear nobody.', 'image_url'=>'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800'],

            // GROUP G
            ['name'=>'England',       'code'=>'ENG', 'flag'=>'gb', 'group_name'=>'Group G', 'world_ranking'=>3, 'world_cup_titles'=>1, 'coach'=>'Thomas Tuchel', 'captain'=>'Harry Kane', 'key_player'=>'Jude Bellingham', 'description'=>'Coming home? The Three Lions seek glory.', 'image_url'=>'https://images.unsplash.com/photo-1511886929837-329f79011999?w=800'],
            ['name'=>'Colombia',      'code'=>'COL', 'flag'=>'co', 'group_name'=>'Group G', 'world_ranking'=>12, 'world_cup_titles'=>0, 'coach'=>'Néstor Lorenzo', 'captain'=>'James Rodríguez', 'key_player'=>'Luis Díaz', 'description'=>'Creative and explosive football.', 'image_url'=>'https://images.unsplash.com/photo-1589133465492-4d40026e2a2a?w=800'],
            ['name'=>'Saudi Arabia',  'code'=>'KSA', 'flag'=>'sa', 'group_name'=>'Group G', 'world_ranking'=>53, 'world_cup_titles'=>0, 'coach'=>'Hervé Renard', 'captain'=>'Salem Al-Dawsari', 'key_player'=>'Salem Al-Dawsari', 'description'=>'Green Falcons on the rise.', 'image_url'=>'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=800'],
            ['name'=>'Hungary',       'code'=>'HUN', 'flag'=>'hu', 'group_name'=>'Group G', 'world_ranking'=>27, 'world_cup_titles'=>0, 'coach'=>'Marco Rossi', 'captain'=>'Dominik Szoboszlai', 'key_player'=>'Dominik Szoboszlai', 'description'=>'European dark horses.', 'image_url'=>'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800'],

            // GROUP H
            ['name'=>'Spain',         'code'=>'ESP', 'flag'=>'es', 'group_name'=>'Group H', 'world_ranking'=>8, 'world_cup_titles'=>1, 'coach'=>'Luis de la Fuente', 'captain'=>'Álvaro Morata', 'key_player'=>'Lamine Yamal', 'description'=>'The Euro 2024 winners eyeing the World Cup.', 'image_url'=>'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800'],
            ['name'=>'Senegal',       'code'=>'SEN', 'flag'=>'sn', 'group_name'=>'Group H', 'world_ranking'=>17, 'world_cup_titles'=>0, 'coach'=>'Aliou Cissé', 'captain'=>'Kalidou Koulibaly', 'key_player'=>'Sadio Mané', 'description'=>'Lions of Teranga leading Africa.', 'image_url'=>'https://images.unsplash.com/photo-1508344928928-7165b67de128?w=800'],
            ['name'=>'South Korea',   'code'=>'KOR', 'flag'=>'kr', 'group_name'=>'Group H', 'world_ranking'=>22, 'world_cup_titles'=>0, 'coach'=>'Hong Myung-bo', 'captain'=>'Son Heung-min', 'key_player'=>'Son Heung-min', 'description'=>'Dynamic and fast Asian side.', 'image_url'=>'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=800'],
            ['name'=>'Panama 2',      'code'=>'PAN', 'flag'=>'pa', 'group_name'=>'Group H', 'world_ranking'=>43, 'world_cup_titles'=>0, 'coach'=>'Thomas Christiansen', 'captain'=>'Aníbal Godoy', 'key_player'=>'Ismael Díaz', 'description'=>'Central American strength.', 'image_url'=>'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=800'],

            // GROUP I
            ['name'=>'Portugal',      'code'=>'POR', 'flag'=>'pt', 'group_name'=>'Group I', 'world_ranking'=>6, 'world_cup_titles'=>0, 'coach'=>'Roberto Martínez', 'captain'=>'Cristiano Ronaldo', 'key_player'=>'Cristiano Ronaldo', 'description'=>'Last dance for legends and new stars.', 'image_url'=>'https://images.unsplash.com/photo-1582239401768-3fa44026da73?w=800'],
            ['name'=>'Ecuador',       'code'=>'ECU', 'flag'=>'ec', 'group_name'=>'Group I', 'world_ranking'=>31, 'world_cup_titles'=>0, 'coach'=>'Sebastián Beccacece', 'captain'=>'Enner Valencia', 'key_player'=>'Kendry Páez', 'description'=>'Young and fearless Tri.', 'image_url'=>'https://images.unsplash.com/photo-1582239401768-3fa44026da73?w=800'],
            ['name'=>'Cameroon',      'code'=>'CMR', 'flag'=>'cm', 'group_name'=>'Group I', 'world_ranking'=>46, 'world_cup_titles'=>0, 'coach'=>'Marc Brys', 'captain'=>'Vincent Aboubakar', 'key_player'=>'André Onana', 'description'=>'Indomitable Lions seek roaring start.', 'image_url'=>'https://images.unsplash.com/photo-1508344928928-7165b67de128?w=800'],
            ['name'=>'Turkey',        'code'=>'TUR', 'flag'=>'tr', 'group_name'=>'Group I', 'world_ranking'=>29, 'world_cup_titles'=>0, 'coach'=>'Vincenzo Montella', 'captain'=>'Hakan Çalhanoğlu', 'key_player'=>'Hakan Çalhanoğlu', 'description'=>'Passionate and talented side.', 'image_url'=>'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800'],

            // GROUP J
            ['name'=>'Netherlands',   'code'=>'NED', 'flag'=>'nl', 'group_name'=>'Group J', 'world_ranking'=>7, 'world_cup_titles'=>0, 'coach'=>'Ronald Koeman', 'captain'=>'Virgil van Dijk', 'key_player'=>'Cody Gakpo', 'description'=>'The Oranje quest for the first title.', 'image_url'=>'https://images.unsplash.com/photo-1559564614-a399728b70ba?w=800'],
            ['name'=>'Morocco',       'code'=>'MAR', 'flag'=>'ma', 'group_name'=>'Group J', 'world_ranking'=>13, 'world_cup_titles'=>0, 'coach'=>'Walid Regragui', 'captain'=>'Romain Saïss', 'key_player'=>'Achraf Hakimi', 'description'=>'2022 semi-finalists looking to repeat.', 'image_url'=>'https://images.unsplash.com/photo-1597830219514-e601f029924d?w=800'],
            ['name'=>'Iran',          'code'=>'IRN', 'flag'=>'ir', 'group_name'=>'Group J', 'world_ranking'=>20, 'world_cup_titles'=>0, 'coach'=>'Amir Ghalenoei', 'captain'=>'Ehsan Hajsafi', 'key_player'=>'Mehdi Taremi', 'description'=>'Strongest side in West Asia.', 'image_url'=>'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800'],
            ['name'=>'Ghana',         'code'=>'GHA', 'flag'=>'gh', 'group_name'=>'Group J', 'world_ranking'=>60, 'world_cup_titles'=>0, 'coach'=>'Otto Addo', 'captain'=>'Thomas Partey', 'key_player'=>'Mohammed Kudus', 'description'=>'Black Stars ready for battle.', 'image_url'=>'https://images.unsplash.com/photo-1508344928928-7165b67de128?w=800'],

            // GROUP K
            ['name'=>'Belgium',       'code'=>'BEL', 'flag'=>'be', 'group_name'=>'Group K', 'world_ranking'=>4, 'world_cup_titles'=>0, 'coach'=>'Domenico Tedesco', 'captain'=>'Kevin De Bruyne', 'key_player'=>'Kevin De Bruyne', 'description'=>'New generation mixed with veterans.', 'image_url'=>'https://images.unsplash.com/photo-1511886929837-329f79011999?w=800'],
            ['name'=>'Paraguay',      'code'=>'PAR', 'flag'=>'py', 'group_name'=>'Group K', 'world_ranking'=>56, 'world_cup_titles'=>0, 'coach'=>'Gustavo Alfaro', 'captain'=>'Gustavo Gómez', 'key_player'=>'Miguel Almirón', 'description'=>'Solid South American defense.', 'image_url'=>'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800'],
            ['name'=>'Chile',         'code'=>'CHI', 'flag'=>'cl', 'group_name'=>'Group K', 'world_ranking'=>42, 'world_cup_titles'=>0, 'coach'=>'Ricardo Gareca', 'captain'=>'Claudio Bravo', 'key_player'=>'Alexis Sánchez', 'description'=>'Seeking a return to glory.', 'image_url'=>'https://images.unsplash.com/photo-1582239401768-3fa44026da73?w=800'],
            ['name'=>'New Zealand',   'code'=>'NZL', 'flag'=>'nz', 'group_name'=>'Group K', 'world_ranking'=>103, 'world_cup_titles'=>0, 'coach'=>'Darren Bazeley', 'captain'=>'Chris Wood', 'key_player'=>'Chris Wood', 'description'=>'The pride of Oceania.', 'image_url'=>'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800'],

            // GROUP L
            ['name'=>'Italy',         'code'=>'ITA', 'flag'=>'it', 'group_name'=>'Group L', 'world_ranking'=>9, 'world_cup_titles'=>4, 'coach'=>'Luciano Spalletti', 'captain'=>'Gianluigi Donnarumma', 'key_player'=>'Federico Chiesa', 'description'=>'Returning with a point to prove.', 'image_url'=>'https://images.unsplash.com/photo-1559564614-a399728b70ba?w=800'],
            ['name'=>'Croatia',       'code'=>'CRO', 'flag'=>'hr', 'group_name'=>'Group L', 'world_ranking'=>10, 'world_cup_titles'=>0, 'coach'=>'Zlatko Dalić', 'captain'=>'Luka Modrić', 'key_player'=>'Luka Modrić', 'description'=>'Small nation, giant football heart.', 'image_url'=>'https://images.unsplash.com/photo-1559564614-a399728b70ba?w=800'],
            ['name'=>'Tunisia',       'code'=>'TUN', 'flag'=>'tn', 'group_name'=>'Group L', 'world_ranking'=>41, 'world_cup_titles'=>0, 'coach'=>'Faouzi Benzarti', 'captain'=>'Youssef Msakni', 'key_player'=>'Ellyes Skhiri', 'description'=>'Tactical discipline from North Africa.', 'image_url'=>'https://images.unsplash.com/photo-1597830219514-e601f029924d?w=800'],
            ['name'=>'Ukraine',       'code'=>'UKR', 'flag'=>'ua', 'group_name'=>'Group L', 'world_ranking'=>24, 'world_cup_titles'=>0, 'coach'=>'Serhiy Rebrov', 'captain'=>'Oleksandr Zinchenko', 'key_player'=>'Mykhailo Mudryk', 'description'=>'Playing for an entire nation.', 'image_url'=>'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800'],
        ];

        foreach ($teams as $t) {
            Team::create($t);
        }
    }
}
