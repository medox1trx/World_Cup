<?php

namespace App\Http\Controllers;

use App\Models\Hospitality;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class HospitalityController extends Controller
{
    /**
     * List all hospitality packages (Public).
     */
    public function index(Request $request): JsonResponse
    {
        $cacheKey = 'hospitality_index_' . md5(json_encode($request->all()));

        $packages = Cache::remember($cacheKey, 3600, function () use ($request) {
            $query = Hospitality::with(['city', 'country'])
                ->where('is_active', true);

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

            if ($request->filled('min_price')) {
                $query->where('price', '>=', $request->min_price);
            }

            if ($request->filled('max_price')) {
                $query->where('price', '<=', $request->max_price);
            }

            if ($request->filled('available') && $request->boolean('available')) {
                try {
                    $query->where('seats_available', '>', 0);
                } catch (\Exception $e) { }
            }

            $query->orderBy('sort_order', 'asc');

            $perPage = $request->get('per_page', 15);
            if ($perPage == -1) {
                return $query->get();
            }

            return $query->paginate($perPage);
        });

        return response()->json($packages);
    }

    /**
     * Store a new hospitality package (Admin).
     */
    public function store(Request $request): JsonResponse
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
        Cache::flush();
        return response()->json($hospitality, 201);
    }

    /**
     * Update a hospitality package (Admin).
     */
    public function update(Request $request, Hospitality $hospitality): JsonResponse
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
        Cache::flush();
        return response()->json($hospitality);
    }

    /**
     * Delete a hospitality package (Admin).
     */
    public function destroy(Hospitality $hospitality): JsonResponse
    {
        $hospitality->delete();
        Cache::flush();
        return response()->json(['message' => 'Hospitality deleted']);
    }
}
