<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('matches')) {
            Schema::create('matches', function (Blueprint $table) {
                $table->id();
                $table->string('group_name')->nullable();
                
                $table->foreignId('team1_id')->nullable()->constrained('teams')->onDelete('set null');
                $table->foreignId('team2_id')->nullable()->constrained('teams')->onDelete('set null');
                
                $table->string('venue')->nullable();
                $table->string('city_name')->nullable();
                $table->foreignId('city_id')->nullable();
                $table->foreignId('stadium_id')->nullable();
                
                $table->date('match_date')->nullable();
                $table->time('match_time')->nullable();
                $table->string('stage')->default('group');
                $table->string('status')->default('upcoming');
                
                $table->integer('home_score')->nullable();
                $table->integer('away_score')->nullable();
                
                // Legacy fields for compatibility if needed
                $table->string('home_team')->nullable();
                $table->string('away_team')->nullable();
                $table->string('city')->nullable();
                
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('stats')) {
            Schema::create('stats', function (Blueprint $table) {
                $table->id();
                $table->string('key')->unique();
                $table->string('value');
                $table->string('label');
                $table->integer('sort_order')->default(0);
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('matches');
        Schema::dropIfExists('stats');
    }
};