<?php
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::get('/news', function () {

    $response = Http::get('https://newsapi.org/v2/everything', [
        'q' => 'world cup',
        'language' => 'en',
        'sortBy' => 'publishedAt',
        'apiKey' => env('NEWS_API_KEY'),
    ]);

    return $response->json();
});