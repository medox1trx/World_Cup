<?php
/*
 * Created At: 2026-04-11T16:56:17Z
 */

namespace Database\Factories;

use App\Models\City;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class AccommodationFactory extends Factory
{
    public function definition(): array
    {
        $types = ['hotel', 'apartment', 'house'];
        $type = $this->faker->randomElement($types);
        
        $hotelNames = ['Grand Luxe', 'Royal Garden', 'Skyline', 'Elite Stay', 'Urban Nest', 'Heritage', 'Marriott', 'Hilton', 'Sheraton', 'Hyatt'];
        $aptNames = ['Skyview', 'Central', 'Modern City', 'Riverside', 'Sunset', 'Penthouse', 'Cozy Corner'];
        $houseNames = ['Villa', 'Cottage', 'Residence', 'Manor', 'Garden House', 'Family Nest'];

        $name = match($type) {
            'hotel' => $this->faker->randomElement($hotelNames) . ' ' . $this->faker->randomElement(['Hotel', 'Suites', 'Resort']),
            'apartment' => $this->faker->randomElement($aptNames) . ' ' . $this->faker->randomElement(['Apartments', 'Studio', 'Loft']),
            'house' => $this->faker->randomElement($houseNames) . ' ' . $this->faker->randomElement(['Home', 'Stay', 'Villa']),
        } . ' ' . $this->faker->numberBetween(1, 100);

        $amenitiesList = ['Wifi', 'Parking', 'Pool', 'Gym', 'Air Conditioning', 'Kitchen', 'TV', 'Workspace', 'Breakfast', 'Heating'];
        $amenities = $this->faker->randomElements($amenitiesList, $this->faker->numberBetween(3, 7));

        return [
            'city_id' => City::factory(),
            'name' => $name,
            'type' => $type,
            'price_per_night' => $this->faker->randomFloat(2, 50, 600),
            'location' => $this->faker->streetAddress,
            'rooms' => $this->faker->numberBetween(1, 5),
            'beds' => $this->faker->numberBetween(1, 8),
            'baths' => $this->faker->numberBetween(1, 4),
            'capacity' => $this->faker->numberBetween(1, 10),
            'description' => $this->faker->paragraphs(2, true),
            'amenities' => $amenities,
            'rating' => $this->faker->randomFloat(2, 3.5, 5),
            'phone' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'website' => $this->faker->url,
            'image_url' => $this->getRandomImageUrl($type),
        ];
    }

    private function getRandomImageUrl($type)
    {
        $images = [
            'hotel' => [
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
                'https://images.unsplash.com/photo-1551882547-ff40c0d519ac?w=800&q=80',
                'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
                'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
            ],
            'apartment' => [
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
                'https://images.unsplash.com/photo-1502672260266-1c1c24240f57?w=800&q=80',
                'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
            ],
            'house' => [
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
                'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80',
            ]
        ];

        return $images[$type][array_rand($images[$type])];
    }
}
