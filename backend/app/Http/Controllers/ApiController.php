<?php

namespace App\Http\Controllers;

use App\Models\FootballMatch;
use App\Models\Stat;
use App\Models\TeamStanding;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class ApiController extends Controller
{
    // ── GET /api/v1/news ─────────────────────────────────────
    public function news(Request $request): JsonResponse
    {
        $q       = $request->get('q', 'FIFA World Cup');
        $apiKey  = env('NEWS_API_KEY');
        $lang    = $request->get('language', 'en');
        $pageSize = $request->get('pageSize', 12);

        $response = Http::get('https://newsapi.org/v2/everything', [
            'q'        => $q,
            'apiKey'   => $apiKey,
            'language' => $lang,
            'sortBy'   => 'publishedAt',
            'pageSize' => $pageSize,
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch news'], 500);
        }

        return response()->json($response->json());
    }

    // ── GET /api/v1/stats ────────────────────────────────────
    public function stats(): JsonResponse
    {
        $stats = Stat::orderBy('sort_order')->get();
        return response()->json($stats);
    }

    // ── GET /api/v1/standings ────────────────────────────────
    public function standings(): JsonResponse
    {
        $standings = TeamStanding::orderBy('group_name')->orderBy('position')->get();
        
        $grouped = $standings->groupBy('group_name')->map(function ($items, $group) {
            return [
                'name' => $group,
                'teams' => $items->map(function ($t) {
                    return [
                        'pos' => $t->position,
                        'team' => $t->team_name,
                        'code' => $t->team_code,
                        'pld' => $t->played,
                        'w'   => $t->won,
                        'd'   => $t->drawn,
                        'l'   => $t->lost,
                        'gf'  => $t->goals_for,
                        'ga'  => $t->goals_against,
                        'gd'  => $t->goal_difference,
                        'pts' => $t->points
                    ];
                })
            ];
        })->values();

        return response()->json($grouped);
    }

    // ── GET /api/v1/matches ──────────────────────────────────
    public function matches(Request $request): JsonResponse
    {
        $query = FootballMatch::query();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('stage')) {
            $query->where('stage', $request->stage);
        }

        $query->orderBy('match_date')->orderBy('match_time');

        $limit   = $request->get('limit', 50);
        $matches = $query->limit($limit)->get();

        return response()->json($matches);
    }

    // ── GET /api/v1/matches/{id} ─────────────────────────────
    public function match(int $id): JsonResponse
    {
        $match = FootballMatch::findOrFail($id);
        return response()->json($match);
    }

    // ── POST /api/v1/matches ─────────────────────────────────
    public function storeMatch(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'home_team'  => 'required|string|max:100',
            'away_team'  => 'required|string|max:100',
            'home_flag'  => 'nullable|string',
            'away_flag'  => 'nullable|string',
            'venue'      => 'required|string|max:150',
            'city'       => 'required|string|max:100',
            'match_date' => 'required|date',
            'match_time' => 'required',
            'stage'      => 'required|in:group,round_of_16,quarter,semi,final',
            'group_name' => 'nullable|string',
            'status'     => 'in:upcoming,live,finished',
        ]);

        $match = FootballMatch::create($validated);
        return response()->json($match, 201);
    }

    // ── PUT /api/v1/matches/{id} ─────────────────────────────
    public function updateMatch(Request $request, int $id): JsonResponse
    {
        $match = FootballMatch::findOrFail($id);

        $validated = $request->validate([
            'home_team'  => 'sometimes|string|max:100',
            'away_team'  => 'sometimes|string|max:100',
            'home_flag'  => 'nullable|string',
            'away_flag'  => 'nullable|string',
            'venue'      => 'sometimes|string|max:150',
            'city'       => 'sometimes|string|max:100',
            'match_date' => 'sometimes|date',
            'match_time' => 'sometimes',
            'stage'      => 'sometimes|in:group,round_of_16,quarter,semi,final',
            'group_name' => 'nullable|string',
            'home_score' => 'nullable|integer',
            'away_score' => 'nullable|integer',
            'status'     => 'sometimes|in:upcoming,live,finished',
        ]);

        $match->update($validated);
        return response()->json($match);
    }

    // ── DELETE /api/v1/matches/{id} ──────────────────────────
    public function destroyMatch(int $id): JsonResponse
    {
        FootballMatch::findOrFail($id)->delete();
        return response()->json(['message' => 'Match deleted']);
    }

    // ── GET /api/v1/search?q=xxx ─────────────────────────────
    public function search(Request $request): JsonResponse
    {
        $q = $request->get('q', '');

        $results = FootballMatch::where('home_team', 'like', "%{$q}%")
            ->orWhere('away_team', 'like', "%{$q}%")
            ->orWhere('venue',     'like', "%{$q}%")
            ->orWhere('city',      'like', "%{$q}%")
            ->limit(10)
            ->get()
            ->map(function ($m) {
                return [
                    'id'   => $m->id,
                    'name' => $m->home_flag . ' ' . $m->home_team . ' vs ' . $m->away_flag . ' ' . $m->away_team,
                    'type' => 'match',
                ];
            });

        return response()->json($results);
    }
}