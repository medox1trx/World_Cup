<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\JsonResponse;

class CityController extends Controller
{
    /**
     * Get all cities.
     */
    public function index(): JsonResponse
    {
        $cities = City::withCount('accommodations')->orderBy('name')->get();
        return response()->json([
            'status' => 'success',
            'data' => $cities
        ]);
    }

    /**
     * Get a single city by slug.
     */
    public function show(string $slug): JsonResponse
    {
        $city = City::where('slug', $slug)
            ->with('accommodations')
            ->withCount('accommodations')
            ->first();

        if (!$city) {
            return response()->json([
                'status' => 'error',
                'message' => 'City not found.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $city
        ]);
    }
}
