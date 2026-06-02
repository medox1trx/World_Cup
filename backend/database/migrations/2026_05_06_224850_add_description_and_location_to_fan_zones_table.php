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
        Schema::table('fan_zones', function (Blueprint $table) {
            if (!Schema::hasColumn('fan_zones', 'location_url')) {
                $table->text('location_url')->nullable()->after('image_url');
            }
        });
    }

    public function down(): void
    {
        Schema::table('fan_zones', function (Blueprint $table) {
            $table->dropColumn('location_url');
        });
    }
};
