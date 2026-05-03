<?php

namespace Database\Seeders;

use App\Models\Hospitality;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HospitalitySeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Hospitality::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        
        $hospitalities = [
            [
                'tier' => 'Match Club',
                'price' => '$950',
                'badge' => null,
                'is_featured' => false,
                'description' => 'The ultimate entry into official World Cup hospitality. Enjoy a festive, shared lounge experience with fantastic street-food dining within the stadium perimeter.',
                'perks' => [
                    'Category 1 or 2 Match Ticket',
                    'Shared hospitality village or lounge access',
                    'Street-food style dining experience',
                    'Beer, wine, and soft drinks included',
                    'Pre-match and post-match entertainment',
                    'Official World Cup commemorative gift',
                ],
                'cta_text' => 'Book Now',
                'image_url' => 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=700&q=80&fit=crop', // Lounge setting
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'tier' => 'Business Seat',
                'price' => '$3,500',
                'badge' => 'Most Popular',
                'is_featured' => true,
                'description' => 'Experience the World Cup with premium comfort. Unwind in an upscale shared lounge and savor chef-curated dining before taking your prime stadium seat.',
                'perks' => [
                    'Prime seating in the lower/mid tiers',
                    'Access to a premium shared lounge',
                    'Chef-curated premium buffet',
                    'Champagne, premium spirits, and wine',
                    'Dedicated VIP entrance',
                    'Parking pass (subject to availability)',
                    'Official match program and premium gift',
                ],
                'cta_text' => 'Book Now',
                'image_url' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80&fit=crop', // Premium stadium seats/lounge
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'tier' => 'Pearl Lounge',
                'price' => 'On Request',
                'badge' => 'Exclusive',
                'is_featured' => false,
                'description' => 'The pinnacle of luxury at the 2026 World Cup. Immerse yourself in an ultra-premium private environment with the best midfield views and bespoke service.',
                'perks' => [
                    'Best-in-class midfield stadium seating',
                    'Exclusive access to the Pearl Lounge or Private Suite',
                    'Gourmet fine dining with personal chef',
                    'Sommelier-selected wines and signature cocktails',
                    'Meet-and-greet with FIFA Legends',
                    'Dedicated personal concierge service',
                    'VIP stadium parking and fast-track entry',
                ],
                'cta_text' => 'Contact Sales',
                'image_url' => 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80&fit=crop', // Luxury box
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($hospitalities as $hospitality) {
            Hospitality::create($hospitality);
        }
    }
}