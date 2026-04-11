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
            $table->string('city_name');
            $table->string('country');
            $table->string('country_code', 10);
            $table->string('stadium_name');
            $table->string('capacity');
            $table->integer('matches_count')->default(0);
            $table->string('zone_name');
            $table->text('description');
            $table->string('image_url')->nullable();
            $table->string('opening_hours')->default('10h – 00h');
            $table->boolean('is_centenary')->default(false);
            $table->string('group_label')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fan_zones');
    }
};