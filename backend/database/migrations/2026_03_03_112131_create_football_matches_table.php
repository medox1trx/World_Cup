<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('football_matches', function (Blueprint $table) {
            $table->id();
            $table->string('home_team');
            $table->string('away_team');
            $table->dateTime('match_datetime');
            $table->unsignedBigInteger('phase_id');
            $table->unsignedBigInteger('group_id')->nullable();
            $table->unsignedBigInteger('stadium_id');
            $table->timestamps();

            $table->foreign('phase_id')->references('id')->on('phases')->onDelete('cascade');
            $table->foreign('group_id')->references('id')->on('groups')->onDelete('cascade');
            $table->foreign('stadium_id')->references('id')->on('stadiums')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('football_matches');
    }
};
