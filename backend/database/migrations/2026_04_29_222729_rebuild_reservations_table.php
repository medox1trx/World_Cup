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
        Schema::dropIfExists('reservations');

        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->enum('type', ['fan_zone', 'hospitality']);
            $table->unsignedBigInteger('fan_zone_id')->nullable();
            $table->unsignedBigInteger('hospitality_id')->nullable();
            $table->integer('quantity');
            $table->decimal('total_price', 10, 2)->default(0);
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');
            $table->text('special_request')->nullable();
            $table->timestamps();

            // Foreign keys
            $table->foreign('fan_zone_id')->references('id')->on('fan_zones')->nullOnDelete();
            $table->foreign('hospitality_id')->references('id')->on('hospitalities')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
