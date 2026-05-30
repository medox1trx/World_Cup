<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Hospitality;
use App\Traits\HandlesImages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HospitalityController extends Controller
{
    use HandlesImages;

    public function index()
    {
        return Hospitality::orderBy('sort_order')->get()->map(function($h) {
            return [
                'id'          => $h->id,
                'city_id'     => $h->city_id,
                'city_name'   => $h->city?->name,
                'tier'        => $h->tier,
                'description' => $h->description,
                'badge'       => $h->badge,
                'price'       => $h->price,
                'perks'       => $h->perks,
                'cta_text'    => $h->cta_text,
                'image_url'   => $h->image_url,
                'is_active'   => $h->is_active,
                'sort_order'  => $h->sort_order,
            ];
        });
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tier'        => 'required|string|max:150',
            'description' => 'nullable|string',
            'badge'       => 'nullable|string',
            'price'       => 'nullable|numeric|min:0',
            'perks'       => 'nullable',
            'cta_text'    => 'nullable|string',
            'image_url'   => 'nullable',   // accepts File upload or URL string
            'sort_order'  => 'nullable|integer|min:0',
            'is_active'   => 'nullable|boolean',
            'city_id'     => 'nullable|exists:cities,id',
        ]);

        // Normalize perks: accept array, JSON string, or FormData perks[]
        if (isset($validated['perks']) && is_string($validated['perks'])) {
            $validated['perks'] = json_decode($validated['perks'], true) ?? [];
        }
        if ($request->has('perks') && is_array($request->input('perks'))) {
            $validated['perks'] = $request->input('perks');
        }

        // Handle image: file upload or URL string
        $validated['image_url'] = $this->handleImage($request, 'image_url', 'hospitalities');

        // Fill required DB fields with defaults
        $validated['price']       = $validated['price']      ?? 950;
        $validated['description'] = $validated['description'] ?? 'Official Hospitality Experience';
        $validated['cta_text']    = $validated['cta_text']   ?? 'Réserver';
        $validated['is_active']   = $validated['is_active']  ?? true;
        $validated['sort_order']  = $validated['sort_order'] ?? 0;

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
            'tier'        => 'sometimes|required|string|max:150',
            'description' => 'nullable|string',
            'badge'       => 'nullable|string',
            'price'       => 'nullable|numeric|min:0',
            'perks'       => 'nullable',
            'cta_text'    => 'nullable|string',
            'image_url'   => 'nullable',   // accepts File upload or URL string
            'sort_order'  => 'nullable|integer|min:0',
            'is_active'   => 'nullable|boolean',
            'city_id'     => 'nullable|exists:cities,id',
        ]);

        // Normalize perks
        if (isset($validated['perks']) && is_string($validated['perks'])) {
            $validated['perks'] = json_decode($validated['perks'], true) ?? [];
        }
        if ($request->has('perks') && is_array($request->input('perks'))) {
            $validated['perks'] = $request->input('perks');
        }

        // Handle image: preserves existing if nothing new provided
        $validated['image_url'] = $this->handleImage($request, 'image_url', 'hospitalities', $h->image_url);

        $h->update($validated);
        return $h;
    }

    public function destroy($id)
    {
        $h = Hospitality::findOrFail($id);

        if ($h->image_url && str_contains($h->image_url, 'uploads/')) {
            Storage::disk('public')->delete($h->image_url);
        }

        $h->delete();
        return response()->noContent();
    }
}
