<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reservation;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'accommodation_id' => 'required|exists:accommodations,id',
            'guest_name' => 'required|string|max:255',
            'guest_email' => 'required|email|max:255',
            'arrival_date' => 'required|date',
            'guests_count' => 'required|integer|min:1'
        ]);

        $reservation = Reservation::create($validated);

        return response()->json([
            'message' => 'Réservation enregistrée avec succès !',
            'reservation' => $reservation
        ], 201);
    }
}
