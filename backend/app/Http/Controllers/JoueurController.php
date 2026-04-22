<?php

namespace App\Http\Controllers;

use App\Models\Joueur;
use Illuminate\Http\Request;

class JoueurController extends Controller
{
    public function index()
    {
        return Joueur::with('team')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'numero' => 'required|integer',
            'poste' => 'required|string|max:255',
            'photo' => 'nullable|string|max:255',
            'team_id' => 'required|exists:teams,id',
        ]);

        $joueur = Joueur::create($validated);
        return response()->json($joueur, 201);
    }

    public function show(Joueur $joueur)
    {
        return $joueur->load('team');
    }

    public function update(Request $request, Joueur $joueur)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'numero' => 'sometimes|required|integer',
            'poste' => 'sometimes|required|string|max:255',
            'photo' => 'nullable|string|max:255',
            'team_id' => 'sometimes|required|exists:teams,id',
        ]);

        $joueur->update($validated);
        return response()->json($joueur);
    }

    public function destroy(Joueur $joueur)
    {
        $joueur->delete();
        return response()->json(null, 204);
    }
}
