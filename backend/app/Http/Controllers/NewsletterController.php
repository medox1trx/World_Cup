<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Newsletter;
use Illuminate\Http\JsonResponse;

class NewsletterController extends Controller
{
    public function subscribe(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:newsletters,email',
        ], [
            'email.unique' => 'Cet email est déjà inscrit à notre newsletter.',
            'email.required' => 'L\'adresse email est obligatoire.',
            'email.email' => 'Veuillez entrer une adresse email valide.',
        ]);

        Newsletter::create([
            'email' => $validated['email'],
            'is_active' => true,
        ]);

        return response()->json([
            'message' => 'Merci ! Vous êtes maintenant inscrit à notre newsletter.',
        ], 201);
    }
}
