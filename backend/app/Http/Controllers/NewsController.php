<?php

namespace App\Http\Controllers;

use App\Models\NewsArticle;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NewsController extends Controller
{
    /**
     * List news articles with optional search.
     */
    public function index(Request $request): JsonResponse
    {
        $limit = $request->get('pageSize', 12);
        $q     = $request->get('q', '');

        $query = NewsArticle::query();

        if ($q && $q !== 'FIFA World Cup') {
            $query->where('tag', 'like', "%{$q}%")
                  ->orWhere('title', 'like', "%{$q}%");
        }

        $articles = $query->orderBy('published_at', 'desc')
                          ->limit($limit)
                          ->get()
                          ->map(function ($article) {
                              return [
                                  'id'          => $article->id,
                                  'tag'         => $article->tag,
                                  'title'       => $article->title,
                                  'description' => $article->description,
                                  'urlToImage'  => $article->image_url,
                                  'url'         => $article->url,
                                  'source'      => ['name' => $article->source_name],
                                  'publishedAt' => $article->published_at,
                              ];
                          });

        return response()->json([
            'status'       => 'ok',
            'totalResults' => $articles->count(),
            'articles'     => $articles
        ]);
    }

    /**
     * Store a new news article (Admin).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'tag'         => 'nullable|string',
            'title'       => 'required|string',
            'description' => 'required|string',
            'image_url'   => 'nullable|string',
            'url'         => 'nullable|string',
            'source_name' => 'nullable|string',
            'published_at'=> 'nullable|date',
        ]);

        $article = NewsArticle::create([
            'tag'         => $validated['tag'] ?? 'News',
            'title'       => $validated['title'],
            'description' => $validated['description'],
            'image_url'   => $validated['image_url'] ?? null,
            'url'         => $validated['url'] ?? '#',
            'source_name' => $validated['source_name'] ?? 'FIFA Official',
            'published_at'=> $validated['published_at'] ?? now(),
        ]);

        return response()->json($article, 201);
    }

    /**
     * Update a news article (Admin).
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $article = NewsArticle::findOrFail($id);

        $validated = $request->validate([
            'tag'         => 'nullable|string',
            'title'       => 'sometimes|string',
            'description' => 'sometimes|string',
            'image_url'   => 'nullable|string',
            'url'         => 'nullable|string',
            'source_name' => 'nullable|string',
            'published_at'=> 'nullable|date',
        ]);

        $article->update($validated);
        return response()->json($article);
    }

    /**
     * Delete a news article (Admin).
     */
    public function destroy(int $id): JsonResponse
    {
        NewsArticle::findOrFail($id)->delete();
        return response()->json(['message' => 'Article deleted']);
    }
}
