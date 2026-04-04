<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Team;
class TeamController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Team::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'pays' => 'required|string|max:255',
            'groupe' => 'nullable|string|max:10',
            'logo' => 'nullable|string'
        ]);

        $team = Team::create($validated);

        return response()->json([
            'message' => 'Team created successfully',
            'data' => $team
        ], 201);
    }

    public function show($id)
    {
        return response()->json([
            'success' => true,
            'data' => Team::findOrFail($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        $team = Team::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'pays' => 'sometimes|required|string|max:255',
            'groupe' => 'nullable|string|max:10',
            'logo' => 'nullable|string'
        ]);

        $team->update($validated);

        return response()->json([
            'message' => 'Team updated successfully',
            'data' => $team
        ]);
    }

    public function destroy($id)
    {
        Team::destroy($id);
        return response()->json(['success' => true]);
    }
}