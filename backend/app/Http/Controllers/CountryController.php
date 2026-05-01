<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CountryController extends Controller
{
    use ApiResponse;

    /**
     * List all countries (Public).
     */
    public function index(): JsonResponse
    {
        return response()->json(Country::orderBy('name')->get());
    }

    /**
     * Store a new country (Admin).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:100',
            'code'     => 'required|string|max:10|unique:countries,code',
            'flag_url' => 'nullable|string',
        ]);

        $country = Country::create($validated);
        return response()->json($country, 201);
    }

    /**
     * Update a country (Admin).
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $country = Country::findOrFail($id);

        $validated = $request->validate([
            'name'     => 'sometimes|string|max:100',
            'code'     => 'sometimes|string|max:10|unique:countries,code,' . $country->id,
            'flag_url' => 'nullable|string',
        ]);

        $country->update($validated);
        return response()->json($country);
    }

    /**
     * Delete a country (Admin).
     */
    public function destroy(int $id): JsonResponse
    {
        Country::findOrFail($id)->delete();
        return response()->json(['message' => 'Country deleted']);
    }
}
