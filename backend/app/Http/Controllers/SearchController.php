<?php

namespace App\Http\Controllers;

use App\Models\FanZone;
use App\Models\Hospitality;
use App\Models\City;
use App\Models\Team;
use App\Models\FootballMatch;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SearchController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $q = $request->get('q', '');

        if (empty($q) || strlen($q) < 2) {
            return response()->json([
                'fan_zones' => [],
                'hospitality' => [],
                'cities' => [],
                'teams' => [],
                'matches' => [],
            ]);
        }

        $fanZones = FanZone::with(['city', 'country'])
            ->where('status', '!=', 'inactive')
            ->where(function($query) use ($q) {
                $query->where('stadium_name', 'like', "%{$q}%")
                      ->orWhere('zone_label', 'like', "%{$q}%")
                      ->orWhere('description', 'like', "%{$q}%");
            })
            ->limit(5)->get();

        $hospitality = Hospitality::with(['city', 'country'])
            ->where('is_active', true)
            ->where(function($query) use ($q) {
                $query->where('tier', 'like', "%{$q}%")
                      ->orWhere('description', 'like', "%{$q}%");
            })
            ->limit(5)->get();

        $cities = City::with('country')
            ->where('name', 'like', "%{$q}%")
            ->limit(5)->get();

        $teams = Team::with('country')
            ->where('name', 'like', "%{$q}%")
            ->limit(5)->get();

        $matches = FootballMatch::with(['team1', 'team2', 'stadium', 'city'])
            ->whereHas('team1', function($query) use ($q) {
                $query->where('name', 'like', "%{$q}%");
            })
            ->orWhereHas('team2', function($query) use ($q) {
                $query->where('name', 'like', "%{$q}%");
            })
            ->orWhereHas('stadium', function($query) use ($q) {
                $query->where('name', 'like', "%{$q}%");
            })
            ->limit(5)->get()->map(function($m) {
                 return [
                     'id' => $m->id,
                     'team1' => $m->team1 ? $m->team1->name : 'TBD',
                     'team2' => $m->team2 ? $m->team2->name : 'TBD',
                     'match_date' => $m->match_date,
                     'match_time' => $m->match_time,
                 ];
            });

        return response()->json([
            'fan_zones' => $fanZones,
            'hospitality' => $hospitality,
            'cities' => $cities,
            'teams' => $teams,
            'matches' => $matches,
        ]);
    }
}
