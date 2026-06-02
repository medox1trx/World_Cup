<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        if (!$request->user()->isSuperAdmin()) {
            return response()->json(['message' => 'Accès refusé. Droits Super Administrateur requis.'], 403);
        }

        $users = User::all();
        return response()->json($users);
    }

    public function update(Request $request, User $user)
    {
        if (!$request->user()->isSuperAdmin()) {
            return response()->json(['message' => 'Accès refusé. Droits Super Administrateur requis.'], 403);
        }

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'sometimes|string|in:user,admin,super_admin',
        ]);

        $user->update($request->only(['name', 'email', 'role']));

        return response()->json($user);
    }

    public function destroy(Request $request, User $user)
    {
        if (!$request->user()->isSuperAdmin()) {
            return response()->json(['message' => 'Accès refusé. Droits Super Administrateur requis.'], 403);
        }

        // Prevent super admin from deleting themselves
        if ($request->user()->id === $user->id) {
            return response()->json(['message' => 'Vous ne pouvez pas supprimer votre propre compte.'], 400);
        }

        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès.']);
    }
}
