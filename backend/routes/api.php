<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApiController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;

// ── Public API Routes ────────────────────────────────────────
Route::prefix('v1')->group(function () {

    // Stats & Standings
    Route::get('/stats',     [ApiController::class, 'stats']);
    Route::get('/standings', [ApiController::class, 'standings']);

    // News Proxy
    Route::get('/news',  [ApiController::class, 'news']);
    // Auth (public)
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login',    [AuthController::class, 'login']);
    
    // Social Auth (public)
    Route::get('/auth/google/redirect', [\App\Http\Controllers\Auth\SocialController::class, 'redirectToGoogle']);
    Route::get('/auth/google/callback', [\App\Http\Controllers\Auth\SocialController::class, 'handleGoogleCallback']);
    Route::get('/auth/facebook/redirect', [\App\Http\Controllers\Auth\SocialController::class, 'redirectToFacebook']);
    Route::get('/auth/facebook/callback', [\App\Http\Controllers\Auth\SocialController::class, 'handleFacebookCallback']);

    // Auth (protected — session-based)
    Route::middleware('auth:web')->group(function () {
        Route::post('/auth/logout',  [AuthController::class, 'logout']);
        Route::get('/auth/user',     [AuthController::class, 'user']);
        Route::put('/auth/profile',  [AuthController::class, 'updateProfile']);
    });

    // Stats
    Route::get('/stats', [ApiController::class, 'stats']);

    // Matches
    Route::get('/matches',        [ApiController::class, 'matches']);
    Route::get('/matches/{id}',   [ApiController::class, 'match']);
    Route::post('/matches',       [ApiController::class, 'storeMatch']);
    Route::put('/matches/{id}',   [ApiController::class, 'updateMatch']);
    Route::delete('/matches/{id}',[ApiController::class, 'destroyMatch']);

    // Search
    Route::get('/search', [ApiController::class, 'search']);

    // Admin routes (protected)
    Route::middleware(['auth:web', AdminMiddleware::class])->prefix('admin')->group(function () {
        Route::get('/dashboard', [AuthController::class, 'user']);
    });
});
