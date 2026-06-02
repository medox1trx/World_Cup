<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// Simulate API Request
$request = Illuminate\Http\Request::create('/api/v1/ticket-bookings', 'POST', [
    'ticket_id' => 1,
    'quantity' => 1,
    'hospitality_id' => null
]);
$request->headers->set('Accept', 'application/json');

Auth::loginUsingId(1);
$response = app()->handle($request);
echo "Status: " . $response->getStatusCode() . "\n";
echo "Content: " . $response->getContent();
