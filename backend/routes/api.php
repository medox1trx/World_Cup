<?php
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/search', function(Request $request){

    $q = $request->q;

    return [
        ['name'=>'France','type'=>'team'],
        ['name'=>'Brazil','type'=>'team'],
        ['name'=>'Final Match','type'=>'match']
    ];

});

Route::get('/test', [ApiController::class, 'test']);
