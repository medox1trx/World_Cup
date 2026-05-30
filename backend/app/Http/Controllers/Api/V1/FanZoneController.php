<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\FanZone;
use App\Traits\HandlesImages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FanZoneController extends Controller
{
    use HandlesImages;

    public function index()
    {
        return FanZone::with('city')->get()->map(function($fz) {
            return [
                'id'           => $fz->id,
                'city_id'      => $fz->city_id,
                'city_name'    => $fz->city?->name,
                'zone_label'   => $fz->zone_label,
                'description'  => $fz->description,
                'image_url'    => $fz->image_url,
                'location_url' => $fz->location_url,
                'capacity'     => $fz->capacity,
            ];
        });
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'city_id'      => 'required|exists:cities,id',
            'zone_label'   => 'required|string|max:150',
            'description'  => 'nullable|string',
            'location_url' => 'nullable|string',
            'image_url'    => 'nullable',   // accepts File upload or URL string
            'capacity'     => 'nullable|string|max:255',
            'stadium_name' => 'nullable|string|max:150',
            'matches_count'=> 'nullable|integer|min:0',
            'address'      => 'nullable|string',
            'group_label'  => 'nullable|string|max:100',
            'status'       => 'nullable|in:active,inactive,centenary',
        ]);

        // Handle image: file upload or URL string
        $validated['image_url'] = $this->handleImage($request, 'image_url', 'fan_zones');

        // Fill required DB fields with defaults if not provided
        $validated['stadium_name']  = $validated['stadium_name']  ?? 'Official Fan Zone';
        $validated['capacity']      = $validated['capacity']      ?? 'Various';
        $validated['matches_count'] = $validated['matches_count'] ?? 64;
        $validated['address']       = $validated['address']       ?? 'Official Site';
        $validated['group_label']   = $validated['group_label']   ?? 'Official';
        $validated['status']        = $validated['status']        ?? 'active';

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
            'city_id'      => 'sometimes|required|exists:cities,id',
            'zone_label'   => 'sometimes|required|string|max:150',
            'description'  => 'nullable|string',
            'location_url' => 'nullable|string',
            'image_url'    => 'nullable',   // accepts File upload or URL string
            'capacity'     => 'nullable|string|max:255',
            'stadium_name' => 'nullable|string|max:150',
            'matches_count'=> 'nullable|integer|min:0',
            'address'      => 'nullable|string',
            'group_label'  => 'nullable|string|max:100',
            'status'       => 'nullable|in:active,inactive,centenary',
        ]);

        // Handle image: file upload or URL string (preserves existing if nothing provided)
        $validated['image_url'] = $this->handleImage($request, 'image_url', 'fan_zones', $fz->image_url);

        $fz->update($validated);
        return $fz;
    }

    public function destroy($id)
    {
        $fz = FanZone::findOrFail($id);

        // Delete stored image if applicable
        if ($fz->image_url && str_contains($fz->image_url, 'uploads/')) {
            Storage::disk('public')->delete($fz->image_url);
        }

        $fz->delete();
        return response()->noContent();
    }
}
