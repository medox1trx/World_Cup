<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\FanZone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FanZoneController extends Controller
{
    public function index()
    {
        return FanZone::with('city')->get()->map(function($fz) {
            return [
                'id'          => $fz->id,
                'city_id'     => $fz->city_id,
                'city_name'   => $fz->city?->name,
                'zone_label'  => $fz->zone_label,
                'image_url'   => $fz->image_url,
            ];
        });
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'city_id'    => 'required|exists:cities,id',
            'zone_label' => 'required|string|max:150',
            'image'      => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('fan_zones', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        // Set defaults for other fields to avoid DB errors if they are NOT NULL
        $validated['stadium_name'] = 'Official Fan Zone';
        $validated['capacity']     = 'Various';
        $validated['matches_count'] = 64;
        $validated['address']      = 'Official Site';
        $validated['description']  = 'FIFA Fan Festival';
        $validated['group_label']  = 'Official';
        $validated['status']       = 'active';

        return FanZone::create($validated);
    }

    public function show($id)
    {
        return FanZone::with('city')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $fz = FanZone::findOrFail($id);
        
        $validated = $request->validate([
            'city_id'    => 'sometimes|required|exists:cities,id',
            'zone_label' => 'sometimes|required|string|max:150',
            'image'      => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if it exists in storage
            if ($fz->image_url && str_contains($fz->image_url, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $fz->image_url);
                Storage::disk('public')->delete($oldPath);
            }
            
            $path = $request->file('image')->store('fan_zones', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        $fz->update($validated);
        return $fz;
    }

    public function destroy($id)
    {
        $fz = FanZone::findOrFail($id);
        
        // Delete image from storage
        if ($fz->image_url && str_contains($fz->image_url, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $fz->image_url);
            Storage::disk('public')->delete($oldPath);
        }

        $fz->delete();
        return response()->noContent();
    }
}
