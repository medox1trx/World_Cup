<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->string('home_team');
            $table->string('away_team');
            $table->string('home_flag')->nullable();   // e.g. "🇧🇷"
            $table->string('away_flag')->nullable();
            $table->string('venue');
            $table->string('city');
            $table->date('match_date');
            $table->time('match_time');
            $table->enum('stage', ['group', 'round_of_16', 'quarter', 'semi', 'final'])->default('group');
            $table->string('group_name')->nullable();  // e.g. "Group A"
            $table->integer('home_score')->nullable();
            $table->integer('away_score')->nullable();
            $table->enum('status', ['upcoming', 'live', 'finished'])->default('upcoming');
            $table->timestamps();
        });

        Schema::create('stats', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();           // e.g. "total_teams"
            $table->string('value');
            $table->string('label');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('matches');
        Schema::dropIfExists('stats');
    }
};