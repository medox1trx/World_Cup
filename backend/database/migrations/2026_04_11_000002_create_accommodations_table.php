<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('accommodations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('city_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->enum('type', ['hotel', 'apartment', 'house']);
            $table->decimal('price_per_night', 8, 2);
            $table->string('location');
            $table->unsignedSmallInteger('rooms')->default(1);
            $table->unsignedSmallInteger('beds')->default(1);
            $table->unsignedSmallInteger('baths')->default(1);
            $table->unsignedSmallInteger('capacity')->default(2);
            $table->text('description')->nullable();
            $table->json('amenities')->nullable();
            $table->decimal('rating', 3, 2)->default(5.00);
            $table->decimal('lat', 10, 7)->nullable();
            $table->decimal('lng', 10, 7)->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            $table->string('image_url');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('accommodations');
    }
};
