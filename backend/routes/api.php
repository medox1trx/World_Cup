<?php
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\FootballMatchController;

Route::get('/test', [ApiController::class, 'test']);
Route::get('/matches', [FootballMatchController::class, 'index']);
Route::get('/matches/group/{id}', [FootballMatchController::class, 'matchesByGroup']);
Route::get('/matches/{id}', [FootballMatchController::class, 'show']);
Route::get('/groups', [FootballMatchController::class, 'listGroups']);
