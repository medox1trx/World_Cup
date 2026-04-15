<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Http\Requests\StoreReservationRequest;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class ReservationController extends Controller
{
    /**
     * Store a newly created reservation.
     */
    public function store(StoreReservationRequest $request): JsonResponse
    {
        // 1. Ensure user is authenticated
        if (!auth('web')->check()) {
            return response()->json(['status' => 'error', 'message' => 'Unauthorized. Please login.'], 401);
        }

        $validated = $request->validated();
        $acc = \App\Models\Accommodation::findOrFail($validated['accommodation_id']);

        $checkIn = Carbon::parse($validated['check_in'])->format('Y-m-d');
        $checkOut = Carbon::parse($validated['check_out'])->format('Y-m-d');

        // 2. Check overlap
        $overlap = Reservation::where('accommodation_id', $acc->id)
            ->where(function ($query) use ($checkIn, $checkOut) {
                $query->whereBetween('check_in', [$checkIn, $checkOut])
                      ->orWhereBetween('check_out', [$checkIn, $checkOut])
                      ->orWhere(function ($q) use ($checkIn, $checkOut) {
                          $q->where('check_in', '<=', $checkIn)
                            ->where('check_out', '>=', $checkOut);
                      });
            })
            ->exists();

        if ($overlap) {
            return response()->json([
                'status' => 'error',
                'message' => 'This accommodation is already booked for the selected dates.'
            ], 422);
        }

        // 3. Calculate Price
        $checkInDate = Carbon::parse($validated['check_in']);
        $checkOutDate = Carbon::parse($validated['check_out']);
        $nights = $checkInDate->diffInDays($checkOutDate);
        if ($nights <= 0) $nights = 1;

        $totalPrice = $nights * $acc->price_per_night;

        // 4. Create
        $reservation = Reservation::create([
            'accommodation_id' => $acc->id,
            'user_id' => auth('web')->id(),
            'check_in' => $checkIn,
            'check_out' => $checkOut,
            'guests' => $validated['guests'],
            'notes' => $validated['notes'] ?? null,
            'total_price' => $totalPrice,
            'status' => 'confirmed'
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $reservation->load('accommodation.city'),
            'message' => 'Reservation completed successfully.'
        ], 201);
    }

    /**
     * List user reservations
     */
    public function userReservations(): JsonResponse
    {
        if (!auth('web')->check()) {
            return response()->json(['status' => 'error', 'message' => 'Unauthorized.'], 401);
        }

        $reservations = Reservation::where('user_id', auth('web')->id())
            ->with(['accommodation.city'])
            ->orderBy('check_in', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $reservations
        ]);
    }

    /**
     * Cancel a reservation.
     */
    public function destroy(int $id): JsonResponse
    {
        $reservation = Reservation::findOrFail($id);

        // Authorization check
        if ($reservation->user_id !== auth('web')->id()) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not authorized to cancel this reservation.'
            ], 403);
        }

        // Business logic: check if it's already in the past? (Optional but good)
        // For now, let's just allow it or check if it's started.
        $now = Carbon::now();
        $checkIn = Carbon::parse($reservation->check_in);
        
        if ($checkIn->lt($now)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cannot cancel a reservation that has already started.'
            ], 422);
        }

        $reservation->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Reservation cancelled successfully.'
        ]);
    }
}
