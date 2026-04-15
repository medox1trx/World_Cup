<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code'); // 3 letters FIFA code
            $table->string('flag'); // ISO code for flagcdn or URL
            $table->string('group_name');
            $table->string('coach')->nullable();
            $table->string('captain')->nullable();
            $table->integer('world_ranking')->default(0);
            $table->integer('world_cup_titles')->default(0);
            $table->text('description')->nullable();
            $table->string('key_player')->nullable();
            $table->string('image_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};
