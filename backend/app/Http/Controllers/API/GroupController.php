<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    /**
     * Display a listing of all groups with their teams.
     */
    public function index()
    {
        try {
            $groups = Group::with('teams')->get();

            return response()->json([
                'status' => 'success',
                'data' => $groups
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Une erreur est survenue lors de la récupération des groupes'
            ], 500);
        }
    }

    /**
     * Display the specified group with its teams.

     */
    public function show($id)
    {
        try {
            $group = Group::with('teams')->find($id);

            if (!$group) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Groupe non trouvé'
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'data' => $group
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Une erreur est survenue lors de la récupération du groupe'
            ], 500);
        }
    }
}
