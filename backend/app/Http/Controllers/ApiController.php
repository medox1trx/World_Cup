<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function test()
{
    return response()->json([
        'message' => 'Connexion réussie avec good !',
        'data' => ['nom' => 'Projet CAN', 'status' => 'Actif']
    ]);
}
}
