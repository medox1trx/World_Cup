<?php

namespace App\Http\Controllers;

use App\Models\TickerItem;
use Illuminate\Http\Request;

class TickerController extends Controller
{
    // ── Public: active items ordered by sort_order ───────────────
    public function index()
    {
        $items = TickerItem::where('active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return response()->json($items);
    }

    // ── Admin: all items ────────────────────────────────────────
    public function indexAll()
    {
        $items = TickerItem::orderBy('sort_order')->orderBy('id')->get();
        return response()->json($items);
    }

    // ── Admin: create ───────────────────────────────────────────
    public function store(Request $request)
    {
        $validated = $request->validate([
            'text'        => 'required|string|max:500',
            'label'       => 'nullable|string|max:50',
            'label_color' => 'nullable|string|max:20',
            'url'         => 'nullable|url|max:500',
            'active'      => 'nullable|boolean',
            'sort_order'  => 'nullable|integer',
        ]);

        $item = TickerItem::create([
            'text'        => $validated['text'],
            'label'       => $validated['label']       ?? 'En Direct',
            'label_color' => $validated['label_color'] ?? '#c8102e',
            'url'         => $validated['url']         ?? null,
            'active'      => $validated['active']      ?? true,
            'sort_order'  => $validated['sort_order']  ?? 0,
        ]);

        return response()->json($item, 201);
    }

    // ── Admin: update ───────────────────────────────────────────
    public function update(Request $request, TickerItem $ticker)
    {
        $validated = $request->validate([
            'text'        => 'sometimes|required|string|max:500',
            'label'       => 'nullable|string|max:50',
            'label_color' => 'nullable|string|max:20',
            'url'         => 'nullable|url|max:500',
            'active'      => 'nullable|boolean',
            'sort_order'  => 'nullable|integer',
        ]);

        $ticker->update($validated);

        return response()->json($ticker);
    }

    // ── Admin: delete ───────────────────────────────────────────
    public function destroy(TickerItem $ticker)
    {
        $ticker->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
