<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TicketController extends Controller
{
    /**
     * List all tickets (Public & Admin).
     */
    public function index(): JsonResponse
    {
        return response()->json(Ticket::with(['match.team1', 'match.team2'])->latest()->get());
    }

    /**
     * Store a new ticket (Admin).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'match_id'  => 'required|exists:matches,id',
            'category'  => 'required|string',
            'price'     => 'required|numeric|min:0',
            'quantity'  => 'required|integer|min:0',
            'status'    => 'sometimes|in:available,sold_out'
        ]);

        $validated['available'] = $validated['quantity'];

        $ticket = Ticket::create($validated);
        return response()->json($ticket->load('match'), 201);
    }

    /**
     * Update a ticket (Admin).
     */
    public function update(Request $request, Ticket $ticket): JsonResponse
    {
        $validated = $request->validate([
            'match_id'  => 'sometimes|exists:matches,id',
            'category'  => 'sometimes|string',
            'price'     => 'sometimes|numeric|min:0',
            'quantity'  => 'sometimes|integer|min:0',
            'status'    => 'sometimes|in:available,sold_out'
        ]);

        if (isset($validated['quantity'])) {
            $diff = $validated['quantity'] - $ticket->quantity;
            $validated['available'] = max(0, $ticket->available + $diff);
        }

        $ticket->update($validated);
        return response()->json($ticket->load('match'));
    }

    /**
     * Delete a ticket (Admin).
     */
    public function destroy(Ticket $ticket): JsonResponse
    {
        $ticket->delete();
        return response()->json(['message' => 'Ticket deleted']);
    }
}
