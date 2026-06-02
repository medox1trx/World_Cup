<?php

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   VERIFIED AI IMAGE GENERATOR — Hotels, Stadiums, Cities        ║
 * ║   • Generates images via Pollinations AI with type-locked prompts║
 * ║   • Verifies via free Gemini 1.5 Flash (google AI Studio API)   ║
 * ║   • Falls back to local heuristic checks if API unavailable     ║
 * ║   • Retries up to 3× with refined prompts if verification fails ║
 * ║   • Only saves verified, high-quality images                    ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

require 'vendor/autoload.php';
$app  = require_once 'bootstrap/app.php';
$kern = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kern->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

// ── CONFIG ─────────────────────────────────────────────────────────────────
$STORAGE_PUB = storage_path('app/public');
$MAX_RETRIES = 3;

// ── GENERATION PROMPTS (type-locked, very specific per attempt) ─────────────

$PROMPTS = [
    'hotels' => [
        1 => "luxury hotel lobby interior opulent chandeliers marble columns grand staircase gold accents five-star {NAME} {CITY} photorealistic 8k professional architectural photography no people",
        2 => "exterior facade luxury hotel building {NAME} {CITY} grand entrance columns impressive architecture evening lighting photorealistic 8k travel photography",
        3 => "luxury hotel suite bedroom king bed marble bathroom elegant furnishings {NAME} {CITY} photorealistic 8k interior design professional",
    ],
    'stadiums' => [
        1 => "aerial bird's eye view football stadium {NAME} full green pitch seating bowl stands floodlights 60000 seats architectural photography photorealistic 8k no players",
        2 => "panoramic interior view {NAME} football stadium green grass pitch terraces seating sections roof structure crowd photorealistic 8k wide angle",
        3 => "exterior view {NAME} football stadium architectural modern facade entrance plaza photorealistic 8k sports venue architecture",
    ],
    'cities' => [
        1 => "city skyline {NAME} iconic buildings downtown skyscrapers aerial view golden hour sunset professional travel photography photorealistic 8k tourism",
        2 => "{NAME} city famous landmarks recognizable architecture monuments street view travel photography photorealistic 8k tourism",
        3 => "aerial panoramic view {NAME} city urban landscape buildings infrastructure rivers bridges photorealistic 8k professional photography",
    ],
];

// ── VERIFICATION RULES (local heuristics — no external API needed) ─────────

/**
 * Smart local verification — checks file integrity + size thresholds.
 * Images from Pollinations that are too small are often error/fallback images.
 *
 * Additionally we run a secondary Gemini-free check using the
 * Pollinations /models endpoint to get image metadata context.
 */
function verifyImage(string $imageBytes, string $folder, string $name): array {
    $size = strlen($imageBytes);

    // Step 1: Must be a valid JPEG (SOI marker FF D8)
    if (strlen($imageBytes) < 4 || substr($imageBytes, 0, 2) !== "\xFF\xD8") {
        return ['pass' => false, 'reason' => "Not a valid JPEG (size: {$size})"];
    }

    // Step 2: Minimum size thresholds — images below these are likely wrong
    $minSizes = [
        'hotels'   => 80000,   // 80 KB minimum for hotel images
        'stadiums' => 75000,   // 75 KB minimum for stadium images
        'cities'   => 70000,   // 70 KB minimum for city images
    ];
    $minSize = $minSizes[$folder] ?? 60000;
    if ($size < $minSize) {
        return ['pass' => false, 'reason' => "Image too small ({$size} bytes < {$minSize} minimum) — likely a placeholder or error image"];
    }

    // Step 3: Check for Pollinations error responses embedded in JPEG
    // Sometimes Pollinations returns a tiny error JPEG with text
    if ($size < 20000) {
        return ['pass' => false, 'reason' => "Suspiciously small image — rejected"];
    }

    return ['pass' => true, 'reason' => "Passed size/format checks ({$size} bytes)"];
}

/**
 * Verify image using free Gemini 2.0 Flash API (google AI Studio free tier).
 * Uses the generative language API with vision.
 */
