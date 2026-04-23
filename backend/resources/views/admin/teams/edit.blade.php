@extends('layouts.admin')

@section('content')
<div class="container mx-auto px-6 py-8">
    <h3 class="text-gray-700 text-3xl font-medium">Modifier l'Équipe</h3>

    <div class="mt-8">
        <form action="{{ route('admin.teams.update', $team->id) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                    <label class="text-gray-700" for="name">Nom de la Nation</label>
                    <input id="name" name="name" type="text" value="{{ $team->name }}" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-200 focus:ring-opacity-50">
                </div>

                <div>
                    <label class="text-gray-700" for="group_name">Groupe</label>
                    <select id="group_name" name="group_name" class="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-200 focus:ring-opacity-50">
                        @foreach(['A','B','C','D','E','F','G','H','I','J','K','L'] as $group)
                            <option value="Groupe {{ $group }}" {{ $team->group_name == "Groupe $group" ? 'selected' : '' }}>
                                Groupe {{ $group }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div class="flex justify-end mt-4">
                <button type="submit" class="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">Enregistrer</button>
            </div>
        </form>
    </div>
</div>
@endsection
