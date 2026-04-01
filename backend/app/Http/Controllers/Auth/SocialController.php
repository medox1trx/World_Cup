<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;

class SocialController extends Controller
{
    /**
     * Redirect the user to the Google authentication page.
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle the callback from Google.
     */
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            
            // Find or create user
            $user = $this->findOrCreateUser($googleUser, 'google');
            
            // Log the user in
            Auth::login($user, true);
            
            // Redirect to frontend
            return redirect()->to(env('FRONTEND_URL', 'http://localhost:3000'));
        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('Google OAuth error: ' . $e->getMessage());
            
            // Redirect back with error
            return redirect()->to(env('FRONTEND_URL', 'http://localhost:3000') . '/login?error=google_oauth_failed');
        }
    }

    /**
     * Redirect the user to the Facebook authentication page.
     */
    public function redirectToFacebook()
    {
        return Socialite::driver('facebook')->redirect();
    }

    /**
     * Handle the callback from Facebook.
     */
    public function handleFacebookCallback()
    {
        try {
            $facebookUser = Socialite::driver('facebook')->user();
            
            // Find or create user
            $user = $this->findOrCreateUser($facebookUser, 'facebook');
            
            // Log the user in
            Auth::login($user, true);
            
            // Redirect to frontend
            return redirect()->to(env('FRONTEND_URL', 'http://localhost:3000'));
        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('Facebook OAuth error: ' . $e->getMessage());
            
            // Redirect back with error
            return redirect()->to(env('FRONTEND_URL', 'http://localhost:3000') . '/login?error=facebook_oauth_failed');
        }
    }

    /**
     * Find or create a user from social provider data.
     */
    private function findOrCreateUser($socialUser, $provider)
    {
        // Check if user exists by email
        $user = User::where('email', $socialUser->getEmail())->first();
        
        if ($user) {
            // Update provider ID if not set
            if (empty($user->getAttribute($provider . '_id'))) {
                $user->{$provider . '_id'} = $socialUser->getId();
                $user->save();
            }
            return $user;
        }
        
        // Create new user
        $newUser = User::create([
            'name' => $socialUser->getName(),
            'email' => $socialUser->getEmail(),
            'password' => Hash::make(uniqid()), // Random password for social users
            $provider . '_id' => $socialUser->getId(),
            'role' => 'user',
        ]);
        
        return $newUser;
    }
}