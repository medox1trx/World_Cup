<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hospitalities', function (Blueprint $table) {
            $table->id();
            $table->string('tier'); // Premium, Business, Prestige
            $table->string('price');
            $table->string('badge')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->text('description')->nullable();
            $table->json('perks')->nullable(); // Array of perks
            $table->string('cta_text');
            $table->string('image_url')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hospitalities');
    }
};