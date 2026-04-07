<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');

