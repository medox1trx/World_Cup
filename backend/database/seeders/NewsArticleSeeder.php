<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class NewsArticleSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('news_articles')->truncate();

        // Use high-quality, high-reliability football/stadium images from Unsplash
        $images = [
            'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1000', // Stadium
            'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=1000', // Ball
            'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1000', // Crowd
            'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&q=80&w=1000', // Stadium Night
            'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=1000', // Player
            'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=1000', // Pitch
            'https://images.unsplash.com/photo-1510051640316-dee3f5633f3f?auto=format&fit=crop&q=80&w=1000', // Strategy
            'https://images.unsplash.com/photo-1516444465331-1601084a7da5?auto=format&fit=crop&q=80&w=1000', // Fans
            'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=1000', // Celebration
            'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=1000', // Sun over Stadium
            'https://images.unsplash.com/photo-1552667466-07770ae110d0?auto=format&fit=crop&q=80&w=1000', // Urban Football
            'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1000', // Trophy
            'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1000', // Teamwork
            'https://images.unsplash.com/photo-1503125558445-f62a31c1535b?auto=format&fit=crop&q=80&w=1000', // Cityscape
            'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&q=80&w=1000', // Flags
            'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1000', // Beach Football
            'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=1000', // Travel
            'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1000', // Party
            'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=1000', // Goal Post
            'https://images.unsplash.com/photo-1559027615-cd9d7a915490?auto=format&fit=crop&q=80&w=1000', // Volunteer
        ];

        $titles = [
            "FIFA World Cup 2026™: Match Schedule Revealed",
            "New York New Jersey to host FIFA World Cup 2026™ Final",
            "Estadio Azteca: The legendary venue for the Opening Match",
            "Ticket sales reaching record numbers for 2026",
            "Host Cities prepare for massive fan influx",
            "48 Teams: A New Era for the World Cup",
            "VIP Hospitality Packages now available",
            "The Greenest World Cup in history?",
            "Fan Festival locations announced across 3 nations",
            "Next-Gen Semi-Automated Offside for 2026",
            "Toronto and Vancouver ready to shine",
            "Mexico aims for a record third hosting",
            "Soccer Boom: 2026 expected to transform US Sports",
            "FIFA Ambassadors promote 'United 2026' vision",
            "Unified Security Protocol for the 3 nations",
            "New airline partnerships for World Cup travel",
            "Multicultural festivals to run alongside matches",
            "Youth tournament to accompany the World Cup",
            "Over 100,000 volunteers expected for 2026",
            "Long-term legacy plans for stadiums",
        ];

        $tags = ['STADES', 'FINALE', 'OUVERTURE', 'BILLETS', 'LOGISTIQUE', 'ÉQUIPES', 'HOSPITALITÉ', 'DURABILITÉ', 'FANS', 'TECHNOLOGIE', 'CANADA', 'MEXIQUE', 'USA', 'LÉGENDES', 'SÉCURITÉ', 'TRANSPORT', 'CULTURE', 'JEUNESSE', 'VOLONTAIRES', 'HÉRITAGE'];

        for ($i = 0; $i < 20; $i++) {
            DB::table('news_articles')->insert([
                'tag' => $tags[$i],
                'title' => $titles[$i],
                'description' => "Stay up to date with the latest developments as the world prepares for the biggest FIFA World Cup in history across North America.",
                'image_url' => $images[$i],
                'url' => '#',
                'source_name' => 'FIFA Official',
                'published_at' => Carbon::now()->subHours($i * 4),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
