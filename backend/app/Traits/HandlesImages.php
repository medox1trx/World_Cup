<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait HandlesImages
{
    /**
     * Handle image upload or URL input.
     *
     * @param Request     $request
     * @param string      $field    The field name (e.g., 'flag', 'photo')
     * @param string      $folder   The subfolder name (e.g., 'teams', 'players')
     * @param string|null $oldPath  Existing path to delete if replaced
     * @return string|null
     */
    protected function handleImage(Request $request, string $field, string $folder, string $oldPath = null)
    {
        // ── File upload ────────────────────────────────────────────────
        if ($request->hasFile($field)) {
            $file     = $request->file($field);
            $filename = time()
                . '_'
                . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME))
                . '.'
                . $file->getClientOriginalExtension();

            // Store in public disk under uploads/{folder}/
            $file->storeAs("uploads/{$folder}", $filename, 'public');

            // Delete the old local file if it was a stored upload
            if ($oldPath && Str::startsWith($oldPath, 'uploads/')) {
                Storage::disk('public')->delete($oldPath);
            }

            return "uploads/{$folder}/{$filename}";
        }

        // ── External URL ───────────────────────────────────────────────
        $urlValue = $request->input($field);
        if ($urlValue && filter_var($urlValue, FILTER_VALIDATE_URL)) {
            // Delete old local file if being replaced by a URL
            if ($oldPath && Str::startsWith($oldPath, 'uploads/')) {
                Storage::disk('public')->delete($oldPath);
            }
            return $urlValue;
        }

        // ── No new image provided — keep existing value ────────────────
        return $oldPath;
    }
}
