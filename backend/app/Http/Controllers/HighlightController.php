<?php

namespace App\Http\Controllers;

use App\Models\Highlight;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class HighlightController extends Controller
{
    /**
     * List all highlights (Public).
     */
    public function index(Request $request): JsonResponse
    {
        $highlights = Highlight::latest()
            ->withCount('comments')
            ->get();

        $userLikes = [];
        if ($user = $request->user()) {
            $userLikes = DB::table('highlight_likes')
                ->where('user_id', $user->id)
                ->pluck('highlight_id')
                ->toArray();
        }

        $highlights->each(function ($h) use ($userLikes) {
            $h->liked_by_user = in_array($h->id, $userLikes);
        });

        return response()->json($highlights);
    }

    /**
     * Store a new highlight (Admin).
     */
    public function store(Request $request): JsonResponse
    {
        Log::info('Store Highlight Request:', $request->all());

        try {
            $validated = $request->validate([
                'title'     => 'required|string',
                'image_url' => 'required',
                'duration'  => 'required',
                'category'  => 'required',
                'status'    => 'in:published,draft',
                'video_url' => 'nullable|string'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation Errors:', $e->errors());
            return response()->json(['errors' => $e->errors()], 422);
        }

        $highlight = Highlight::create($validated);
        return response()->json($highlight, 201);
    }

    /**
     * Update a highlight (Admin).
     */
    public function update(Request $request, Highlight $highlight): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title'     => 'sometimes|string',
                'image_url' => 'sometimes',
                'duration'  => 'sometimes',
                'category'  => 'sometimes',
                'status'    => 'sometimes|in:published,draft',
                'video_url' => 'nullable|string'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        $highlight->update($validated);
        return response()->json($highlight);
    }

    /**
     * Delete a highlight (Admin).
     */
    public function destroy(Highlight $highlight): JsonResponse
    {
        $highlight->delete();
        return response()->json(['message' => 'Highlight deleted']);
    }

    /**
     * Increment view count (Public).
     */
    public function incrementView(Highlight $highlight): JsonResponse
    {
        $highlight->increment('views');
        return response()->json(['views' => $highlight->views]);
    }

    /**
     * Toggle like on a highlight (Authenticated).
     */
    public function toggleLike(Request $request, Highlight $highlight): JsonResponse
    {
        if (!$request->user()) {
            return response()->json(['message' => 'Please login to like.'], 401);
        }

        $userId = $request->user()->id;
        $exists = DB::table('highlight_likes')
            ->where('user_id', $userId)
            ->where('highlight_id', $highlight->id)
            ->first();

        if ($exists) {
            DB::table('highlight_likes')
                ->where('user_id', $userId)
                ->where('highlight_id', $highlight->id)
                ->delete();
            $highlight->decrement('likes');
            return response()->json(['likes' => $highlight->likes, 'liked' => false]);
        }

        DB::table('highlight_likes')->insert([
            'user_id' => $userId,
            'highlight_id' => $highlight->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $highlight->increment('likes');
        return response()->json(['likes' => $highlight->likes, 'liked' => true]);
    }

    /**
     * List comments for a highlight (Public).
     */
    public function indexComments(Highlight $highlight): JsonResponse
    {
        $comments = $highlight->comments()->with('user')->latest()->get();
        return response()->json($comments);
    }

    /**
     * Store a comment on a highlight (Authenticated).
     */
    public function storeComment(Request $request, Highlight $highlight): JsonResponse
    {
        if (!$request->user()) {
            return response()->json(['message' => 'Please login to comment.'], 401);
        }

        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $comment = $highlight->comments()->create([
            'content'   => $validated['content'],
            'user_id'   => $request->user()->id,
            'user_name' => $request->user()->name
        ]);

        return response()->json($comment->load('user'), 201);
    }
}
