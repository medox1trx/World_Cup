<?php

use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Route;

// ── Public API Routes ────────────────────────────────────────
Route::prefix('v1')->group(function () {

    // Stats & Standings
    Route::get('/stats',     [ApiController::class, 'stats']);
    Route::get('/standings', [ApiController::class, 'standings']);

    // News Proxy
    Route::get('/news',  [ApiController::class, 'news']);

    // Matches
    Route::get('/matches',        [ApiController::class, 'matches']);
    Route::get('/matches/{id}',   [ApiController::class, 'match']);
    Route::post('/matches',       [ApiController::class, 'storeMatch']);
    Route::put('/matches/{id}',   [ApiController::class, 'updateMatch']);
    Route::delete('/matches/{id}',[ApiController::class, 'destroyMatch']);

    // Search
    Route::get('/search', [ApiController::class, 'search']);
});