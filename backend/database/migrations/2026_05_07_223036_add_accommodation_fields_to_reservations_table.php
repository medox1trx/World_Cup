<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("ALTER TABLE reservations MODIFY type ENUM('fan_zone', 'hospitality', 'accommodation') NULL");
        
        Schema::table('reservations', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('accommodation_id')->nullable();
            $table->date('check_in')->nullable();
            $table->date('check_out')->nullable();
            $table->unsignedSmallInteger('guests')->nullable()->default(1);
            $table->text('notes')->nullable();

            $table->foreign('user_id')->references('id')->on('users')->nullOnDelete();
            $table->foreign('accommodation_id')->references('id')->on('accommodations')->nullOnDelete();
        });

        // Make previous required fields nullable for accommodation bookings
        DB::statement("ALTER TABLE reservations MODIFY full_name VARCHAR(255) NULL");
        DB::statement("ALTER TABLE reservations MODIFY email VARCHAR(255) NULL");
        DB::statement("ALTER TABLE reservations MODIFY phone VARCHAR(255) NULL");
        DB::statement("ALTER TABLE reservations MODIFY quantity INT NULL");
    }

    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['accommodation_id']);
            $table->dropColumn(['user_id', 'accommodation_id', 'check_in', 'check_out', 'guests', 'notes']);
        });
    }
};
