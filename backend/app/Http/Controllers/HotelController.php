<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Hotel;

class HotelController extends Controller
{
    public function index()
    {
        return response()->json(Hotel::orderBy('id', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'image' => 'nullable|string|max:255',
            'website_url' => 'nullable|url|max:255',
        ]);

        $hotel = Hotel::create($validated);
        return response()->json($hotel, 201);
    }

    public function update(Request $request, Hotel $hotel)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'image' => 'nullable|string|max:255',
            'website_url' => 'nullable|url|max:255',
        ]);

        $hotel->update($validated);
        return response()->json($hotel);
    }

    public function destroy(Hotel $hotel)
    {
        $hotel->delete();
        return response()->json(null, 204);
    }
}
