<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        // 1. Fan Zones: Add country_id
        Schema::table('fan_zones', function (Blueprint $table) {
            if (!Schema::hasColumn('fan_zones', 'country_id')) {
                $table->foreignId('country_id')->nullable()->after('city_id')->constrained('countries')->onDelete('cascade');
            }
        });

        // 2. Hospitalities: Add city_id and country_id
        Schema::table('hospitalities', function (Blueprint $table) {
            if (!Schema::hasColumn('hospitalities', 'city_id')) {
                $table->foreignId('city_id')->nullable()->after('id')->constrained('cities')->onDelete('cascade');
            }
            if (!Schema::hasColumn('hospitalities', 'country_id')) {
                $table->foreignId('country_id')->nullable()->after('city_id')->constrained('countries')->onDelete('cascade');
            }
        });

        // 3. Players (joueurs): Add country_id
        Schema::table('joueurs', function (Blueprint $table) {
            if (!Schema::hasColumn('joueurs', 'country_id')) {
                $table->foreignId('country_id')->nullable()->after('id')->constrained('countries')->onDelete('cascade');
            }
        });

        Schema::enableForeignKeyConstraints();
    }

    public function down(): void
    {
        Schema::table('fan_zones', function (Blueprint $table) {
            $table->dropConstrainedForeignId('country_id');
        });

        Schema::table('hospitalities', function (Blueprint $table) {
            $table->dropConstrainedForeignId('city_id');
            $table->dropConstrainedForeignId('country_id');
        });

        Schema::table('joueurs', function (Blueprint $table) {
            $table->dropConstrainedForeignId('country_id');
        });
    }
};
