<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Stadium;
use App\Models\Ville;

class StadiumSeeder extends Seeder
{
    public function run(): void
    {
        $stadiums = [
            [
                'name' => 'Estadio Azteca',
                'city' => 'Mexico City',
                'capacity' => 87523,
                'opened_year' => '1966',
                'surface' => 'Hybrid Grass',
                'image_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Estadio_Azteca_2015.jpg/1280px-Estadio_Azteca_2015.jpg',
                'description' => 'The legendary stadium in Mexico City, host of two World Cup finals.'
            ],
            [
                'name' => 'Estadio Akron',
                'city' => 'Guadalajara',
                'capacity' => 48071,
                'opened_year' => '2010',
                'surface' => 'Grass',
                'image_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Estadio_Akron_2021.jpg/1280px-Estadio_Akron_2021.jpg',
                'description' => 'A modern stadium in Zapopan, near Guadalajara.'
            ],
            [
                'name' => 'Estadio BBVA',
                'city' => 'Monterrey',
                'capacity' => 53500,
                'opened_year' => '2015',
                'surface' => 'Grass',
                'image_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Estadio_BBVA_Bancomer_-_Club_de_F%C3%BAtbol_Monterrey.jpg/1280px-Estadio_BBVA_Bancomer_-_Club_de_F%C3%BAtbol_Monterrey.jpg',
                'description' => 'Nicknamed "The Steel Giant", located in Guadalupe, Monterrey.'
            ],
            [
                'name' => 'BMO Field',
                'city' => 'Toronto',
                'capacity' => 45736,
                'opened_year' => '2007',
                'surface' => 'Hybrid Grass',
                'image_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/BMO_Field_2017.jpg/1280px-BMO_Field_2017.jpg',
                'description' => 'Canada\'s national soccer stadium in Toronto.'
            ],
            [
                'name' => 'BC Place',
                'city' => 'Vancouver',
                'capacity' => 54500,
                'opened_year' => '1983',
                'surface' => 'Polytan LigaTurf RS+ Pro',
                'image_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/BC_Place_Stadium_Vancouver_2011.jpg/1280px-BC_Place_Stadium_Vancouver_2011.jpg',
                'description' => 'A major stadium in Vancouver with a retractable roof.'
            ],
            [
                'name' => 'MetLife Stadium',
                'city' => 'New York/New Jersey',
                'capacity' => 82500,
                'opened_year' => '2010',
                'surface' => 'FieldTurf Core',
                'image_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/MetLife_Stadium_exterior.jpg/1280px-MetLife_Stadium_exterior.jpg',
                'description' => 'The final venue for the FIFA World Cup 2026.'
            ],
            [
                'name' => 'SoFi Stadium',
                'city' => 'Los Angeles',
                'capacity' => 70240,
                'opened_year' => '2020',
                'surface' => 'Matrix Helix Turf',
                'image_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/SoFi_Stadium_exterior_2020.jpg/1280px-SoFi_Stadium_exterior_2020.jpg',
                'description' => 'An architectural marvel in Inglewood, California.'
            ],
            [
                'name' => 'Levi\'s Stadium',
                'city' => 'San Francisco Bay Area',
                'capacity' => 68500,
                'opened_year' => '2014',
                'surface' => 'Bermuda Grass',
                'image_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Levi%27s_Stadium_-_panoramio_%281%29.jpg/1280px-Levi%27s_Stadium_-_panoramio_%281%29.jpg',
                'description' => 'Located in Santa Clara, in the heart of Silicon Valley.'
            ],
            [
                'name' => 'AT&T Stadium',
                'city' => 'Dallas',
                'capacity' => 80000,
                'opened_year' => '2009',
                'surface' => 'Grass',
                'image_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/ATT_Stadium_Arlington.jpg/1280px-ATT_Stadium_Arlington.jpg',
                'description' => 'Home of the Dallas Cowboys, one of the most iconic stadiums in the US.'
            ],
            [
                'name' => 'NRG Stadium',
                'city' => 'Houston',
                'capacity' => 72220,
                'opened_year' => '2002',
                'surface' => 'Grass',
                'image_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/NRG_Stadium_Houston_Texans.jpg/1280px-NRG_Stadium_Houston_Texans.jpg',
                'description' => 'A retractable roof stadium located in Houston, Texas.'
            ],
            [
                'name' => 'Arrowhead Stadium',
                'city' => 'Kansas City',
                'capacity' => 76416,
                'opened_year' => '1972',
                'surface' => 'Grass',
                'image_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Arrowhead_Stadium_exterior_-_2021.jpg/1280px-Arrowhead_Stadium_exterior_-_2021.jpg',
                'description' => 'Home of the Kansas City Chiefs, known for its electric atmosphere.'
            ],
            [
                'name' => 'Gillette Stadium',
                'city' => 'Boston',
                'capacity' => 65878,
                'opened_year' => '2002',
                'surface' => 'FieldTurf',
                'image_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Gillette_Stadium_Aerial_2012.jpg/1280px-Gillette_Stadium_Aerial_2012.jpg',
                'description' => 'Located in Foxborough, Massachusetts, home of the New England Patriots.'
            ],
            [
                'name' => 'Lincoln Financial Field',
                'city' => 'Philadelphia',
                'capacity' => 69176,
                'opened_year' => '2003',
                'surface' => 'Grass',
                'image_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Lincoln_Financial_Field_2021.jpg/1280px-Lincoln_Financial_Field_2021.jpg',
                'description' => 'Known as "The Linc", home of the Philadelphia Eagles.'
            ],
            [
                'name' => 'State Farm Stadium',
                'city' => 'Phoenix',
                'capacity' => 63400,
                'opened_year' => '2006',
                'surface' => 'Natural Grass',
                'image_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/State_Farm_Stadium_2023.jpg/1280px-State_Farm_Stadium_2023.jpg',
                'description' => 'Located in Glendale, Arizona, with a retractable roof and roll-out grass field.'
            ],
        ];

        foreach ($stadiums as $s) {
            $city = Ville::where('name', 'like', '%' . $s['city'] . '%')->first();

            Stadium::updateOrCreate(
                ['name' => $s['name']],
                [
                    'city_id'      => $city ? $city->id : null,
                    'capacity'     => $s['capacity'],
                    'opened_year'  => $s['opened_year'],
                    'surface'      => $s['surface'],
                    'image_url'    => $s['image_url'],
                    'description'  => $s['description'],
                ]
            );
        }
    }
}
