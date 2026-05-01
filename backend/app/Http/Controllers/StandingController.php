<?php

namespace App\Http\Controllers;

use App\Models\TeamStanding;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class StandingController extends Controller
{
    /**
     * List group standings (Public).
     */
    public function index(): JsonResponse
    {
        $grouped = Cache::remember('tournament_standings', 3600, function () {
            // Load relationships to get accurate names/codes if available
            $standings = TeamStanding::with(['team', 'group'])->get();

            return $standings->groupBy(function($s) {
                return $s->group ? $s->group->name : $s->group_name;
            })->map(function ($items, $groupName) {
                return [
                    'name' => $groupName,
                    'teams' => $items->sortBy('position')->map(function ($s) {
                        $teamName = $s->team ? $s->team->name : $s->team_name;
                        $teamCode = $s->team_code;
                        
                        // If we have a team relation, prefer its country code for flag
                        if ($s->team && $s->team->country) {
                            $teamCode = $s->team->country->code;
                        }

                        return [
                            'id'   => $s->id,
                            'pos'  => $s->position,
                            'team' => $teamName,
                            'code' => $teamCode,
                            'flag' => $teamCode ? "https://flagcdn.com/w40/" . strtolower($teamCode) . ".png" : '',
                            'pld'  => $s->played,
                            'w'    => $s->won,
                            'd'    => $s->drawn,
                            'l'    => $s->lost,
                            'gf'   => $s->goals_for,
                            'ga'   => $s->goals_against,
                            'gd'   => $s->goal_difference,
                            'pts'  => $s->points
                        ];
                    })->values()
                ];
            })->values();
        });

        return response()->json($grouped);
    }
}
