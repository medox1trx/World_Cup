<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

try {
    $booking = App\Models\TicketBooking::find(1);
    $booking->load(['ticket.match.team1', 'ticket.match.team2', 'user']);
    echo "OK: Loaded";
} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage();
}
