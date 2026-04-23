<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Pays;
use Illuminate\Http\Request;

class PaysController extends Controller
{
    public function index()
    {
        return Pays::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100',
            'code_iso' => 'required|string|size:2|unique:pays',
        ]);

        return Pays::create($validated);
    }

    public function show(Pays $pays)
    {
        return $pays;
    }

    public function update(Request $request, $id)
    {
        $pays = Pays::findOrFail($id);
        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:100',
            'code_iso' => 'sometimes|required|string|size:2|unique:pays,code_iso,' . $id,
        ]);

        $pays->update($validated);
        return $pays;
    }

    public function destroy($id)
    {
        $pays = Pays::findOrFail($id);
        $pays->delete();
        return response()->noContent();
    }
}
