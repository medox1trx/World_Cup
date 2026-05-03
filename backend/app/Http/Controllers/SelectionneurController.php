<?php

namespace App\Http\Controllers;

use App\Models\Selectionneur;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SelectionneurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    use \App\Traits\HandlesImages;

    public function index()
    {
        return Selectionneur::with('team')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'photo' => 'nullable|sometimes',
            'team_id' => 'required|exists:teams,id',
        ]);

        if ($request->hasFile('photo')) {
            $request->validate(['photo' => 'image|mimes:jpg,jpeg,png,webp,avif,svg|max:2048']);
        }

        $data = $validated;
        $data['photo'] = $this->handleImage($request, 'photo', 'coaches');

        try {
            $selectionneur = Selectionneur::create($data);
            return response()->json($selectionneur, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la création: ' . $e->getMessage()], 500);
        }
    }

    public function show(Selectionneur $selectionneur)
    {
        return $selectionneur->load('team');
    }

    public function update(Request $request, Selectionneur $selectionneur)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'photo' => 'nullable|sometimes',
            'team_id' => 'sometimes|required|exists:teams,id',
        ]);

        if ($request->hasFile('photo')) {
            $request->validate(['photo' => 'image|mimes:jpg,jpeg,png,webp,avif,svg|max:2048']);
        }

        $data = $validated;
        if ($request->hasFile('photo') || $request->filled('photo')) {
            $data['photo'] = $this->handleImage($request, 'photo', 'coaches', $selectionneur->photo);
        }

        $selectionneur->update($data);
        return response()->json($selectionneur);
    }

    public function destroy(Selectionneur $selectionneur)
    {
        $selectionneur->delete();
        return response()->json(null, 204);
    }
}
