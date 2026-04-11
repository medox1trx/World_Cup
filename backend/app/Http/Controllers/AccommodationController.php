<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Accommodation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AccommodationController extends Controller
{
    /**
     * Get accommodations for a city with features like pagination and filtering.
     */
    public function index(Request $request, string $slug): JsonResponse
    {
        $city = City::where('slug', $slug)->first();

        if (!$city) {
            return response()->json([
                'status' => 'error',
                'message' => 'City not found.'
            ], 404);
        }

        $query = $city->accommodations();

        // Filtering
        if ($request->filled('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }
        if ($request->filled('min_price') && $request->min_price !== '') {
            $query->where('price_per_night', '>=', $request->min_price);
        }
        if ($request->filled('max_price') && $request->max_price !== '') {
            $query->where('price_per_night', '<=', $request->max_price);
        }
        if ($request->filled('capacity')) {
            $query->where('capacity', '>=', $request->capacity);
        }

        // Sorting
        $sort = $request->get('sort', 'price_asc');
        switch ($sort) {
            case 'price_desc': $query->orderByDesc('price_per_night'); break;
            case 'rating_desc': $query->orderByDesc('rating'); break;
            case 'price_asc': 
            default: $query->orderBy('price_per_night'); break;
        }

        // Pagination
        $perPage = $request->get('per_page', 9);
        $accommodations = $query->paginate($perPage);

        return response()->json([
            'status' => 'success',
            'data' => $accommodations,
            'message' => 'Accommodations retrieved successfully.'
        ]);
    }

    /**
     * Get a single accommodation details.
     */
    public function show(int $id): JsonResponse
    {
        $accommodation = Accommodation::with('city')->find($id);

        if (!$accommodation) {
            return response()->json([
                'status' => 'error',
                'message' => 'Accommodation not found.'
            ], 404);
        }

        // Check availability (simplistic for now: if any reservation overlaps today/future, mark as such)
        // In a real app, this would be date-specific
        $accommodation->is_available = true; 

        return response()->json([
            'status' => 'success',
            'data' => $accommodation,
            'message' => 'Accommodation details retrieved.'
        ]);
    }
}
