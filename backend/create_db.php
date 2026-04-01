<?php
try {
    $pdo = new PDO('mysql:host=127.0.0.1', 'root', '');
    $pdo->exec('CREATE DATABASE IF NOT EXISTS wc_data_1');
    echo "Database 'wc_data_1' created or already exists.\n";
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage() . "\n");
}