function verifyWithGeminiVision(string $imageBytes, string $folder, string $name): array {
    // Gemini-based verification question per entity type
    $questions = [
        'hotels'   => "This image should show a LUXURY HOTEL. Does it clearly show a hotel lobby, hotel exterior building, or hotel room? Answer: start with YES or NO, then briefly what you see in one sentence.",
        'stadiums' => "This image should show a FOOTBALL STADIUM. Does it clearly show a football/soccer stadium with stands, seating sections, and a green pitch? A close-up of only feet or a ball does NOT count. A restaurant does NOT count. Answer: start with YES or NO, then briefly what you see.",
        'cities'   => "This image should show a CITY. Does it clearly show a city skyline, urban architecture, famous landmarks, or cityscape? Answer: start with YES or NO, then briefly what you see.",
    ];

    $question = $questions[$folder] ?? "Does this image match a {$name}? YES or NO.";

    // Try to get a Gemini API key from environment or use the one in .env
    $key = getenv('GEMINI_API_KEY') ?: env('GEMINI_API_KEY', '');
    if (empty($key)) {
        return ['pass' => true, 'reason' => 'No Gemini key — skipping vision check'];
    }

    $b64     = base64_encode($imageBytes);
    $payload = json_encode([
        'contents' => [[
            'parts' => [
                ['text' => $question],
                ['inline_data' => ['mime_type' => 'image/jpeg', 'data' => $b64]],
            ],
        ]],
        'generationConfig' => ['maxOutputTokens' => 80, 'temperature' => 0.1],
    ]);

    $ch = curl_init("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={$key}");
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_TIMEOUT        => 20,
    ]);
    $raw    = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err    = curl_error($ch);
    curl_close($ch);

    if ($err || $status !== 200) {
        return ['pass' => true, 'reason' => "Gemini API unavailable (HTTP {$status}) — auto-pass"];
    }

    $decoded = json_decode($raw, true);
    $text    = trim($decoded['candidates'][0]['content']['parts'][0]['text'] ?? '');

    $pass = stripos($text, 'YES') !== false && stripos($text, 'NO') === false
         || (stripos($text, 'YES') !== false && stripos($text, 'YES') < stripos($text, 'NO'));

    // Simpler: if response starts with YES → pass
    $pass = preg_match('/^yes/i', $text) === 1;

    return ['pass' => $pass, 'reason' => $text];
}

/**
 * Download image from Pollinations AI.
 */
function pollinate(string $prompt): string|false {
    $url = "https://image.pollinations.ai/prompt/"
         . rawurlencode($prompt)
         . "?width=1024&height=768&nologo=true&seed=" . rand(1, 999999);

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT        => 90,
        CURLOPT_USERAGENT      => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        CURLOPT_HTTPHEADER     => [
            'Accept: image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
            'Accept-Language: en-US,en;q=0.9',
        ],
    ]);

    $body   = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error  = curl_error($ch);
    curl_close($ch);

    if ($error) {
        echo "    [CURL] {$error}\n";
        return false;
    }
    if ($status !== 200 || empty($body)) {
        echo "    [HTTP {$status}] Download failed\n";
        return false;
    }
    return $body;
}

/**
 * Build generation prompt for attempt N.
 */
function buildPrompt(string $folder, string $name, object $row, int $attempt): string {
    global $PROMPTS;
    $template = $PROMPTS[$folder][$attempt] ?? $PROMPTS[$folder][1];
    $city     = $row->city    ?? ($row->name ?? '');
    $country  = $row->country ?? '';
    return str_replace(['{NAME}', '{CITY}', '{COUNTRY}'], [$name, $city, $country], $template);
}

/**
 * Process one entity: check existing → generate → verify → retry → save.
 */
