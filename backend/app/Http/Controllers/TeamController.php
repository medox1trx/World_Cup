<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use App\Traits\HandlesImages;

class TeamController extends Controller
{
    use HandlesImages;
    /**
     * Display a listing of the resource.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10',
            'confederation' => 'required|string|max:50',
            'group_id' => 'nullable|exists:groups,id',
            'world_ranking' => 'nullable|integer',
            'key_player' => 'nullable|string|max:255',
            'image_url' => 'nullable|string|max:255',
            'coach' => 'nullable|string|max:255',
            'captain' => 'nullable|string|max:255',
            'world_cup_titles' => 'nullable|integer',
            'description' => 'nullable|string',
            'flag' => 'nullable|sometimes',
            'hero_image' => 'nullable|sometimes'
        ]);

        // Manually validate flag if it's a file
        if ($request->hasFile('flag')) {
            $request->validate(['flag' => 'image|mimes:jpg,jpeg,png|max:2048']);
        } elseif ($request->filled('flag')) {
            $request->validate(['flag' => 'nullable']);
        }

        if ($request->hasFile('hero_image')) {
            $request->validate(['hero_image' => 'image|mimes:jpg,jpeg,png|max:2048']);
        } elseif ($request->filled('hero_image')) {
            $request->validate(['hero_image' => 'nullable']);
        }

        $data = $validated;
        $data['flag'] = $this->handleImage($request, 'flag', 'teams');
        $data['hero_image'] = $this->handleImage($request, 'hero_image', 'teams');

        $team = Team::create($data);
        return response()->json($team, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team)
    {
        return $team->load(['joueurs', 'group', 'selectionneur']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Team::with(['group', 'country']);

        if ($request->has('confederation')) {
            $query->where('confederation', $request->confederation);
        }

        return $query->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Team $team)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'code' => 'sometimes|required|string|max:10',
            'confederation' => 'sometimes|required|string|max:50',
            'group_id' => 'nullable|exists:groups,id',
            'world_ranking' => 'nullable|integer',
            'key_player' => 'nullable|string|max:255',
            'image_url' => 'nullable|string|max:255',
            'coach' => 'nullable|string|max:255',
            'captain' => 'nullable|string|max:255',
            'world_cup_titles' => 'nullable|integer',
            'description' => 'nullable|string',
            'flag' => 'nullable|sometimes',
            'hero_image' => 'nullable|sometimes'
        ]);

        if ($request->hasFile('flag')) {
            $request->validate(['flag' => 'image|mimes:jpg,jpeg,png|max:2048']);
        } elseif ($request->filled('flag')) {
            $request->validate(['flag' => 'nullable']);
        }

        if ($request->hasFile('hero_image')) {
            $request->validate(['hero_image' => 'image|mimes:jpg,jpeg,png|max:2048']);
        } elseif ($request->filled('hero_image')) {
            $request->validate(['hero_image' => 'nullable']);
        }

        $data = $validated;
        if ($request->hasFile('flag') || $request->filled('flag')) {
            $data['flag'] = $this->handleImage($request, 'flag', 'teams', $team->flag);
        }
        if ($request->hasFile('hero_image') || $request->filled('hero_image')) {
            $data['hero_image'] = $this->handleImage($request, 'hero_image', 'teams', $team->hero_image);
        }

        $team->update($data);
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
