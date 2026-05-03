<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Hospitality;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HospitalityController extends Controller
{
    public function index()
    {
        return Hospitality::with('city')->get()->map(function($h) {
            return [
                'id'          => $h->id,
                'city_id'     => $h->city_id,
                'city_name'   => $h->city?->name,
                'tier'        => $h->tier, // Using 'tier' as the name/label
                'image_url'   => $h->image_url,
            ];
        });
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'city_id' => 'required|exists:cities,id',
            'tier'    => 'required|string|max:150',
            'image'   => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('hospitalities', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        // Set defaults for other fields to avoid DB errors
        $validated['price']       = 950;
        $validated['description'] = 'Official Hospitality Experience';
        $validated['cta_text']    = 'Book Now';
        $validated['is_active']   = true;
        $validated['sort_order']  = 0;

        return Hospitality::create($validated);
    }

    public function show($id)
    {
        return Hospitality::with('city')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $h = Hospitality::findOrFail($id);
        
        $validated = $request->validate([
            'city_id' => 'sometimes|required|exists:cities,id',
            'tier'    => 'sometimes|required|string|max:150',
            'image'   => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($h->image_url && str_contains($h->image_url, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $h->image_url);
                Storage::disk('public')->delete($oldPath);
            }
            
            $path = $request->file('image')->store('hospitalities', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        $h->update($validated);
        return $h;
    }

    public function destroy($id)
    {
        $h = Hospitality::findOrFail($id);
        
        if ($h->image_url && str_contains($h->image_url, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $h->image_url);
            Storage::disk('public')->delete($oldPath);
        }

        $h->delete();
        return response()->noContent();
    }
}
