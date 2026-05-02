<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('stadiums')) {
            Schema::create('stadiums', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->foreignId('city_id')->nullable();
                $table->integer('capacity')->nullable();
                $table->string('opened_year')->nullable();
                $table->string('surface')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('stadiums');
    }
};
