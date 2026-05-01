<?php

namespace App\Http\Controllers;

use App\Models\FootballMatch;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MatchController extends Controller
{
    /**
     * List matches with optional filters.
     */
    public function index(Request $request): JsonResponse
    {
        $limit = $request->get('limit', 10);
        $status = $request->get('status');

        $query = FootballMatch::with([
            'team1.country',
            'team2.country',
            'city.country',
            'stadium.city',
            'referee.country',
            'weather'
        ]);

        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }

        if ($request->filled('stage') && $request->stage !== 'all') {
            $query->where('stage', $request->stage);
        }

        if ($request->filled('city')) {
            $query->where(function ($q) use ($request) {
                $q->whereHas('city', function ($sq) use ($request) {
                    $sq->where('name', 'like', '%' . $request->city . '%');
                })->orWhereHas('stadium.city', function ($sq) use ($request) {
                    $sq->where('name', 'like', '%' . $request->city . '%');
                });
            });
        }

        if ($request->filled('team')) {
            $query->where(function ($q) use ($request) {
                $q->whereHas('team1', function ($sq) use ($request) {
                    $sq->where('name', 'like', '%' . $request->team . '%');
                })->orWhereHas('team2', function ($sq) use ($request) {
                    $sq->where('name', 'like', '%' . $request->team . '%');
                });
            });
        }

        $perPage = $request->get('per_page', $limit);

        $paginator = $query->orderBy('match_date', 'asc')
                         ->orderBy('match_time', 'asc')
                         ->paginate($perPage);

        $paginator->getCollection()->transform(function ($m) {
            $t1Country = $m->team1 ? $m->team1->country : null;
            $t2Country = $m->team2 ? $m->team2->country : null;

            // Use direct city relation or fallback to stadium city
            $cityName = $m->city ? $m->city->name : ($m->stadium && $m->stadium->city ? $m->stadium->city->name : 'TBD');
            $venueName = $m->stadium ? $m->stadium->name : 'TBD';

            return [
                'id' => $m->id,
                'stage' => $m->stage,
                'group_name' => $m->group_name,
                'team1' => [
                    'id' => $m->team1_id,
                    'name' => $m->team1 ? $m->team1->name : 'TBD',
                    'flag' => $t1Country ? "https://flagcdn.com/w320/" . strtolower($t1Country->code) . ".png" : '',
                    'code' => $t1Country ? strtolower($t1Country->code) : '',
                ],
                'team2' => [
                    'id' => $m->team2_id,
                    'name' => $m->team2 ? $m->team2->name : 'TBD',
                    'flag' => $t2Country ? "https://flagcdn.com/w320/" . strtolower($t2Country->code) . ".png" : '',
                    'code' => $t2Country ? strtolower($t2Country->code) : '',
                ],
                'venue' => $venueName,
                'city' => $cityName,
                'match_date' => $m->match_date ? $m->match_date->format('Y-m-d') : null,
                'match_time' => $m->match_time,
                'status' => $m->status,
                'home_score' => $m->home_score,
                'away_score' => $m->away_score,
                'referee' => $m->referee ? $m->referee->name : 'TBD',
                'weather' => $m->weather ? [
                    'condition' => $m->weather->condition,
                    'temp' => $m->weather->temperature
                ] : null
            ];
        });

        return response()->json($paginator);
    }

    /**
     * Show a single match with full details.
     */
    public function show(int $id): JsonResponse
    {
        $match = FootballMatch::with([
            'team1.confederation',
            'team2.confederation',
            'stadium.city.country',
            'city.country',
            'referee.country',
            'weather'
        ])->findOrFail($id);

        return response()->json($match);
    }

    /**
     * Store a new match (Admin).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'team1_id'    => 'required|exists:teams,id',
            'team2_id'    => 'required|exists:teams,id',
            'stadium_id'  => 'nullable|exists:stadiums,id',
            'city_id'     => 'nullable|exists:cities,id',
            'referee_id'  => 'nullable|exists:referees,id',
            'weather_id'  => 'nullable|exists:weather,id',
            'match_date'  => 'required|date',
            'match_time'  => 'required',
            'stage'       => 'required|in:group,round_of_16,quarter,semi,final',
            'group_name'  => 'nullable|string',
            'status'      => 'in:upcoming,live,finished',
            'video_url'   => 'nullable|string',
        ]);

        $match = FootballMatch::create($validated);

        return response()->json($match->load(['team1', 'team2', 'stadium', 'city']), 201);
    }

    /**
     * Update a match (Admin).
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $match = FootballMatch::findOrFail($id);

        $validated = $request->validate([
            'team1_id'    => 'sometimes|required|exists:teams,id',
            'team2_id'    => 'sometimes|required|exists:teams,id',
            'stadium_id'  => 'nullable|exists:stadiums,id',
            'city_id'     => 'nullable|exists:cities,id',
            'referee_id'  => 'nullable|exists:referees,id',
            'weather_id'  => 'nullable|exists:weather,id',
            'match_date'  => 'sometimes|date',
            'match_time'  => 'sometimes',
            'stage'       => 'sometimes|in:group,round_of_16,quarter,semi,final',
            'group_name'  => 'nullable|string',
            'home_score'  => 'nullable|integer',
            'away_score'  => 'nullable|integer',
            'status'      => 'sometimes|in:upcoming,live,finished',
            'video_url'   => 'nullable|string',
        ]);

        $match->update($validated);

        return response()->json($match->load(['team1', 'team2', 'stadium', 'city']));
    }

    /**
     * Delete a match (Admin).
     */
    public function destroy(int $id): JsonResponse
    {
        FootballMatch::findOrFail($id)->delete();
        return response()->json(['message' => 'Match deleted']);
    }
}
