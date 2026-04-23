<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\AccommodationController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\TickerController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\JoueurController;
use App\Http\Controllers\Api\V1\PaysController;
use App\Http\Controllers\Api\V1\VilleController;
use App\Http\Controllers\Api\V1\FanZoneController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;

// ── Public API Routes ────────────────────────────────────────
Route::prefix('v1')->group(function () {

    // Stats & Standings
    Route::get('/stats',     [ApiController::class, 'stats']);
    Route::get('/standings', [ApiController::class, 'standings']);

    // Ticker (public — active items only)
    Route::get('/ticker', [TickerController::class, 'index']);

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

    // Matches (Public GETs)
    Route::get('/matches',        [ApiController::class, 'matches']);
    Route::get('/matches/{id}',   [ApiController::class, 'match']);

    // Search
    Route::get('/search', [ApiController::class, 'search']);

    // Highlights (Public)
    Route::get('/highlights', [ApiController::class, 'indexHighlights']);
    Route::post('/highlights/{highlight}/view',     [ApiController::class, 'incrementHighlightView']);
    Route::post('/highlights/{highlight}/like',     [ApiController::class, 'toggleHighlightLike']);
    Route::get('/highlights/{highlight}/comments',  [ApiController::class, 'indexHighlightComments']);
    Route::post('/highlights/{highlight}/comments', [ApiController::class, 'storeHighlightComment']);

    // Cities (Public)
    Route::middleware('throttle:60,1')->group(function () {
        Route::get('/cities',                                [CityController::class, 'index']);
        Route::get('/cities/{slug}',                         [CityController::class, 'show']);
        Route::get('/cities/{slug}/accommodations',          [AccommodationController::class, 'index']);
    });

    // Reservations (Protected)
    Route::middleware('auth:web')->group(function () {
        Route::post('/reservations',                         [ReservationController::class, 'store']);
        Route::get('/reservations/user',                     [ReservationController::class, 'userReservations']);
        Route::delete('/reservations/{id}',                  [ReservationController::class, 'destroy']);
        
        // Ticket Bookings
        Route::post('/ticket-bookings',                      [\App\Http\Controllers\TicketBookingController::class, 'store']);
        Route::get('/ticket-bookings',                       [\App\Http\Controllers\TicketBookingController::class, 'index']);
    });

    // Accommodation Details
    Route::get('/accommodations/{id}', [AccommodationController::class, 'show']);

    // Tickets (Public)
    Route::get('/tickets', [ApiController::class, 'indexTickets']);

    // Referees (Public)
    Route::get('/referees', [ApiController::class, 'indexReferees']);
    Route::get('/referees/{referee}', [ApiController::class, 'showReferee']);

    // Fan Zones, Cities & Countries (New Dynamic System)
    Route::get('/pays', [PaysController::class, 'index']);
    Route::post('/pays', [PaysController::class, 'store']);
    Route::put('/pays/{id}', [PaysController::class, 'update']);
    Route::delete('/pays/{id}', [PaysController::class, 'destroy']);

    Route::get('/villes', [VilleController::class, 'index']);
    Route::post('/villes', [VilleController::class, 'store']);
    Route::put('/villes/{id}', [VilleController::class, 'update']);
    Route::delete('/villes/{id}', [VilleController::class, 'destroy']);

    Route::get('/fan-zones', [FanZoneController::class, 'index']);
    Route::get('/fan-zones/{id}', [FanZoneController::class, 'show']);
    Route::post('/fan-zones', [FanZoneController::class, 'store']);
    Route::put('/fan-zones/{id}', [FanZoneController::class, 'update']);
    Route::delete('/fan-zones/{id}', [FanZoneController::class, 'destroy']);


    // Hospitalities (Public)
    Route::get('/hospitalities', [ApiController::class, 'indexHospitalities']);

    // Teams (Public)
    Route::get('/teams', [TeamController::class, 'index']);
    Route::get('/teams/{team}', [TeamController::class, 'show']);

    // Joueurs (Public)
    Route::get('/joueurs/top-scorers',      [JoueurController::class, 'topScorers']);
    Route::get('/joueurs',                  [JoueurController::class, 'index']);
    Route::get('/joueurs/{joueur}',         [JoueurController::class, 'show']);

    // Admin routes (protected)
    Route::middleware(['auth:web', AdminMiddleware::class])->prefix('admin')->group(function () {
        Route::get('/dashboard', [AuthController::class, 'user']);
        
        // Admin Highlights Management
        Route::post('/highlights',        [ApiController::class, 'storeHighlight']);
        Route::put('/highlights/{highlight}', [ApiController::class, 'updateHighlight']);
        Route::delete('/highlights/{highlight}', [ApiController::class, 'destroyHighlight']);

        // Admin Tickets Management
        Route::get('/tickets', [ApiController::class, 'indexTickets']);
        Route::post('/tickets', [ApiController::class, 'storeTicket']);
        Route::put('/tickets/{ticket}', [ApiController::class, 'updateTicket']);
        Route::delete('/tickets/{ticket}', [ApiController::class, 'destroyTicket']);

        // Admin Referees Management
        Route::post('/referees',           [ApiController::class, 'storeReferee']);
        Route::put('/referees/{referee}',  [ApiController::class, 'updateReferee']);
        Route::delete('/referees/{referee}', [ApiController::class, 'destroyReferee']);

        // Admin Matches Management
        Route::post('/matches',       [ApiController::class, 'storeMatch']);
        Route::put('/matches/{id}',   [ApiController::class, 'updateMatch']);
        Route::delete('/matches/{id}',[ApiController::class, 'destroyMatch']);

        // Admin Fan Zones Management (Now handled by top-level routes for simplicity as per request)


        // Admin Hospitalities Management
        Route::post('/hospitalities',        [ApiController::class, 'storeHospitality']);
        Route::put('/hospitalities/{hospitality}', [ApiController::class, 'updateHospitality']);
        Route::delete('/hospitalities/{hospitality}', [ApiController::class, 'destroyHospitality']);
        
        // Admin News Management
        Route::post('/news',          [ApiController::class, 'storeNews']);
        Route::put('/news/{id}',      [ApiController::class, 'updateNews']);
        Route::delete('/news/{id}',   [ApiController::class, 'destroyNews']);

        // Admin Ticker Management
        Route::get('/ticker',                   [TickerController::class, 'indexAll']);
        Route::post('/ticker',                  [TickerController::class, 'store']);
        Route::put('/ticker/{ticker}',          [TickerController::class, 'update']);
        Route::delete('/ticker/{ticker}',       [TickerController::class, 'destroy']);

        // Admin Teams Management
        Route::post('/teams',                   [TeamController::class, 'store']);
        Route::put('/teams/{team}',             [TeamController::class, 'update']);
        Route::delete('/teams/{team}',          [TeamController::class, 'destroy']);

        // Admin Joueurs Management
        Route::get('/joueurs',                  [JoueurController::class, 'index']);
        Route::post('/joueurs',                 [JoueurController::class, 'store']);
        Route::put('/joueurs/{joueur}',         [JoueurController::class, 'update']);
        Route::delete('/joueurs/{joueur}',      [JoueurController::class, 'destroy']);
    });
});
