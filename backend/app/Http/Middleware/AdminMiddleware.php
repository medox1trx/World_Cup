<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user()) {
            \Log::warning('AdminMiddleware: User not authenticated');
            return response()->json(['message' => 'Accès refusé. Non connecté.'], 401);
        }

        if (!$request->user()->isAdmin()) {
            \Log::warning('AdminMiddleware: User ' . $request->user()->email . ' is not an admin');
            return response()->json(['message' => 'Accès refusé. Droits administrateur requis.'], 403);
        }

        return $next($request);
    }
}
