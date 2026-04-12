<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ticker_items', function (Blueprint $table) {
            $table->id();
            $table->string('text');
            $table->string('label')->default('En Direct');     // badge label
            $table->string('label_color')->default('#c8102e'); // badge dot colour
            $table->string('url')->nullable();                  // optional link
            $table->boolean('active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ticker_items');
    }
};
