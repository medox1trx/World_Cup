<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\City;
use Illuminate\Http\Request;

class HostCityController extends Controller
{
    public function index()
    {
        return response()->json(Country::all());
    }

    public function getCitiesByCountry($id)
    {
        $country = Country::findOrFail($id);
        return response()->json($country->cities);
    }

    public function show($id)
    {
        return response()->json(City::with(['country', 'accommodations'])->findOrFail($id));
    }
}
