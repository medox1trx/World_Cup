<?php

namespace App\Http\Controllers;

use App\Models\Joueur;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Traits\HandlesImages;

class PlayerController extends Controller
{
    use HandlesImages;

    /**
     * List all players (Public).
     */
    public function index(): JsonResponse
    {
        return response()->json(Joueur::with(['team', 'country'])->get());
    }

    /**
     * Show a single player (Public).
     */
    public function show(Joueur $joueur): JsonResponse
    {
        return response()->json($joueur->load(['team', 'country']));
    }

    /**
     * Store a new player (Admin).
     */
    public function store(Request $request): JsonResponse
    {
        // Support both 'buts' (legacy) and 'goals' (new)
        if ($request->has('buts') && !$request->has('goals')) {
            $request->merge(['goals' => $request->buts]);
        }

        $validated = $request->validate([
            'name'       => 'required|string|max:255',
            'number'     => 'required|integer',
            'position'   => 'required|string|max:255',
            'goals'      => 'nullable|integer|min:0',
            'photo'      => 'nullable|sometimes',
            'team_id'    => 'required|exists:teams,id',
            'country_id' => 'nullable|exists:countries,id',
        ]);

        if ($request->hasFile('photo')) {
            $request->validate(['photo' => 'image|mimes:jpg,jpeg,png|max:2048']);
        }

        $data = $validated;
        $data['photo'] = $this->handleImage($request, 'photo', 'players');

        $joueur = Joueur::create($data);
        return response()->json($joueur->load(['team', 'country']), 201);
    }

    /**
     * Update a player (Admin).
     */
    public function update(Request $request, Joueur $joueur): JsonResponse
    {
        if ($request->has('buts') && !$request->has('goals')) {
            $request->merge(['goals' => $request->buts]);
        }

        $validated = $request->validate([
            'name'       => 'sometimes|required|string|max:255',
            'number'     => 'sometimes|required|integer',
            'position'   => 'sometimes|required|string|max:255',
            'goals'      => 'nullable|integer|min:0',
            'photo'      => 'nullable|sometimes',
            'team_id'    => 'sometimes|required|exists:teams,id',
            'country_id' => 'nullable|exists:countries,id',
        ]);

        if ($request->hasFile('photo')) {
            $request->validate(['photo' => 'image|mimes:jpg,jpeg,png|max:2048']);
        }

        $data = $validated;
        if ($request->hasFile('photo') || $request->filled('photo')) {
            $data['photo'] = $this->handleImage($request, 'photo', 'players', $joueur->photo);
        }

        $joueur->update($data);
        return response()->json($joueur->load(['team', 'country']));
    }

    /**
     * Delete a player (Admin).
     */
    public function destroy(Joueur $joueur): JsonResponse
    {
        $joueur->delete();
        return response()->json(null, 204);
    }

    /**
     * Get top scorers (Public).
     */
    public function topScorers(): JsonResponse
    {
        $scorers = Joueur::with(['team', 'country'])
            ->where('goals', '>', 0)
            ->orderBy('goals', 'desc')
            ->limit(5)
            ->get();

        return response()->json($scorers);
    }
}
