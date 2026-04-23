<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\FanZone;
use Illuminate\Http\Request;

class FanZoneController extends Controller
{
    public function index()
    {
        return FanZone::with(['ville', 'ville.pays'])->get()->map(function($fz) {
            return [
                'id' => $fz->id,
                'stade' => $fz->stade,
                'capacite' => $fz->capacite,
                'nb_matchs' => $fz->nb_matchs,
                'adresse' => $fz->adresse,
                'zone_label' => $fz->zone_label,
                'description' => $fz->description,
                'image_url' => $fz->image_url,
                'groupe' => $fz->groupe,
                'statut' => $fz->statut,
                'ville' => [
                    'id' => $fz->ville->id,
                    'nom' => $fz->ville->nom,
                ],
                'pays' => [
                    'id' => $fz->ville->pays->id,
                    'nom' => $fz->ville->pays->nom,
                    'code_iso' => $fz->ville->pays->code_iso,
                ],
            ];
        });
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ville_id' => 'required|exists:villes,id',
            'stade' => 'required|string|max:150',
            'capacite' => 'required|string|max:20',
            'nb_matchs' => 'required|integer|min:0',
            'adresse' => 'required|string',
            'zone_label' => 'nullable|string|max:150',
            'description' => 'nullable|string',
            'image_url' => 'nullable|url',
            'groupe' => 'nullable|string|max:50',
            'statut' => 'required|in:actif,inactif,centenaire',
        ]);

        return FanZone::create($validated);
    }

    public function show($id)
    {
        $fz = FanZone::with(['ville', 'ville.pays'])->findOrFail($id);
        return [
            'id' => $fz->id,
            'stade' => $fz->stade,
            'capacite' => $fz->capacite,
            'nb_matchs' => $fz->nb_matchs,
            'adresse' => $fz->adresse,
            'zone_label' => $fz->zone_label,
            'description' => $fz->description,
            'image_url' => $fz->image_url,
            'groupe' => $fz->groupe,
            'statut' => $fz->statut,
            'ville' => [
                'id' => $fz->ville->id,
                'nom' => $fz->ville->nom,
            ],
            'pays' => [
                'id' => $fz->ville->pays->id,
                'nom' => $fz->ville->pays->nom,
                'code_iso' => $fz->ville->pays->code_iso,
            ],
        ];
    }

    public function update(Request $request, $id)
    {
        $fz = FanZone::findOrFail($id);
        $validated = $request->validate([
            'ville_id' => 'sometimes|required|exists:villes,id',
            'stade' => 'sometimes|required|string|max:150',
            'capacite' => 'sometimes|required|string|max:20',
            'nb_matchs' => 'sometimes|required|integer|min:0',
            'adresse' => 'sometimes|required|string',
            'zone_label' => 'nullable|string|max:150',
            'description' => 'nullable|string',
            'image_url' => 'nullable|url',
            'groupe' => 'nullable|string|max:50',
            'statut' => 'sometimes|required|in:actif,inactif,centenaire',
        ]);

        $fz->update($validated);
        return $fz;
    }

    public function destroy($id)
    {
        $fz = FanZone::findOrFail($id);
        $fz->delete();
        return response()->noContent();
    }
}
