<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('teams')) {
            Schema::create('teams', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('code', 10)->nullable();
                $table->string('flag')->nullable();
                $table->foreignId('country_id')->nullable();
                $table->foreignId('group_id')->nullable();
                $table->foreignId('confederation_id')->nullable();
                $table->string('coach')->nullable();
                $table->string('captain')->nullable();
                $table->integer('world_ranking')->default(0);
                $table->integer('world_cup_titles')->default(0);
                $table->integer('points')->default(0);
                $table->integer('goals_for')->default(0);
                $table->integer('goals_against')->default(0);
                $table->integer('matches_played')->default(0);
                $table->text('description')->nullable();
                $table->string('key_player')->nullable();
                $table->string('image_url')->nullable();
                $table->string('hero_image')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};
