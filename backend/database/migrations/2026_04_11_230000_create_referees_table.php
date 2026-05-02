<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('referees')) {
            Schema::create('referees', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('first_name')->nullable();
                $table->string('last_name')->nullable();
                $table->string('nationality')->nullable();
                $table->string('country')->nullable(); // For seeder compatibility
                $table->string('nationality_code', 5)->nullable();
                $table->string('role')->default('main');       // main, assistant, var
                $table->integer('age')->nullable();
                $table->integer('experience_years')->nullable();
                $table->integer('matches_officiated')->default(0);
                $table->string('photo_url')->nullable();
                $table->string('fifa_badge')->default('international'); // international, elite
                $table->text('notes')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('referees');
    }
};
