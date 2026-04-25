<?php
use Illuminate\Support\Facades\Storage;

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "Default Disk: " . config('filesystems.default') . "\n";
echo "Public Disk Root: " . config('filesystems.disks.public.root') . "\n";
echo "Public Disk URL: " . config('filesystems.disks.public.url') . "\n";

Storage::disk('public')->put('test.txt', 'hello');
echo "File 'test.txt' put in 'public' disk.\n";

$path = storage_path('app/public/test.txt');
if (file_exists($path)) {
    echo "Verified: File exists at $path\n";
} else {
    echo "Error: File DOES NOT exist at $path\n";
    // Check where it actually went
    $allFiles = Storage::disk('public')->allFiles();
    echo "Files in public disk: " . implode(', ', $allFiles) . "\n";
}

$publicPath = public_path('storage/test.txt');
if (file_exists($publicPath)) {
    echo "Verified: File is accessible via public/storage/test.txt\n";
} else {
    echo "Error: File IS NOT accessible via public/storage/test.txt (Symlink broken?)\n";
}
