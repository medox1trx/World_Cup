@extends('layouts.admin')

@section('content')
<div class="container mx-auto px-6 py-8">
    <h3 class="text-gray-700 text-3xl font-medium">Modifier Fan Zone</h3>

    <div class="mt-8">
        <form action="{{ route('admin.fan_zones.update', $fanZone->id) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                    <label class="text-gray-700" for="ville_id">Ville</label>
                    <select id="ville_id" name="ville_id" class="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <option value="">Sélectionner une ville</option>
                        @foreach($villes as $ville)
                            <option value="{{ $ville->id }}" {{ $fanZone->ville_id == $ville->id ? 'selected' : '' }}>
                                {{ $ville->nom }} ({{ $ville->pays->nom }})
                            </option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="text-gray-700" for="stade">Stade / Lieu</label>
                    <input id="stade" name="stade" type="text" value="{{ $fanZone->stade }}" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                </div>
            </div>

            <div class="flex justify-end mt-4">
                <button type="submit" class="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">Enregistrer</button>
            </div>
        </form>
    </div>
</div>
@endsection
