<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\FootballMatch;
use App\Models\Stadium;
use App\Models\City;
use App\Models\Country;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class StatsController extends Controller
{
    /**
     * Get tournament statistics (Public).
     */
    public function index(): JsonResponse
    {
        $stats = Cache::remember('tournament_stats', 3600, function () {
            return [
                ['value' => (string) Team::count(),          'label' => 'Teams'],
                ['value' => (string) FootballMatch::count(),  'label' => 'Matches'],
                ['value' => (string) Stadium::count(),        'label' => 'Stadiums'],
                ['value' => (string) City::count(),           'label' => 'Host Cities'],
                ['value' => '800+',                           'label' => 'Expected Goals'],
                ['value' => '3.5M',                           'label' => 'Spectators'],
            ];
        });

        return response()->json($stats);
    }

    /**
     * Get host countries (Public).
     */
    public function hosts(): JsonResponse
    {
        $hosts = Cache::remember('tournament_hosts', 86400, function () {
            $hostCodes = ['US', 'MX', 'CA'];

            return Country::whereIn('code', $hostCodes)
                ->get()
                ->sortBy(function ($c) use ($hostCodes) {
                    return array_search($c->code, $hostCodes);
                })
                ->map(function ($c) {
                    $backgrounds = [
                        'MX' => 'linear-gradient(45deg, #006847, #ffffff, #ce1126)',
                        'US' => 'linear-gradient(45deg, #002868, #ffffff, #bf0a30)',
                        'CA' => 'linear-gradient(45deg, #ff0000, #ffffff, #ff0000)',
                    ];

                    return [
                        'name' => $c->name === 'United States' ? 'USA' : $c->name,
                        'code' => strtolower($c->code),
                        'flag' => "https://flagcdn.com/w640/" . strtolower($c->code) . ".png",
                        'bg'   => $backgrounds[$c->code] ?? '#333'
                    ];
                })->values();
        });

        return response()->json($hosts);
    }
}
