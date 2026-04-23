@extends('layouts.admin')

@section('content')
<div class="container mx-auto px-6 py-8">
    <h3 class="text-gray-700 text-3xl font-medium">Modifier le Match</h3>

    <div class="mt-8">
        <form action="{{ route('admin.matches.update', $match->id) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {{-- Home Team Selection --}}
                <div>
                    <label class="text-gray-700" for="home_team_id">Équipe Domicile</label>
                    <select id="home_team_id" name="home_team_id" class="mt-1">
                        <option value="">Sélectionner une équipe</option>
                        @foreach($teams as $team)
                            <option value="{{ $team->id }}" {{ $match->home_team_id == $team->id ? 'selected' : '' }}>
                                {{ $team->name }}
                            </option>
                        @endforeach
                    </select>
                </div>

                {{-- Away Team Selection --}}
                <div>
                    <label class="text-gray-700" for="away_team_id">Équipe Extérieur</label>
                    <select id="away_team_id" name="away_team_id" class="mt-1">
                        <option value="">Sélectionner une équipe</option>
                        @foreach($teams as $team)
                            <option value="{{ $team->id }}" {{ $match->away_team_id == $team->id ? 'selected' : '' }}>
                                {{ $team->name }}
                            </option>
                        @endforeach
                    </select>
                </div>

                {{-- Venue selection (could also be dynamic if there was a stadiums table) --}}
                <div>
                    <label class="text-gray-700" for="venue">Stade</label>
                    <input id="venue" name="venue" type="text" value="{{ $match->venue }}" class="mt-1">
                </div>

                <div>
                    <label class="text-gray-700" for="city">Ville</label>
                    <select id="city" name="city" class="mt-1">
                        <option value="">Sélectionner une ville</option>
                        @foreach($villes as $ville)
                            <option value="{{ $ville->nom }}" {{ $match->city == $ville->nom ? 'selected' : '' }}>
                                {{ $ville->nom }}
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
