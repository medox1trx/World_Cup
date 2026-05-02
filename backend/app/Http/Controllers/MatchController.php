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
            $t1 = $m->team1;
            $t2 = $m->team2;

            // Flags & Codes with fallbacks
            $t1Flag = '';
            if ($t1) {
                if ($t1->country && $t1->country->code) {
                    $t1Flag = "https://flagcdn.com/w320/" . strtolower($t1->country->code) . ".png";
                } else {
                    $t1Flag = $t1->flag;
                }
            }

            $t2Flag = '';
            if ($t2) {
                if ($t2->country && $t2->country->code) {
                    $t2Flag = "https://flagcdn.com/w320/" . strtolower($t2->country->code) . ".png";
                } else {
                    $t2Flag = $t2->flag;
                }
            }

            $t1Code = $t1 ? ($t1->country ? strtolower($t1->country->code) : strtolower($t1->code)) : '';
            $t2Code = $t2 ? ($t2->country ? strtolower($t2->country->code) : strtolower($t2->code)) : '';

            // Use direct city relation or fallback to stadium city
            $cityName = $m->city ? $m->city->name : ($m->stadium && $m->stadium->city ? $m->stadium->city->name : 'TBD');
            $venueName = $m->stadium ? $m->stadium->name : ($m->venue ?: 'TBD');

            return [
                'id' => $m->id,
                'stage' => $m->stage,
                'group_name' => $m->group_name,
                'team1' => [
                    'id' => $m->team1_id,
                    'name' => $t1 ? $t1->name : 'TBD',
                    'flag' => $t1Flag,
                    'code' => $t1Code,
                ],
                'team2' => [
                    'id' => $m->team2_id,
                    'name' => $t2 ? $t2->name : 'TBD',
                    'flag' => $t2Flag,
                    'code' => $t2Code,
                ],
                'venue' => $venueName,
                'city' => $cityName,
                'stadium' => $m->stadium ? [
                    'name' => $m->stadium->name,
                    'capacity' => $m->stadium->capacity,
                    'image' => $m->stadium->image_url,
                ] : null,
                'match_date' => $m->match_date ? $m->match_date->format('Y-m-d') : null,
                'match_time' => $m->match_time ? substr($m->match_time, 0, 5) : null,
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
