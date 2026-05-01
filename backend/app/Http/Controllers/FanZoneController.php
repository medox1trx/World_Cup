<?php

namespace App\Http\Controllers;

use App\Models\FanZone;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class FanZoneController extends Controller
{
    /**
     * List all active fan zones (Public).
     */
    public function index(Request $request): JsonResponse
    {
        $cacheKey = 'fan_zones_index_' . md5(json_encode($request->all()));

        $fanZones = Cache::remember($cacheKey, 3600, function () use ($request) {
            $query = FanZone::with(['city', 'city.country', 'country'])
                ->where('status', '!=', 'inactive');

            if ($request->filled('country')) {
                $query->whereHas('country', function ($q) use ($request) {
                    $q->where('code', $request->country)->orWhere('name', 'like', '%' . $request->country . '%');
                });
            }

            if ($request->filled('city')) {
                $query->whereHas('city', function ($q) use ($request) {
                    $q->where('name', 'like', '%' . $request->city . '%');
                });
            }

            if ($request->filled('min_capacity')) {
                $query->whereRaw('CAST(capacity AS UNSIGNED) >= ?', [$request->min_capacity]);
            }

            if ($request->filled('max_capacity')) {
                $query->whereRaw('CAST(capacity AS UNSIGNED) <= ?', [$request->max_capacity]);
            }

            if ($request->filled('featured') && $request->boolean('featured')) {
                $query->where('status', 'centenary');
            }

            $perPage = $request->get('per_page', 15);
            if ($perPage == -1) {
                return $query->get();
            }

            return $query->paginate($perPage);
        });

        return response()->json($fanZones);
    }

    /**
     * Show a single fan zone (Public).
     */
    public function show(int $id): JsonResponse
    {
        $fanZone = FanZone::with(['city', 'city.country', 'country'])->findOrFail($id);
        return response()->json($fanZone);
    }

    /**
     * List all fan zones including inactive (Admin).
     */
    public function indexAll(): JsonResponse
    {
        $fanZones = Cache::remember('fan_zones_all', 3600, function () {
            return FanZone::with(['city', 'city.country', 'country'])->get();
        });
        return response()->json($fanZones);
    }

    /**
     * Store a new fan zone (Admin).
     */
    public function store(Request $request): JsonResponse
    {
        $this->mapLegacyFields($request);

        $validated = $request->validate([
            'city_id'       => 'required|exists:cities,id',
            'country_id'    => 'nullable|exists:countries,id',
            'stadium_name'  => 'required|string|max:150',
            'capacity'      => 'required|string|max:20',
            'matches_count' => 'required|integer|min:0',
            'address'       => 'required|string',
            'zone_label'    => 'nullable|string|max:150',
            'description'   => 'nullable|string',
            'image_url'     => 'nullable|string',
            'group_label'   => 'nullable|string|max:50',
            'status'        => 'required|in:active,inactive,centenary',
        ]);

        $fanZone = FanZone::create($validated);
        Cache::flush(); // Clear all fan zone related caches
        return response()->json($fanZone->load(['city', 'city.country', 'country']), 201);
    }

    /**
     * Update a fan zone (Admin).
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $fanZone = FanZone::findOrFail($id);
        $this->mapLegacyFields($request);

        $validated = $request->validate([
            'city_id'       => 'sometimes|required|exists:cities,id',
            'country_id'    => 'nullable|exists:countries,id',
            'stadium_name'  => 'sometimes|required|string|max:150',
            'capacity'      => 'sometimes|required|string|max:20',
            'matches_count' => 'sometimes|required|integer|min:0',
            'address'       => 'sometimes|required|string',
            'zone_label'    => 'nullable|string|max:150',
            'description'   => 'nullable|string',
            'image_url'     => 'nullable|string',
            'group_label'   => 'nullable|string|max:50',
            'status'        => 'sometimes|required|in:active,inactive,centenary',
        ]);

        $fanZone->update($validated);
        Cache::flush();
        return response()->json($fanZone->load(['city', 'city.country', 'country']));
    }

    /**
     * Delete a fan zone (Admin).
     */
    public function destroy(int $id): JsonResponse
    {
        FanZone::findOrFail($id)->delete();
        Cache::flush();
        return response()->json(['message' => 'Fan zone deleted']);
    }

    /**
     * Maps legacy French request fields to new English database fields.
     */
    private function mapLegacyFields(Request $request)
    {
        $mapping = [
            'ville_id'   => 'city_id',
            'stade'      => 'stadium_name',
            'capacite'   => 'capacity',
            'nb_matchs'  => 'matches_count',
            'adresse'    => 'address',
            'groupe'     => 'group_label',
            'statut'     => 'status',
        ];

        foreach ($mapping as $legacy => $new) {
            if ($request->has($legacy) && !$request->has($new)) {
                $value = $request->input($legacy);
                
                // Special case for status enum translation
                if ($legacy === 'statut') {
                    $value = match ($value) {
                        'actif' => 'active',
                        'inactif' => 'inactive',
                        'centenaire' => 'centenary',
                        default => $value,
                    };
                }
                
                $request->merge([$new => $value]);
            }
        }
    }
}
