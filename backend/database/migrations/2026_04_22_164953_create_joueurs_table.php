<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('joueurs')) {
            Schema::create('joueurs', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->integer('number')->nullable();
                $table->string('position')->nullable();
                $table->string('photo_url')->nullable();
                $table->foreignId('team_id')->constrained('teams')->onDelete('cascade');
                $table->foreignId('country_id')->nullable();
                $table->integer('goals')->default(0);
                $table->integer('assists')->default(0);
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('joueurs');
    }
};
