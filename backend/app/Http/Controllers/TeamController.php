<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Team::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10',
            'group_name' => 'required|string|max:255',
            'rank' => 'nullable|integer',
            'key_player' => 'nullable|string|max:255',
            'image_url' => 'nullable|string|max:255',
        ]);

        $team = Team::create($validated);
        return response()->json($team, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team)
    {
        return $team;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Team $team)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'code' => 'sometimes|required|string|max:10',
            'group_name' => 'sometimes|required|string|max:255',
            'rank' => 'nullable|integer',
            'key_player' => 'nullable|string|max:255',
            'image_url' => 'nullable|string|max:255',
        ]);

        $team->update($validated);
        return response()->json($team);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team)
    {
        $team->delete();
        return response()->json(null, 204);
    }
}
