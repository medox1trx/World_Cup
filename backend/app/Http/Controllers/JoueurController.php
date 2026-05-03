<?php

namespace App\Http\Controllers;

use App\Models\Joueur;
use Illuminate\Http\Request;
use App\Traits\HandlesImages;

class JoueurController extends Controller
{
    use HandlesImages;

    public function index()
    {
        return Joueur::with('team')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'number' => 'required|integer',
            'position' => 'required|string|max:255',
            'goals' => 'nullable|integer|min:0',
            'photo' => 'nullable|sometimes',
            'team_id' => 'required|exists:teams,id',
        ]);

        if ($request->hasFile('photo')) {
            $request->validate(['photo' => 'image|mimes:jpg,jpeg,png,webp,avif,svg|max:2048']);
        } elseif ($request->filled('photo')) {
            $request->validate(['photo' => 'nullable']);
        }

        $data = $validated;
        $data['photo'] = $this->handleImage($request, 'photo', 'players');

        $joueur = Joueur::create($data);
        return response()->json($joueur, 201);
    }

    public function show(Joueur $joueur)
    {
        return $joueur->load('team');
    }

    public function update(Request $request, Joueur $joueur)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'number' => 'sometimes|required|integer',
            'position' => 'sometimes|required|string|max:255',
            'goals' => 'nullable|integer|min:0',
            'photo' => 'nullable|sometimes',
            'team_id' => 'sometimes|required|exists:teams,id',
        ]);

        if ($request->hasFile('photo')) {
            $request->validate(['photo' => 'image|mimes:jpg,jpeg,png,webp,avif,svg|max:2048']);
        } elseif ($request->filled('photo')) {
            $request->validate(['photo' => 'nullable']);
        }

        $data = $validated;
        if ($request->hasFile('photo') || $request->filled('photo')) {
            $data['photo'] = $this->handleImage($request, 'photo', 'players', $joueur->photo);
        }

        $joueur->update($data);
        return response()->json($joueur);
    }

    public function destroy(Joueur $joueur)
    {
        $joueur->delete();
        return response()->json(null, 204);
    }

    public function topScorers()
    {
        return Joueur::with('team')
            ->orderBy('goals', 'desc')
            ->limit(20)
            ->get();
    }
}
