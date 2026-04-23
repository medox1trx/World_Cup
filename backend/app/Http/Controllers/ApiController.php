<?php

namespace App\Http\Controllers;

use App\Models\Accommodation;
use App\Models\City;
use App\Models\Comment;
use App\Models\FanZone;
use App\Models\FootballMatch;
use App\Models\Highlight;
use App\Models\Hospitality;
use App\Models\Referee;
use App\Models\Reservation;
use App\Models\Stat;
use App\Models\TeamStanding;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ApiController extends Controller
{
    // ── GET /api/v1/news ─────────────────────────────────────
    public function news(Request $request): JsonResponse
    {
        $limit = $request->get('pageSize', 12);
        $q     = $request->get('q', '');

        $query = \App\Models\NewsArticle::query();

        if ($q && $q !== 'FIFA World Cup') {
            $query->where('tag', 'like', "%{$q}%")
                  ->orWhere('title', 'like', "%{$q}%");
        }

        $articles = $query->orderBy('published_at', 'desc')
                          ->limit($limit)
                          ->get()
                          ->map(function ($article) {
                              return [
                                  'id'          => $article->id,
                                  'tag'         => $article->tag,
                                  'title'       => $article->title,
                                  'description' => $article->description,
                                  'urlToImage'  => $article->image_url,
                                  'url'         => $article->url,
                                  'source'      => ['name' => $article->source_name],
                                  'publishedAt' => $article->published_at,
                              ];
                          });

        return response()->json([
            'status'       => 'ok',
            'totalResults' => $articles->count(),
            'articles'     => $articles
        ]);
    }

    // ── POST /api/v1/admin/news ─────────────────────────────
    public function storeNews(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'tag'         => 'nullable|string',
            'title'       => 'required|string',
            'description' => 'required|string',
            'image_url'   => 'nullable|string',
            'url'         => 'nullable|string',
            'source_name' => 'nullable|string',
            'published_at'=> 'nullable|date',
        ]);

        $article = \App\Models\NewsArticle::create([
            'tag'         => $validated['tag'] ?? 'Actualités',
            'title'       => $validated['title'],
            'description' => $validated['description'],
            'image_url'   => $validated['image_url'] ?? 'https://www.saurenergy.me/wp-content/uploads/2022/11/front-21.png',
            'url'         => $validated['url'] ?? '#',
            'source_name' => $validated['source_name'] ?? 'FIFA Official',
            'published_at'=> $validated['published_at'] ?? now(),
        ]);

        return response()->json($article, 201);
    }

    // ── PUT /api/v1/admin/news/{id} ─────────────────────────
    public function updateNews(Request $request, int $id): JsonResponse
    {
        $article = \App\Models\NewsArticle::findOrFail($id);

        $validated = $request->validate([
            'tag'         => 'nullable|string',
            'title'       => 'sometimes|string',
            'description' => 'sometimes|string',
            'image_url'   => 'nullable|string',
            'url'         => 'nullable|string',
            'source_name' => 'nullable|string',
            'published_at'=> 'nullable|date',
        ]);

        $article->update($validated);
        return response()->json($article);
    }

    // ── DELETE /api/v1/admin/news/{id} ──────────────────────
    public function destroyNews(int $id): JsonResponse
    {
        \App\Models\NewsArticle::findOrFail($id)->delete();
        return response()->json(['message' => 'Article deleted']);
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
        $query = FootballMatch::with(['tickets', 'homeTeam', 'awayTeam']);

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
        $match = FootballMatch::with(['tickets', 'homeTeam', 'awayTeam'])->findOrFail($id);
        return response()->json($match);
    }

    // ── POST /api/v1/matches ─────────────────────────────────
    public function storeMatch(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'home_team_id' => 'required|exists:teams,id',
            'away_team_id' => 'required|exists:teams,id',
            'home_team'  => 'nullable|string|max:100',
            'away_team'  => 'nullable|string|max:100',
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
        return response()->json($match->load(['homeTeam', 'awayTeam']), 201);
    }

    // ── PUT /api/v1/matches/{id} ─────────────────────────────
    public function updateMatch(Request $request, int $id): JsonResponse
    {
        $match = FootballMatch::findOrFail($id);

        $validated = $request->validate([
            'home_team_id' => 'sometimes|required|exists:teams,id',
            'away_team_id' => 'sometimes|required|exists:teams,id',
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
        return response()->json($match->load(['homeTeam', 'awayTeam']));
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

    // ── FAN ZONES (Public) ─────────────────────────────────────
    public function indexFanZones(): JsonResponse
    {
        $fanZones = FanZone::where('is_active', true)->orderBy('sort_order')->get();
        
        $grouped = $fanZones->groupBy('group_label')->map(function ($zones, $label) {
            $cities = $zones->map(function ($z) {
                return [
                    'key' => $z->city_name . '-' . strtolower($z->country_code),
                    'name' => $z->city_name,
                    'country' => $z->country,
                    'code' => $z->country_code,
                    'stadium' => $z->stadium_name,
                    'cap' => $z->capacity,
                    'matches' => $z->matches_count,
                    'zone' => $z->zone_name,
                    'desc' => $z->description,
                    'img' => $z->image_url,
                    'opening_hours' => $z->opening_hours,
                    'is_centenary' => $z->is_centenary,
                ];
            })->toArray();
            
            return [
                'label' => $label,
                'cities' => $cities,
            ];
        })->values();

        return response()->json($grouped);
    }

    // ── FAN ZONES (Admin) ─────────────────────────────────────
    public function storeFanZone(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'city_name' => 'required|string|max:100',
            'country' => 'required|string|max:100',
            'country_code' => 'required|string|max:10',
            'stadium_name' => 'required|string|max:150',
            'capacity' => 'required|string|max:50',
            'matches_count' => 'required|integer|min:0',
            'zone_name' => 'required|string|max:150',
            'description' => 'required|string',
            'image_url' => 'nullable|string',
            'opening_hours' => 'nullable|string',
            'is_centenary' => 'boolean',
            'group_label' => 'required|string|max:100',
            'sort_order' => 'integer|min:0',
            'is_active' => 'boolean',
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
            'is_centenary' => 'boolean',
            'group_label' => 'sometimes|string|max:100',
            'sort_order' => 'sometimes|integer|min:0',
            'is_active' => 'sometimes|boolean',
        ]);

        $fanZone->update($validated);
        return response()->json($fanZone);
    }

    public function destroyFanZone(FanZone $fanZone): JsonResponse
    {
        $fanZone->delete();
        return response()->json(['message' => 'Fan zone deleted']);
    }

    // ── FAN ZONES (Admin - All including inactive) ─────────────
    public function indexAllFanZones(): JsonResponse
    {
        $fanZones = FanZone::orderBy('sort_order')->get();
        
        $grouped = $fanZones->groupBy('group_label')->map(function ($zones, $label) {
            $cities = $zones->map(function ($z) {
                return [
                    'id' => $z->id,
                    'key' => $z->city_name . '-' . strtolower($z->country_code),
                    'name' => $z->city_name,
                    'country' => $z->country,
                    'country_code' => $z->country_code,
                    'city_name' => $z->city_name,
                    'country' => $z->country,
                    'country_code' => $z->country_code,
                    'stadium_name' => $z->stadium_name,
                    'capacity' => $z->capacity,
                    'matches_count' => $z->matches_count,
                    'zone_name' => $z->zone_name,
                    'description' => $z->description,
                    'image_url' => $z->image_url,
                    'opening_hours' => $z->opening_hours,
                    'is_centenary' => $z->is_centenary,
                    'group_label' => $z->group_label,
                    'sort_order' => $z->sort_order,
                    'is_active' => $z->is_active,
                ];
            })->toArray();
            
            return [
                'label' => $label,
                'cities' => $cities,
            ];
        })->values();

        return response()->json($grouped);
    }

    // ── REFEREES (Public & Admin) ──────────────────────────────
    public function indexReferees(): JsonResponse
    {
        return response()->json(Referee::all());
    }

    public function showReferee(Referee $referee): JsonResponse
    {
        return response()->json($referee);
    }

    public function storeReferee(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'first_name'         => 'required|string|max:100',
            'last_name'          => 'required|string|max:100',
            'nationality'        => 'required|string|max:100',
            'nationality_code'   => 'required|string|max:10',
            'role'               => 'required|string',
            'age'                => 'required|integer|min:18',
            'experience_years'   => 'required|integer|min:0',
            'matches_officiated' => 'required|integer|min:0',
            'photo_url'          => 'nullable|string',
            'fifa_badge'         => 'boolean',
            'notes'              => 'nullable|string',
        ]);

        $referee = Referee::create($validated);
        return response()->json($referee, 201);
    }

    public function updateReferee(Request $request, Referee $referee): JsonResponse
    {
        $validated = $request->validate([
            'first_name'         => 'sometimes|string|max:100',
            'last_name'          => 'sometimes|string|max:100',
            'nationality'        => 'sometimes|string|max:100',
            'nationality_code'   => 'sometimes|string|max:10',
            'role'               => 'sometimes|string',
            'age'                => 'sometimes|integer|min:18',
            'experience_years'   => 'sometimes|integer|min:0',
            'matches_officiated' => 'sometimes|integer|min:0',
            'photo_url'          => 'nullable|string',
            'fifa_badge'         => 'boolean',
            'notes'              => 'nullable|string',
        ]);

        $referee->update($validated);
        return response()->json($referee);
    }

    public function destroyReferee(Referee $referee): JsonResponse
    {
        $referee->delete();
        return response()->json(['message' => 'Referee deleted']);
    }

    // ── HOSPITALITIES (Public & Admin) ─────────────────────────
    public function indexHospitalities(): JsonResponse
    {
        return response()->json(Hospitality::orderBy('sort_order', 'asc')->get());
    }

    public function storeHospitality(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'tier'        => 'required|string|max:100',
            'price'       => 'required|numeric|min:0',
            'badge'       => 'nullable|string',
            'is_featured' => 'boolean',
            'description' => 'required|string',
            'perks'       => 'nullable|array',
            'cta_text'    => 'required|string',
            'image_url'   => 'nullable|string',
            'sort_order'  => 'integer|min:0',
            'is_active'   => 'boolean',
        ]);

        $hospitality = Hospitality::create($validated);
        return response()->json($hospitality, 201);
    }

    public function updateHospitality(Request $request, Hospitality $hospitality): JsonResponse
    {
        $validated = $request->validate([
            'tier'        => 'sometimes|string|max:100',
            'price'       => 'sometimes|numeric|min:0',
            'badge'       => 'nullable|string',
            'is_featured' => 'boolean',
            'description' => 'sometimes|string',
            'perks'       => 'nullable|array',
            'cta_text'    => 'sometimes|string',
            'image_url'   => 'nullable|string',
            'sort_order'  => 'integer|min:0',
            'is_active'   => 'boolean',
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