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
     * @param Request $request
     * @param string $field The field name (e.g., 'flag', 'photo')
     * @param string $folder The folder name (e.g., 'teams', 'players')
     * @param string|null $oldPath Existing path to delete if replaced
     * @return string|null
     */
    protected function handleImage(Request $request, string $field, string $folder, string $oldPath = null)
    {
        // If it's a file upload
        if ($request->hasFile($field)) {
            $file = $request->file($field);
            $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
            
            // Store file in public/uploads
            $path = $file->storeAs("public/uploads", $filename);
            
            // Delete old file if it was a local storage path (uploads/...)
            if ($oldPath && Str::startsWith($oldPath, "uploads/")) {
                Storage::delete("public/$oldPath");
            }
            
            return "uploads/$filename";
        }

        // If it's a URL (check if the field is a string and valid URL)
        $urlValue = $request->input($field);
        if ($urlValue && filter_var($urlValue, FILTER_VALIDATE_URL)) {
            // Delete old local file if replacing with a URL
            if ($oldPath && Str::startsWith($oldPath, "uploads/")) {
                Storage::delete("public/$oldPath");
            }
            return $urlValue;
        }

        // Return old path if no new image/URL provided during update
        return $oldPath;
    }
}
