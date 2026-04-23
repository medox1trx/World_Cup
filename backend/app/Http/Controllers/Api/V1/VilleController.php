<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Ville;
use Illuminate\Http\Request;

class VilleController extends Controller
{
    public function index(Request $request)
    {
        $query = Ville::with('pays');
        
        if ($request->has('pays_id')) {
            $query->where('pays_id', $request->pays_id);
        }

        return $query->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100',
            'pays_id' => 'required|exists:pays,id',
        ]);

        return Ville::create($validated);
    }

    public function show(Ville $ville)
    {
        return $ville->load('pays');
    }

    public function update(Request $request, $id)
    {
        $ville = Ville::findOrFail($id);
        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:100',
            'pays_id' => 'sometimes|required|exists:pays,id',
        ]);

        $ville->update($validated);
        return $ville;
    }

    public function destroy($id)
    {
        $ville = Ville::findOrFail($id);
        $ville->delete();
        return response()->noContent();
    }
}
