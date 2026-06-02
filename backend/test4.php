<?php
require 'vendor/autoload.php';
putenv('APP_DEBUG=true');
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
config(['app.debug' => true]);

Auth::loginUsingId(1);
$request = Illuminate\Http\Request::create('/api/v1/ticket-bookings', 'POST', [
    'ticket_id' => 1,
    'quantity' => 1,
    'hospitality_id' => null
]);
$request->headers->set('Accept', 'application/json');
$response = app()->handle($request);
echo $response->getContent();
