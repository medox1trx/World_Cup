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
        Schema::table('stadiums', function (Blueprint $table) {
            $table->string('location_url')->nullable()->after('surface');
        });
    }

    public function down(): void
    {
        Schema::table('stadiums', function (Blueprint $table) {
            $table->dropColumn('location_url');
        });
    }
};
