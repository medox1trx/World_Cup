<?php
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\FootballMatchController;
use App\Http\Controllers\API\GroupController;


Route::get('/test', [ApiController::class, 'test']);
Route::get('/matches', [FootballMatchController::class, 'index']);
Route::get('/matches/group/{id}', [FootballMatchController::class, 'matchesByGroup']);
Route::get('/matches/{id}', [FootballMatchController::class, 'show']);
Route::get('/groups', [GroupController::class, 'index']);
Route::get('/groups/{id}', [GroupController::class, 'show']);

Route::get('/countries', [\App\Http\Controllers\API\HostCityController::class, 'index']);
Route::get('/countries/{id}/cities', [\App\Http\Controllers\API\HostCityController::class, 'getCitiesByCountry']);
Route::get('/cities/{id}', [\App\Http\Controllers\API\HostCityController::class, 'show']);
Route::post('/reservations', [\App\Http\Controllers\API\ReservationController::class, 'store']);


