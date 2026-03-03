<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FootballMatch;
use App\Models\Group;

class FootballMatchController extends Controller
{
    // Liste tous les matchs
    public function index()
    {
        $matches = FootballMatch::with(['phase', 'group', 'stadium'])->orderBy('match_datetime')->get();
        return response()->json($matches);
    }

    // Matchs par groupe
    public function matchesByGroup($group_id)
    {
        $matches = FootballMatch::with(['phase', 'group', 'stadium'])
            ->where('group_id', $group_id)
            ->orderBy('match_datetime')
            ->get();

        return response()->json($matches);
    }

    // Détail d’un match
    public function show($id)
    {
        $match = FootballMatch::with(['phase', 'group', 'stadium'])->findOrFail($id);
        return response()->json($match);
    }

    // Liste des groupes
    public function listGroups()
    {
        $groups = Group::all();
        return response()->json($groups);
    }
}
