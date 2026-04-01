<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ], [
            'name.required'     => 'Le nom est obligatoire.',
            'email.required'    => 'L\'e-mail est obligatoire.',
            'email.email'       => 'Adresse e-mail invalide.',
            'email.unique'      => 'Cet e-mail est déjà utilisé.',
            'password.required' => 'Le mot de passe est obligatoire.',
            'password.min'      => 'Minimum 6 caractères.',
            'password.confirmed'=> 'Les mots de passe ne correspondent pas.',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => 'user',
        ]);

        Auth::login($user);

        return response()->json([
            'user' => $this->serializeUser($user),
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ], [
            'email.required'    => 'L\'e-mail est obligatoire.',
            'email.email'       => 'Adresse e-mail invalide.',
            'password.required' => 'Le mot de passe est obligatoire.',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['Ces identifiants ne correspondent à aucun compte.'],
            ]);
        }

        $request->session()->regenerate();

        return response()->json([
            'user' => $this->serializeUser(Auth::user()),
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Déconnecté']);
    }

    public function user(Request $request)
    {
        if (!$request->user()) {
            return response()->json(['user' => null], 200);
        }

        return response()->json([
            'user' => $this->serializeUser($request->user()),
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Non authentifié.'], 401);
        }

        $rules = [
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
        ];

        $messages = [
            'name.max'      => 'Le nom ne peut pas dépasser 255 caractères.',
            'email.email'   => 'Adresse e-mail invalide.',
            'email.unique'  => 'Cet e-mail est déjà utilisé.',
        ];

        $request->validate($rules, $messages);

        $data = $request->only(['name', 'email']);

        if (!empty($data)) {
            $user->update($data);
        }

        return response()->json([
            'user' => $this->serializeUser($user->fresh()),
            'message' => 'Profil mis à jour avec succès.',
        ]);
    }

    private function serializeUser(User $user): array
    {
        return [
            'id'    => $user->id,
            'name'  => $user->name,
            'email' => $user->email,
            'role'  => $user->role,
        ];
    }
}
