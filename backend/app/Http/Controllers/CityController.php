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
        $cities = City::with(['country'])->withCount('accommodations')->orderBy('name')->get();
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

    public function store(\Illuminate\Http\Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'country_id' => 'required|exists:pays,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('cities', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        $city = City::create($validated);

        return response()->json([
            'status' => 'success',
            'data' => $city
        ]);
    }

    public function update(\Illuminate\Http\Request $request, $id): JsonResponse
    {
        $city = City::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'country_id' => 'sometimes|required|exists:pays,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);
        }

        if ($request->hasFile('image')) {
            if ($city->image_url && str_contains($city->image_url, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $city->image_url);
                \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('cities', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        $city->update($validated);

        return response()->json([
            'status' => 'success',
            'data' => $city
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $city = City::findOrFail($id);
        
        if ($city->image_url && str_contains($city->image_url, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $city->image_url);
            \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
        }

        $city->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}
