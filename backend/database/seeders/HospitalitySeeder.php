<?php

namespace Database\Seeders;

use App\Models\Hospitality;
use App\Models\City;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class HospitalitySeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Hospitality::truncate();
        Schema::enableForeignKeyConstraints();

        $hospitalities = [
            [
                'tier' => 'Match Club Lounge',
                'price' => '950',
                'badge' => 'Classic Entry',
                'city_name' => 'New York/New Jersey',
                'description' => 'The perfect entry into official hospitality. Enjoy a festive, shared lounge experience with gourmet street food dining inside the stadium perimeter.',
                'perks' => [
                    'Category 1 Match Ticket',
                    'Shared premium pavilion access',
                    'International street-food menu',
                    'Beer, premium wine, and soft drinks',
                    'Commemorative tournament gift'
                ],
                'cta_text' => 'Book Tiers',
                'image_source' => 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800',
            ],
            [
                'tier' => 'Business Seat Elite',
                'price' => '3500',
                'badge' => 'Most Popular',
                'city_name' => 'Los Angeles',
                'description' => 'Experience the World Cup with premium comfort. Unwind in an upscale shared lounge and savor chef-curated buffets before taking your prime lower-tier seat.',
                'perks' => [
                    'Prime lower/mid-tier seating',
                    'Access to upscale executive lounge',
                    'Chef-curated hot & cold buffet',
                    'Champagne, spirits, and wine select',
                    'VIP fast-track entrance access'
                ],
                'cta_text' => 'Book Premium',
                'image_source' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800',
            ],
            [
                'tier' => 'Pearl Lounge VIP',
                'price' => '9500',
                'badge' => 'Exclusive Luxury',
                'city_name' => 'Miami',
                'description' => 'The pinnacle of sports luxury. Immerse yourself in an ultra-premium private environment with the absolute best midfield views and bespoke personal service.',
                'perks' => [
                    'Best-in-class midfield luxury seating',
                    'Private VIP box suite access',
                    '5-course fine dining gourmet menu',
                    'Sommelier-selected wines & cocktails',
                    'Meet & Greet with FIFA Legends'
                ],
                'cta_text' => 'Inquire Now',
                'image_source' => 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800',
            ],
            [
                'tier' => 'Pavilion Suite',
                'price' => '2800',
                'badge' => 'Scenic View',
                'city_name' => 'Vancouver',
                'description' => 'Celebrate high above the pitch. Seamlessly blend panoramic natural views with top-class indoor and outdoor modern lounge facilities.',
                'perks' => [
                    'Outdoor balcony stadium seating',
                    'Panoramic club lounge access',
                    'Live cooking stations & buffets',
                    'Craft beer & premium spirits',
                    'Commemorative gift & match program'
                ],
                'cta_text' => 'Book Suite',
                'image_source' => 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=800',
            ],
            [
                'tier' => 'Presidential Midfield',
                'price' => '8500',
                'badge' => 'Presidential',
                'city_name' => 'Dallas',
                'description' => 'Unparalleled prestige and maximum privacy. Host your partners or guests in an elegant, state-of-the-art private suite with premium red-carpet service.',
                'perks' => [
                    'Private skybox directly at midfield',
                    'Personal chef & sommelier service',
                    'Ultra-premium dining & champagne',
                    'Reserved VIP parking & private entry',
                    'Exclusive historical memorabilia gift'
                ],
                'cta_text' => 'Inquire VIP',
                'image_source' => 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800',
            ],
            [
                'tier' => 'Gold Club Experience',
                'price' => '4200',
                'badge' => 'High Demand',
                'city_name' => 'Toronto',
                'description' => 'Sleek, modern, and exciting. Enjoy a premium vibrant lounge atmosphere featuring live DJ entertainment and top-class cocktail bars.',
                'perks' => [
                    'Category 1 prime ticket included',
                    'Vibrant party club lounge access',
                    'Artisanal tasting menus & tapas',
                    'Signature cocktails and mocktails',
                    'Dedicated VIP concierge desk'
                ],
                'cta_text' => 'Book Club',
                'image_source' => 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=800',
            ],
            [
                'tier' => 'Skybox Private Suite',
                'price' => '5500',
                'badge' => 'Corporate Box',
                'city_name' => 'Atlanta',
                'description' => 'A fully private experience dedicated to business networking or family gatherings. Includes custom branding opportunities and direct access to outdoor gallery seats.',
                'perks' => [
                    'Fully private 12-person suite box',
                    'Customizable food & beverage packages',
                    'Personal host and service staff',
                    'Fast-track private stadium entrance',
                    'Full suite branding and TV controls'
                ],
                'cta_text' => 'Reserve Suite',
                'image_source' => 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800',
            ],
            [
                'tier' => 'Stadium Club Lounge',
                'price' => '2100',
                'badge' => 'Excellent Value',
                'city_name' => 'San Francisco',
                'description' => 'Enjoy elite pitch access, pre-match sideline tours, and a relaxed, upscale environment to socialize with other passionate football lovers.',
                'perks' => [
                    'Sideline tour opportunity',
                    'Upscale casual lounge access',
                    'Carvery stations & gourmet salads',
                    'Local craft beers and premium wines',
                    'Exclusive trivia & fan matches'
                ],
                'cta_text' => 'Book Club',
                'image_source' => 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800',
            ],
            [
                'tier' => 'Legends Lounge Tribute',
                'price' => '3900',
                'badge' => 'Collector Item',
                'city_name' => 'Boston',
                'description' => 'Take home unforgettable memories. Dine with legendary World Cup icons, watch exclusive analysis, and secure rare signed tournament collectibles.',
                'perks' => [
                    'Category 1 prime seating',
                    'Q&A panel with FIFA Legends',
                    'Gourmet plated dining menu',
                    'Signed collectible memorabilia',
                    'Premium photography studio session'
                ],
                'cta_text' => 'Book Legends',
                'image_source' => 'https://images.unsplash.com/photo-1489945052260-4f21c52268b9?q=80&w=800',
            ],
            [
                'tier' => 'Fan Pavilion Garden',
                'price' => '1200',
                'badge' => 'Festive Spirit',
                'city_name' => 'Mexico City',
                'description' => 'A celebration of global soccer culture in a high-energy outdoor festival lounge. Perfect for groups wishing to sing, cheer, and taste local delicacies.',
                'perks' => [
                    'Category 2 seating ticket',
                    'High-energy open-air garden access',
                    'Traditional local cuisine buffet',
                    'Cold beers, margaritas, and soft drinks',
                    'Interactive fan games & live band'
                ],
                'cta_text' => 'Book Garden',
                'image_source' => 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800',
            ],
        ];

        Storage::disk('public')->makeDirectory('uploads/hospitalities');

        $ctx = stream_context_create([
            'http' => [
                'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\r\n"
            ]
        ]);

        $this->command->info('Downloading and stocking premium hospitality images locally...');

        foreach ($hospitalities as $idx => $h) {
            $city = City::where('name', $h['city_name'])->first();
            $slug = Str::slug($h['tier']);
            $filename = "uploads/hospitalities/seeder_{$slug}.jpg";
            $dbPath = $filename;

            try {
                $this->command->info("Downloading image for: {$h['tier']}");
                $imgData = @file_get_contents($h['image_source'], false, $ctx);
                if ($imgData !== false) {
                    Storage::disk('public')->put($filename, $imgData);
                } else {
                    $this->command->warn("Fallback to source URL for: {$h['tier']}");
                    $dbPath = $h['image_source'];
                }
            } catch (\Exception $e) {
                $this->command->warn("Error saving image for: {$h['tier']}. Using direct URL.");
                $dbPath = $h['image_source'];
            }

            Hospitality::create([
                'city_id'     => $city ? $city->id : 1,
                'tier'        => $h['tier'],
                'price'       => $h['price'],
                'badge'       => $h['badge'],
                'description' => $h['description'],
                'perks'       => $h['perks'],
                'cta_text'    => $h['cta_text'],
                'image_url'   => $dbPath,
                'is_active'   => true,
                'sort_order'  => $idx + 1,
            ]);
        }

        $this->command->info('HospitalitySeeder successfully populated 10 premium hospitality packages with local saved images!');
    }
}