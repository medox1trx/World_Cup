<?php

namespace Database\Seeders;

use App\Models\FootballMatch;
use App\Models\Ticket;
use Illuminate\Database\Seeder;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $matches = FootballMatch::all();

        if ($matches->isEmpty()) {
            return;
        }

        $categories = [
            ['name' => 'Category 1', 'price' => 250.00],
            ['name' => 'Category 2', 'price' => 175.00],
            ['name' => 'Category 3', 'price' => 100.00],
            ['name' => 'VIP', 'price' => 750.00],
        ];

        foreach ($matches as $match) {
            foreach ($categories as $category) {
                $quantity = rand(50, 500);
                $available = rand(0, $quantity);
                
                Ticket::create([
                    'match_id' => $match->id,
                    'category' => $category['name'],
                    'price' => $category['price'],
                    'quantity' => $quantity,
                    'available' => $available,
                    'status' => $available > 0 ? 'available' : 'sold_out',
                ]);
            }
        }
    }
}
