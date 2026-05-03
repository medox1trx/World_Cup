<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\AccommodationController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\TickerController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\JoueurController;
use App\Http\Controllers\SelectionneurController;
use App\Http\Controllers\Api\V1\PaysController;
use App\Http\Controllers\Api\V1\VilleController;
use App\Http\Controllers\Api\V1\FanZoneController;
use App\Http\Controllers\Api\V1\HospitalityController;
use App\Http\Controllers\GroupController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;

// ── Public API Routes ────────────────────────────────────────
Route::prefix('v1')->group(function () {

    // Stats & Standings
    Route::get('/stats',     [ApiController::class, 'stats']);
    Route::get('/standings', [ApiController::class, 'standings']);

    // Ticker
    Route::get('/ticker', [TickerController::class, 'index']);

    // News Proxy
    Route::get('/news',  [ApiController::class, 'news']);

    // Auth
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login',    [AuthController::class, 'login']);

    // Fan Zones, Cities & Countries
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

    // Hospitalities
    Route::get('/hospitalities', [HospitalityController::class, 'index']);
    Route::get('/hospitalities/{id}', [HospitalityController::class, 'show']);
    Route::post('/hospitalities', [HospitalityController::class, 'store']);
    Route::put('/hospitalities/{hospitality}', [HospitalityController::class, 'update']);
    Route::delete('/hospitalities/{hospitality}', [HospitalityController::class, 'destroy']);

    // Teams & Groups
    Route::get('/teams', [TeamController::class, 'index']);
    Route::get('/teams/{team}', [TeamController::class, 'show']);
    Route::get('/groups', [GroupController::class, 'index']);

    // Matches
    Route::get('/matches',        [ApiController::class, 'matches']);
    Route::get('/matches/{id}',   [ApiController::class, 'match']);

    // Cities & Accommodations
    Route::get('/cities',                                [CityController::class, 'index']);
    Route::get('/cities/{slug}',                         [CityController::class, 'show']);
    Route::get('/cities/{slug}/accommodations',          [AccommodationController::class, 'index']);
    Route::get('/accommodations/{id}',                   [AccommodationController::class, 'show']);

    // Tickets, Referees, Stadiums
    Route::get('/tickets', [ApiController::class, 'indexTickets']);
    Route::get('/referees', [ApiController::class, 'indexReferees']);
    Route::get('/stadiums', [ApiController::class, 'indexStadiums']);

    // Joueurs
    Route::get('/joueurs',                  [JoueurController::class, 'index']);
    Route::get('/joueurs/{joueur}',         [JoueurController::class, 'show']);
    // Selectionneurs
    Route::get('/selectionneurs',           [SelectionneurController::class, 'index']);
    Route::get('/selectionneurs/{selectionneur}', [SelectionneurController::class, 'show']);

    // Auth (protected)
    Route::middleware('auth:web')->group(function () {
        Route::post('/auth/logout',  [AuthController::class, 'logout']);
        Route::get('/auth/user',     [AuthController::class, 'user']);
        Route::put('/auth/profile',  [AuthController::class, 'updateProfile']);
        Route::post('/reservations', [ReservationController::class, 'store']);
        Route::get('/reservations/user', [ReservationController::class, 'userReservations']);
        Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);
    });

    // Admin routes (protected)
    Route::middleware(['auth:web', AdminMiddleware::class])->prefix('admin')->group(function () {
        Route::get('/dashboard', [AuthController::class, 'user']);
        Route::post('/highlights', [ApiController::class, 'storeHighlight']);
        Route::put('/highlights/{highlight}', [ApiController::class, 'updateHighlight']);
        Route::delete('/highlights/{highlight}', [ApiController::class, 'destroyHighlight']);

        Route::post('/tickets', [ApiController::class, 'storeTicket']);
        Route::put('/tickets/{ticket}', [ApiController::class, 'updateTicket']);
        Route::delete('/tickets/{ticket}', [ApiController::class, 'destroyTicket']);

        Route::post('/matches', [ApiController::class, 'storeMatch']);
        Route::put('/matches/{id}', [ApiController::class, 'updateMatch']);
        Route::delete('/matches/{id}', [ApiController::class, 'destroyMatch']);

        Route::post('/news', [ApiController::class, 'storeNews']);
        Route::put('/news/{id}', [ApiController::class, 'updateNews']);
        Route::delete('/news/{id}', [ApiController::class, 'destroyNews']);

        Route::post('/teams', [TeamController::class, 'store']);
        Route::put('/teams/{team}', [TeamController::class, 'update']);
        Route::delete('/teams/{team}', [TeamController::class, 'destroy']);

        Route::get('/joueurs', [JoueurController::class, 'index']);
        Route::post('/joueurs', [JoueurController::class, 'store']);
        Route::put('/joueurs/{joueur}', [JoueurController::class, 'update']);
        Route::delete('/joueurs/{joueur}', [JoueurController::class, 'destroy']);

        Route::get('/referees', [ApiController::class, 'indexReferees']);
        Route::post('/referees', [ApiController::class, 'storeReferee']);
        Route::put('/referees/{referee}', [ApiController::class, 'updateReferee']);
        Route::delete('/referees/{referee}', [ApiController::class, 'destroyReferee']);

        Route::get('/selectionneurs', [SelectionneurController::class, 'index']);
        Route::post('/selectionneurs', [SelectionneurController::class, 'store']);
        Route::put('/selectionneurs/{selectionneur}', [SelectionneurController::class, 'update']);
        Route::delete('/selectionneurs/{selectionneur}', [SelectionneurController::class, 'destroy']);
    });
});
