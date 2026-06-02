<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

try {
    $b = App\Models\TicketBooking::create([
        'user_id' => 1,
        'ticket_id' => 1,
        'hospitality_id' => null,
        'quantity' => 1,
        'total_price' => 150,
        'booking_reference' => 'TIX-TEST123',
        'status' => 'confirmed'
    ]);
    echo "OK: " . $b->id;
} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage();
}
