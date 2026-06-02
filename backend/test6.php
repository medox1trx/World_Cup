<?php
require 'vendor/autoload.php';
putenv('APP_DEBUG=true');
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
config(['app.debug' => true]);

Auth::loginUsingId(1);
$request = Illuminate\Http\Request::create('/api/v1/reservations/user', 'GET');
$request->headers->set('Accept', 'application/json');
$response = app()->handle($request);

if ($response->exception) {
    echo "Exception: " . $response->exception->getMessage() . "\n";
    echo "File: " . $response->exception->getFile() . ":" . $response->exception->getLine() . "\n";
} else {
    echo "Status: " . $response->getStatusCode() . "\n";
    echo $response->getContent();
}
