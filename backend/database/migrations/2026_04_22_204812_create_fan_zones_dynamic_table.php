<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fan_zones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('city_id')->constrained('cities')->onDelete('cascade');
            $table->string('stade', 150);
            $table->string('capacite', 20);
            $table->integer('nb_matchs')->default(0);
            $table->text('adresse');
            $table->string('zone_label', 150)->nullable();
            $table->text('description')->nullable();
            $table->text('image_url')->nullable();
            $table->string('groupe', 50)->nullable();
            $table->enum('statut', ['actif', 'inactif', 'centenaire'])->default('actif');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fan_zones');
    }
};
