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
        Schema::table('ticket_bookings', function (Blueprint $table) {
            $table->foreignId('hospitality_id')->nullable()->constrained('hospitalities')->onDelete('set null')->after('ticket_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ticket_bookings', function (Blueprint $table) {
            $table->dropForeign(['hospitality_id']);
            $table->dropColumn('hospitality_id');
        });
    }
};
