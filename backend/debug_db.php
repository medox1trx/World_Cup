<?php
use App\Models\Joueur;

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$joueurs = Joueur::all();
foreach ($joueurs as $j) {
    echo "ID: {$j->id}, Name: {$j->nom}, Photo Path: {$j->photo}\n";
}
