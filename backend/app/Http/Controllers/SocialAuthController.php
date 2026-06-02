<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class SocialAuthController extends Controller
{
    public function redirectToProvider($provider)
    {
        $url = Socialite::driver($provider)->stateless()->redirect()->getTargetUrl();
        return response()->json(['url' => $url]);
    }

    public function handleProviderCallback(Request $request, $provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->stateless()->user();
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur d\'authentification sociale: ' . $e->getMessage()], 422);
        }

        $user = User::where($provider . '_id', $socialUser->getId())
                    ->orWhere('email', $socialUser->getEmail())
                    ->first();

        if ($user) {
            if (!$user->{$provider . '_id'}) {
                $user->update([$provider . '_id' => $socialUser->getId()]);
            }
        } else {
            $user = User::create([
                'name'     => $socialUser->getName() ?? $socialUser->getNickname(),
                'email'    => $socialUser->getEmail(),
                'password' => Hash::make(Str::random(24)),
                $provider . '_id' => $socialUser->getId(),
                'role'     => 'user',
            ]);
        }

        Auth::login($user, true);
        $request->session()->regenerate();

        return response()->json([
            'user' => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'role'  => $user->role,
            ],
            'message' => 'Connecté avec ' . ucfirst($provider)
        ]);
    }
}
