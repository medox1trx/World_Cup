<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\FanZone;
use App\Models\FootballMatch;
use App\Models\Highlight;
use App\Models\Hospitality;
use App\Models\Stat;
use App\Models\TeamStanding;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

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
        $query = FootballMatch::with('tickets');

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
        $match = FootballMatch::with('tickets')->findOrFail($id);
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
            'stadium_image' => 'nullable|string',
            'video_url'   => 'nullable|string',
            'referee'    => 'nullable|string',
            'assistant_referees' => 'nullable|string',
            'weather_condition'  => 'nullable|string',
            'weather_temp'       => 'nullable|integer',
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
            'stadium_image' => 'nullable|string',
            'video_url'   => 'nullable|string',
            'referee'    => 'nullable|string',
            'assistant_referees' => 'nullable|string',
            'weather_condition'  => 'nullable|string',
            'weather_temp'       => 'nullable|integer',
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

    // ── HIGHLIGHTS (Admin & Public) ──────────────────────────
    public function indexHighlights(Request $request): JsonResponse
    {
        $highlights = Highlight::latest()
            ->withCount('comments')
            ->get();

        if ($user = $request->user()) {
            $userLikes = \DB::table('highlight_likes')
                ->where('user_id', $user->id)
                ->pluck('highlight_id')
                ->toArray();
            
            $highlights->map(function ($h) use ($userLikes) {
                $h->liked_by_user = in_array($h->id, $userLikes);
                return $h;
            });
        } else {
            $highlights->map(function ($h) {
                $h->liked_by_user = false;
                return $h;
            });
        }

        return response()->json($highlights);
    }

    public function storeHighlight(Request $request): JsonResponse
    {
        \Log::info('Store Highlight Request:', $request->all());
        
        try {
            $validated = $request->validate([
                'title'     => 'required|string',
                'image_url' => 'required',
                'duration'  => 'required',
                'category'  => 'required',
                'status'    => 'in:published,draft',
                'video_url' => 'nullable|string'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Validation Errors:', $e->errors());
            return response()->json(['errors' => $e->errors()], 422);
        }

        $highlight = Highlight::create($validated);
        return response()->json($highlight, 201);
    }

    public function updateHighlight(Request $request, Highlight $highlight): JsonResponse
    {
        \Log::info('Update Highlight Request ID: ' . $highlight->id, $request->all());

        try {
            $validated = $request->validate([
                'title'     => 'sometimes|string',
                'image_url' => 'sometimes',
                'duration'  => 'sometimes',
                'category'  => 'sometimes',
                'status'    => 'sometimes|in:published,draft',
                'video_url' => 'nullable|string'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Validation Errors:', $e->errors());
            return response()->json(['errors' => $e->errors()], 422);
        }

        $highlight->update($validated);
        return response()->json($highlight);
    }

    public function destroyHighlight(Highlight $highlight): JsonResponse
    {
        \Log::info('Destroy Highlight Request ID: ' . $highlight->id);
        $highlight->delete();
        return response()->json(['message' => 'Highlight deleted']);
    }

    public function incrementHighlightView(Highlight $highlight): JsonResponse
    {
        $highlight->increment('views');
        return response()->json(['views' => $highlight->views]);
    }

    public function toggleHighlightLike(Request $request, Highlight $highlight): JsonResponse
    {
        if (!$request->user()) {
            return response()->json(['message' => 'Veuillez vous connecter pour aimer.'], 401);
        }

        $userId = $request->user()->id;
        $exists = \DB::table('highlight_likes')
            ->where('user_id', $userId)
            ->where('highlight_id', $highlight->id)
            ->first();

        if ($exists) {
            \DB::table('highlight_likes')
                ->where('user_id', $userId)
                ->where('highlight_id', $highlight->id)
                ->delete();
            $highlight->decrement('likes');
            return response()->json(['likes' => $highlight->likes, 'liked' => false]);
        }

        \DB::table('highlight_likes')->insert([
            'user_id' => $userId,
            'highlight_id' => $highlight->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $highlight->increment('likes');
        return response()->json(['likes' => $highlight->likes, 'liked' => true]);
    }

    public function indexHighlightComments(Highlight $highlight): JsonResponse
    {
        $comments = $highlight->comments()->with('user')->latest()->get();
        return response()->json($comments);
    }

    public function storeHighlightComment(Request $request, Highlight $highlight): JsonResponse
    {
        if (!$request->user()) {
            return response()->json(['message' => 'Veuillez vous connecter pour commenter.'], 401);
        }

        $validated = $request->validate([
            'content'   => 'required|string',
        ]);

        $comment = $highlight->comments()->create([
            'content'   => $validated['content'],
            'user_id'   => $request->user()->id,
            'user_name' => $request->user()->name
        ]);

        return response()->json($comment->load('user'), 201);
    }

    // ── TICKETS (Admin & Public) ─────────────────────────────
    public function indexTickets(): JsonResponse
    {
        return response()->json(Ticket::with('match')->latest()->get());
    }

    public function storeTicket(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'match_id'  => 'required|exists:matches,id',
            'category'  => 'required|string',
            'price'     => 'required|numeric|min:0',
            'quantity'  => 'required|integer|min:0',
            'status'    => 'sometimes|in:available,sold_out'
        ]);

        $validated['available'] = $validated['quantity'];
        
        $ticket = Ticket::create($validated);
        return response()->json($ticket->load('match'), 201);
    }

    public function updateTicket(Request $request, Ticket $ticket): JsonResponse
    {
        $validated = $request->validate([
            'match_id'  => 'sometimes|exists:matches,id',
            'category'  => 'sometimes|string',
            'price'     => 'sometimes|numeric|min:0',
            'quantity'  => 'sometimes|integer|min:0',
            'status'    => 'sometimes|in:available,sold_out'
        ]);

        if (isset($validated['quantity'])) {
            // Simple logic: if quantity changes, update available (might be complex if sales exist)
            $diff = $validated['quantity'] - $ticket->quantity;
            $validated['available'] = max(0, $ticket->available + $diff);
        }

        $ticket->update($validated);
        return response()->json($ticket->load('match'));
    }

    public function destroyTicket(Ticket $ticket): JsonResponse
    {
        $ticket->delete();
        return response()->json(['message' => 'Ticket deleted']);
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

    // ── FAN ZONES ────────────────────────────────────────────────
    public function indexFanZones(): JsonResponse
    {
        $fanZones = FanZone::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        $grouped = $fanZones->groupBy('group_label')->map(function ($items, $group) {
            return [
                'label' => $group,
                'cities' => $items->map(function ($fz) {
                    return [
                        'key' => \Str::slug($fz->city_name),
                        'name' => $fz->city_name,
                        'country' => $fz->country,
                        'code' => $fz->country_code,
                        'stadium' => $fz->stadium_name,
                        'cap' => $fz->capacity,
                        'matches' => $fz->matches_count,
                        'zone' => $fz->zone_name,
                        'desc' => $fz->description,
                        'img' => $fz->image_url,
                        'is_centenary' => $fz->is_centenary,
                    ];
                })->values(),
            ];
        })->values();

        return response()->json($grouped);
    }

    public function storeFanZone(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'city_name' => 'required|string|max:100',
            'country' => 'required|string|max:100',
            'country_code' => 'required|string|max:10',
            'stadium_name' => 'required|string|max:150',
            'capacity' => 'required|string|max:50',
            'matches_count' => 'integer|min:0',
            'zone_name' => 'required|string|max:150',
            'description' => 'required|string',
            'image_url' => 'nullable|string',
            'opening_hours' => 'nullable|string',
            'is_centenary' => 'boolean',
            'group_label' => 'nullable|string',
            'sort_order' => 'integer|min:0',
        ]);

        $fanZone = FanZone::create($validated);
        return response()->json($fanZone, 201);
    }

    public function updateFanZone(Request $request, FanZone $fanZone): JsonResponse
    {
        $validated = $request->validate([
            'city_name' => 'sometimes|string|max:100',
            'country' => 'sometimes|string|max:100',
            'country_code' => 'sometimes|string|max:10',
            'stadium_name' => 'sometimes|string|max:150',
            'capacity' => 'sometimes|string|max:50',
            'matches_count' => 'sometimes|integer|min:0',
            'zone_name' => 'sometimes|string|max:150',
            'description' => 'sometimes|string',
            'image_url' => 'nullable|string',
            'opening_hours' => 'nullable|string',
            'is_centenary' => 'sometimes|boolean',
            'group_label' => 'nullable|string',
            'sort_order' => 'sometimes|integer|min:0',
            'is_active' => 'sometimes|boolean',
        ]);

        $fanZone->update($validated);
        return response()->json($fanZone);
    }

    public function destroyFanZone(FanZone $fanZone): JsonResponse
    {
        $fanZone->delete();
        return response()->json(['message' => 'Fan Zone deleted']);
    }

    // ── HOSPITALITIES ────────────────────────────────────────────
    public function indexHospitalities(): JsonResponse
    {
        $hospitalities = Hospitality::where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(function ($h) {
                return [
                    'tier' => $h->tier,
                    'price' => $h->price,
                    'badge' => $h->badge,
                    'featured' => $h->is_featured,
                    'perks' => $h->perks ?? [],
                    'cta' => $h->cta_text,
                    'img' => $h->image_url,
                ];
            });

        return response()->json($hospitalities);
    }

    public function storeHospitality(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'tier' => 'required|string|max:50',
            'price' => 'required|string|max:50',
            'badge' => 'nullable|string|max:50',
            'is_featured' => 'boolean',
            'description' => 'nullable|string',
            'perks' => 'nullable|array',
            'cta_text' => 'required|string|max:100',
            'image_url' => 'nullable|string',
            'sort_order' => 'integer|min:0',
        ]);

        $hospitality = Hospitality::create($validated);
        return response()->json($hospitality, 201);
    }

    public function updateHospitality(Request $request, Hospitality $hospitality): JsonResponse
    {
        $validated = $request->validate([
            'tier' => 'sometimes|string|max:50',
            'price' => 'sometimes|string|max:50',
            'badge' => 'nullable|string|max:50',
            'is_featured' => 'sometimes|boolean',
            'description' => 'nullable|string',
            'perks' => 'nullable|array',
            'cta_text' => 'sometimes|string|max:100',
            'image_url' => 'nullable|string',
            'sort_order' => 'sometimes|integer|min:0',
            'is_active' => 'sometimes|boolean',
        ]);

        $hospitality->update($validated);
        return response()->json($hospitality);
    }

    public function destroyHospitality(Hospitality $hospitality): JsonResponse
    {
        $hospitality->delete();
        return response()->json(['message' => 'Hospitality deleted']);
    }
}