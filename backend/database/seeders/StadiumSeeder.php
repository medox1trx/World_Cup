<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Stadium;
use App\Models\Ville;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class StadiumSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Stadium::truncate();
        Schema::enableForeignKeyConstraints();

        $stadiums = [
            [
                'name' => 'SoFi Stadium',
                'city' => 'Los Angeles',
                'capacity' => 70240,
                'opened_year' => '2020',
                'surface' => 'Matrix Helix Turf',
                'description' => 'Merveille architecturale située à Inglewood, en Californie, le SoFi Stadium est l\'un des stades les plus modernes au monde. Il accueillera des matchs cruciaux de la Coupe du Monde de la FIFA 2026 dans une ambiance futuriste.',
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=SoFi+Stadium',
                'image_source' => 'https://images.unsplash.com/photo-1540759786-4f9e120f269a?q=80&w=800',
            ],
            [
                'name' => 'MetLife Stadium',
                'city' => 'New York',
                'capacity' => 82500,
                'opened_year' => '2010',
                'surface' => 'Natural Grass',
                'description' => 'Situé à East Rutherford, New Jersey, ce stade gigantesque accueillera la prestigieuse finale de la Coupe du Monde 2026. Un temple légendaire du sport américain prêt à marquer l\'histoire du football mondial.',
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=MetLife+Stadium',
                'image_source' => 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800',
            ],
            [
                'name' => 'Hard Rock Stadium',
                'city' => 'Miami',
                'capacity' => 64767,
                'opened_year' => '1987',
                'surface' => 'Bermuda Grass',
                'description' => 'Un stade dynamique et coloré au cœur de Miami, réputé pour son toit suspendu emblématique et ses ambiances festives exceptionnelles. Il accueillera plusieurs chocs internationaux en 2026.',
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=Hard+Rock+Stadium',
                'image_source' => 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800',
            ],
            [
                'name' => 'AT&T Stadium',
                'city' => 'Dallas',
                'capacity' => 80000,
                'opened_year' => '2009',
                'surface' => 'Hellas Matrix Turf',
                'description' => 'Surnommé "The Death Star", ce chef-d\'œuvre d\'ingénierie à toit rétractable possède l\'un des plus grands écrans suspendus au monde. Une arène spectaculaire pour des demi-finales historiques.',
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=AT%26T+Stadium',
                'image_source' => 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800',
            ],
            [
                'name' => 'Mercedes-Benz Stadium',
                'city' => 'Atlanta',
                'capacity' => 71000,
                'opened_year' => '2017',
                'surface' => 'FieldTurf CORE',
                'description' => 'Célèbre pour son toit rétractable en "œil de faucon" et son écran géant circulaire à 360 degrés, ce stade ultra-technologique offre une expérience de visionnage absolument unique au monde.',
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=Mercedes-Benz+Stadium',
                'image_source' => 'https://images.unsplash.com/photo-1489945052260-4f21c52268b9?q=80&w=800',
            ],
            [
                'name' => 'Levi\'s Stadium',
                'city' => 'San Francisco',
                'capacity' => 68500,
                'opened_year' => '2014',
                'surface' => 'Tifway II Bermuda Grass',
                'description' => 'Situé au cœur de la Silicon Valley, ce stade écologique et ultra-connecté allie technologie verte et confort haut de gamme. Parfait pour vivre des moments mémorables en Californie.',
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=Levis+Stadium',
                'image_source' => 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800',
            ],
            [
                'name' => 'Lumen Field',
                'city' => 'Seattle',
                'capacity' => 69000,
                'opened_year' => '2002',
                'surface' => 'FieldTurf Revolution',
                'description' => 'Réputé mondialement pour être l\'un des stades les plus bruyants du monde grâce à sa structure en double arche acoustique. Une ambiance électrique garantie pour le mondial 2026.',
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=Lumen+Field',
                'image_source' => 'https://images.unsplash.com/photo-1478156671747-0786cfb87d2a?q=80&w=800',
            ],
            [
                'name' => 'BMO Field',
                'city' => 'Toronto',
                'capacity' => 45000,
                'opened_year' => '2007',
                'surface' => 'Hybrid Grass',
                'description' => 'Le temple du soccer au Canada, agrandi spécialement pour l\'événement historique de 2026. Situé au bord du lac Ontario, il vibrera d\'une passion nationale inoubliable.',
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=BMO+Field',
                'image_source' => 'https://images.unsplash.com/photo-1507992781348-310259076fe0?q=80&w=800',
            ],
            [
                'name' => 'BC Place',
                'city' => 'Vancouver',
                'capacity' => 54500,
                'opened_year' => '1983',
                'surface' => 'Polytan Turf',
                'description' => 'Un joyau architectural à toit rétractable soutenu par câbles, niché au milieu des montagnes et de l\'océan Pacifique. L\'écrin idéal pour célébrer la magie de la Coupe du Monde.',
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=BC+Place',
                'image_source' => 'https://images.unsplash.com/photo-1559511260-66a654ae982a?q=80&w=800',
            ],
            [
                'name' => 'Estadio Azteca',
                'city' => 'Mexico City',
                'capacity' => 83264,
                'opened_year' => '1966',
                'surface' => 'Natural Grass',
                'description' => 'La cathédrale mythique du football mondial, premier stade de l\'histoire à accueillir une troisième Coupe du Monde de la FIFA. Le lieu sacré où Pelé et Maradona ont été couronnés rois.',
                'location_url' => 'https://www.google.com/maps/search/?api=1&query=Estadio+Azteca',
                'image_source' => 'https://images.unsplash.com/photo-1512813583145-ac554ac82e54?q=80&w=800',
            ],
        ];

        Storage::disk('public')->makeDirectory('uploads/stadiums');

        $ctx = stream_context_create([
            'http' => [
                'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\r\n"
            ]
        ]);

        $this->command->info('Downloading and stocking real stadium images locally...');

        foreach ($stadiums as $s) {
            // Find city matching the stadium city
            $city = Ville::where('name', 'like', '%' . $s['city'] . '%')->first();

            $slug = Str::slug($s['name']);
            $filename = "uploads/stadiums/{$slug}.jpg";
            $dbPath = $filename;

            try {
                $this->command->info("Downloading image for: {$s['name']}");
                $imgData = @file_get_contents($s['image_source'], false, $ctx);
                if ($imgData !== false) {
                    Storage::disk('public')->put($filename, $imgData);
                } else {
                    $this->command->warn("Fallback to source URL for: {$s['name']}");
                    $dbPath = $s['image_source'];
                }
            } catch (\Exception $e) {
                $this->command->warn("Error saving image for: {$s['name']}. Using direct URL.");
                $dbPath = $s['image_source'];
            }

            Stadium::create([
                'name'         => $s['name'],
                'city_id'      => $city ? $city->id : null,
                'capacity'     => $s['capacity'],
                'opened_year'  => $s['opened_year'],
                'surface'      => $s['surface'],
                'image_url'    => $dbPath,
                'description'  => $s['description'],
                'location_url' => $s['location_url'],
            ]);
        }

        $this->command->info('StadiumSeeder successfully populated 10 real stadiums with local saved images!');
    }
}
