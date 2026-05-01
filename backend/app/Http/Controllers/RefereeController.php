<?php

namespace App\Http\Controllers;

use App\Models\Referee;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class RefereeController extends Controller
{
    /**
     * List all referees (Public).
     */
    public function index(): JsonResponse
    {
        return response()->json(Referee::with('country')->get());
    }

    /**
     * Show a single referee (Public).
     */
    public function show(Referee $referee): JsonResponse
    {
        return response()->json($referee->load('country'));
    }

    /**
     * Store a new referee (Admin).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:200',
            'country_id' => 'required|exists:countries,id',
        ]);

        $referee = Referee::create($validated);
        return response()->json($referee->load('country'), 201);
    }

    /**
     * Update a referee (Admin).
     */
    public function update(Request $request, Referee $referee): JsonResponse
    {
        $validated = $request->validate([
            'name'       => 'sometimes|string|max:200',
            'country_id' => 'sometimes|exists:countries,id',
        ]);

        $referee->update($validated);
        return response()->json($referee->load('country'));
    }

    /**
     * Delete a referee (Admin).
     */
    public function destroy(Referee $referee): JsonResponse
    {
        $referee->delete();
        return response()->json(['message' => 'Referee deleted']);
    }
}