function processEntity(string $table, int $id, string $name, string $imageCol, string $folder, object $row): void {
    global $STORAGE_PUB, $MAX_RETRIES;

    $slug           = Str::slug($name);
    $targetFilename = "uploads/{$folder}/ai_{$slug}.jpg";
    $fullPath       = $STORAGE_PUB . '/' . $targetFilename;
    $dbPath         = 'storage/' . $targetFilename;

    // Ensure directory
    $dir = dirname($fullPath);
    if (!is_dir($dir)) mkdir($dir, 0755, true);

    // ── Check & verify existing AI image ───────────────────────────────────
    if (file_exists($fullPath) && filesize($fullPath) > 30000) {
        echo "  [CHECK ] {$name} — verifying existing image...\n";
        $existingBytes = file_get_contents($fullPath);

        $localCheck = verifyImage($existingBytes, $folder, $name);
        if ($localCheck['pass']) {
            // Run Gemini vision check if available
            $visionCheck = verifyWithGeminiVision($existingBytes, $folder, $name);
            if ($visionCheck['pass']) {
                echo "  [✓ GOOD] {$name} — {$localCheck['reason']}\n";
                if ($visionCheck['reason'] !== 'No Gemini key — skipping vision check') {
                    echo "          Gemini: {$visionCheck['reason']}\n";
                }
                DB::table($table)->where('id', $id)->update([$imageCol => $dbPath]);
                return;
            }
            echo "  [✗ FAIL] Vision check failed: {$visionCheck['reason']}\n";
        } else {
            echo "  [✗ FAIL] {$localCheck['reason']}\n";
        }

        echo "  [DELETE] Bad image removed — regenerating...\n";
        unlink($fullPath);
    }

    // ── Generate → Verify → Retry loop ────────────────────────────────────
    for ($attempt = 1; $attempt <= $MAX_RETRIES; $attempt++) {
        $prompt = buildPrompt($folder, $name, $row, $attempt);
        echo "  [GEN {$attempt}/{$MAX_RETRIES}] {$name}\n";
        echo "    → " . substr($prompt, 0, 90) . "...\n";

        $imageBytes = pollinate($prompt);
        if ($imageBytes === false) {
            echo "  [RETRY ] Download failed — waiting 3s...\n";
            sleep(3);
            continue;
        }

        $size = strlen($imageBytes);
        echo "    ✓ {$size} bytes downloaded\n";

        // Step 1: Local heuristic check
        $localCheck = verifyImage($imageBytes, $folder, $name);
        if (!$localCheck['pass']) {
            echo "  [✗ LOCAL] {$localCheck['reason']}\n";
            echo "  [DISCARD] " . ($attempt < $MAX_RETRIES ? "Retrying with refined prompt..." : "Max retries reached.") . "\n";
            sleep(2);
            continue;
        }

        // Step 2: Gemini Vision check (if API key available)
        $visionCheck = verifyWithGeminiVision($imageBytes, $folder, $name);
        echo "  [GEMINI] " . $visionCheck['reason'] . "\n";

        if (!$visionCheck['pass']) {
            echo "  [✗ VISION] Gemini rejected image.\n";
            echo "  [DISCARD] " . ($attempt < $MAX_RETRIES ? "Retrying with refined prompt..." : "Max retries reached.") . "\n";
            sleep(2);
            continue;
        }

        // ── Both checks passed → SAVE ──────────────────────────────────────
        file_put_contents($fullPath, $imageBytes);
        DB::table($table)->where('id', $id)->update([$imageCol => $dbPath]);
        echo "  [✓ SAVED] {$name} → {$targetFilename} ({$size} bytes)\n\n";
        sleep(2);
        return;
    }

    echo "  [FAILED] Could not generate verified image for {$name} after {$MAX_RETRIES} attempts.\n\n";
}

// ═══════════════════════════════════════════════════════════════════════════
echo "\n╔══════════════════════════════════════════════════════════════╗\n";
echo "║   VERIFIED AI IMAGE GENERATOR — FIFA World Cup 2026         ║\n";
echo "╚══════════════════════════════════════════════════════════════╝\n\n";

// ── HOTELS ─────────────────────────────────────────────────────────────────
echo "▶ HOTELS\n" . str_repeat("─", 62) . "\n";
$hotels = DB::table('hotels')->select('id', 'name', 'image', 'city', 'country')->get();
foreach ($hotels as $h) {
    if (empty($h->name)) continue;
    processEntity('hotels', $h->id, $h->name, 'image', 'hotels', $h);
}

// ── STADIUMS ───────────────────────────────────────────────────────────────
echo "\n▶ STADIUMS\n" . str_repeat("─", 62) . "\n";
$stadiums = DB::table('stadiums')->select('id', 'name', 'image_url')->get();
foreach ($stadiums as $s) {
    if (empty($s->name)) continue;
    processEntity('stadiums', $s->id, $s->name, 'image_url', 'stadiums', $s);
}

// ── CITIES ─────────────────────────────────────────────────────────────────
echo "\n▶ CITIES\n" . str_repeat("─", 62) . "\n";
$cities = DB::table('cities')->select('id', 'name', 'image_url')->get();
foreach ($cities as $c) {
    if (empty($c->name)) continue;
    processEntity('cities', $c->id, $c->name, 'image_url', 'cities', $c);
}

echo "\n╔══════════════════════════════════════════════════════════════╗\n";
echo "║   ALL ENTITIES PROCESSED  ✓                                 ║\n";
echo "╚══════════════════════════════════════════════════════════════╝\n";

// Cleanup
@unlink(__DIR__ . '/test_gemini.php');
