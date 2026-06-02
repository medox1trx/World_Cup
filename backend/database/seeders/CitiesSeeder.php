<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Pays;
use App\Models\Stadium;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CitiesSeeder extends Seeder
{
    private array $stadiums = [
        ['city' => 'Mexico City', 'country' => 'Mexico', 'stadium' => 'Estadio Azteca', 'image' => 'https://images.unsplash.com/photo-1518105779142-d971f2285747?q=80&w=1000&auto=format&fit=crop'],
        ['city' => 'Guadalajara', 'country' => 'Mexico', 'stadium' => 'Estadio Akron', 'image' => 'https://images.unsplash.com/photo-1580838382755-e78ecad2cb92?q=80&w=1000&auto=format&fit=crop'],
        ['city' => 'Monterrey', 'country' => 'Mexico', 'stadium' => 'Estadio BBVA', 'image' => 'https://images.unsplash.com/photo-1629813217983-ab3dc8bf0f9b?q=80&w=1000&auto=format&fit=crop'],
        ['city' => 'Toronto', 'country' => 'Canada', 'stadium' => 'BMO Field', 'image' => 'https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1000&auto=format&fit=crop'],
        ['city' => 'Vancouver', 'country' => 'Canada', 'stadium' => 'BC Place', 'image' => 'https://images.unsplash.com/photo-1559511260-66a654ae982a?q=80&w=1000&auto=format&fit=crop'],
        ['city' => 'New York/New Jersey', 'country' => 'USA', 'stadium' => 'MetLife Stadium', 'image' => 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000&auto=format&fit=crop'],
        ['city' => 'Los Angeles', 'country' => 'USA', 'stadium' => 'SoFi Stadium', 'image' => 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000&auto=format&fit=crop'],
        ['city' => 'San Francisco', 'country' => 'USA', 'stadium' => 'Levi\'s Stadium', 'image' => 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000&auto=format&fit=crop'],
        ['city' => 'Seattle', 'country' => 'USA', 'stadium' => 'Lumen Field', 'image' => 'https://images.unsplash.com/photo-1502175353174-a7a70e73b362?q=80&w=1000&auto=format&fit=crop'],
        ['city' => 'Dallas', 'country' => 'USA', 'stadium' => 'AT&T Stadium', 'image' => 'https://images.unsplash.com/photo-1542318049-74d30c0e5a87?q=80&w=1000&auto=format&fit=crop'],
        ['city' => 'Houston', 'country' => 'USA', 'stadium' => 'NRG Stadium', 'image' => 'https://images.unsplash.com/photo-1530089711124-9ca31fb9e863?q=80&w=1000&auto=format&fit=crop'],
        ['city' => 'Kansas City', 'country' => 'USA', 'stadium' => 'GEHA Field at Arrowhead Stadium', 'image' => 'https://images.unsplash.com/photo-1599396263592-35367b6070eb?q=80&w=1000&auto=format&fit=crop'],
        ['city' => 'Atlanta', 'country' => 'USA', 'stadium' => 'Mercedes-Benz Stadium', 'image' => 'https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?q=80&w=1000&auto=format&fit=crop'],
        ['city' => 'Miami', 'country' => 'USA', 'stadium' => 'Hard Rock Stadium', 'image' => 'https://images.unsplash.com/photo-1506953823976-f2f11a61a4b0?q=80&w=1000&auto=format&fit=crop'],
        ['city' => 'Boston', 'country' => 'USA', 'stadium' => 'Gillette Stadium', 'image' => 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop'],
        ['city' => 'Philadelphia', 'country' => 'USA', 'stadium' => 'Lincoln Financial Field', 'image' => 'https://images.unsplash.com/photo-1508241097871-3cb721ea7fbb?q=80&w=1000&auto=format&fit=crop'],
    ];

    public function run(): void
    {
        foreach ($this->stadiums as $s) {
            $country = Pays::where('name', $s['country'])->first();
            if (!$country) {
                $country = Pays::create([
                    'name' => $s['country'],
                    'code' => strtoupper(substr($s['country'], 0, 2)),
                    'flag_url' => strtolower(substr($s['country'], 0, 2))
                ]);
            }

            $city = City::updateOrCreate(
                ['name' => $s['city']],
                [
                    'slug' => Str::slug($s['city']),
                    'country_id' => $country->id,
                    'description' => "Official host city for FIFA World Cup 2026.",
                    'stadium' => $s['stadium'],
                    'match_period' => "Group Stage & Knockout",
                    'image_url' => $s['image'],
                    'lat' => 0,
                    'lng' => 0
                ]
            );

            Stadium::updateOrCreate(
                ['name' => $s['stadium']],
                [
                    'city_id' => $city->id,
                    'capacity' => 60000,
                    'image_url' => "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop",
                    'description' => "Official venue for FIFA World Cup 2026 matches."
                ]
            );
        }
    }
}
