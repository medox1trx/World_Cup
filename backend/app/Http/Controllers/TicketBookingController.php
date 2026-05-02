<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\TicketBooking;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class TicketBookingController extends Controller
{
    /**
     * Store a newly created ticket booking.
     */
    public function store(Request $request): JsonResponse
    {
        // 1. Ensure user is authenticated
        if (!auth('web')->check()) {
            return response()->json(['status' => 'error', 'message' => 'Unauthorized. Please login.'], 401);
        }

        $validated = $request->validate([
            'ticket_id' => 'required|exists:tickets,id',
            'quantity'  => 'required|integer|min:1|max:3',
        ]);

        // 2. Enforce global limit of 3 tickets per person for this category
        $existingQuantity = TicketBooking::where('user_id', auth('web')->id())
            ->where('ticket_id', $validated['ticket_id'])
            ->sum('quantity');

        if ($existingQuantity + $validated['quantity'] > 3) {
            $remaining = 3 - $existingQuantity;
            return response()->json([
                'status' => 'error',
                'message' => $remaining > 0 
                    ? "Vous ne pouvez réserver que {$remaining} ticket(s) supplémentaire(s) pour cette catégorie."
                    : "Vous avez déjà atteint la limite de 3 tickets pour cette catégorie."
            ], 422);
        }

        return DB::transaction(function () use ($validated) {
            $ticket = Ticket::lockForUpdate()->findOrFail($validated['ticket_id']);

            // 3. Check availability
            if ($ticket->available < $validated['quantity']) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Not enough tickets available in this category.'
                ], 422);
            }

            // 3. Calculate Total Price
            $totalPrice = $validated['quantity'] * $ticket->price;

            // 4. Create Booking
            $booking = TicketBooking::create([
                'user_id' => auth('web')->id(),
                'ticket_id' => $ticket->id,
                'quantity' => $validated['quantity'],
                'total_price' => $totalPrice,
                'booking_reference' => 'TIX-' . Str::upper(Str::random(10)),
                'status' => 'confirmed'
            ]);

            // 5. Update Ticket availability
            $ticket->decrement('available', $validated['quantity']);
            
            if ($ticket->available === 0) {
                $ticket->update(['status' => 'sold_out']);
            }

            return response()->json([
                'status' => 'success',
                'data' => $booking->load(['ticket.match.team1', 'ticket.match.team2', 'user']),
                'message' => 'Ticket reserved successfully!'
            ], 201);
        });
    }

    /**
     * List user ticket bookings
     */
    public function index(): JsonResponse
    {
        if (!auth('web')->check()) {
            return response()->json(['status' => 'error', 'message' => 'Unauthorized.'], 401);
        }

        $bookings = TicketBooking::where('user_id', auth('web')->id())
            ->with(['ticket.match.team1', 'ticket.match.team2'])
            ->latest()
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $bookings
        ]);
    }
}
