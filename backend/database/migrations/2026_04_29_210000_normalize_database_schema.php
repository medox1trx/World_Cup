<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

/**
 * Database Normalization & Standardization Migration - Robust Version
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        // ── 1. FAN_ZONES ──
        // Using raw SQL to avoid Laravel's introspection bugs
        if (Schema::hasColumn('fan_zones', 'ville_id')) {
            DB::statement("ALTER TABLE `fan_zones` CHANGE `ville_id` `city_id` BIGINT UNSIGNED NOT NULL");
        }
        if (Schema::hasColumn('fan_zones', 'stade')) {
            DB::statement("ALTER TABLE `fan_zones` CHANGE `stade` `stadium_name` VARCHAR(150) NOT NULL");
        }
        if (Schema::hasColumn('fan_zones', 'capacite')) {
            DB::statement("ALTER TABLE `fan_zones` CHANGE `capacite` `capacity` VARCHAR(20) NOT NULL");
        }
        if (Schema::hasColumn('fan_zones', 'nb_matchs')) {
            DB::statement("ALTER TABLE `fan_zones` CHANGE `nb_matchs` `matches_count` INT NOT NULL");
        }
        if (Schema::hasColumn('fan_zones', 'adresse')) {
            DB::statement("ALTER TABLE `fan_zones` CHANGE `adresse` `address` TEXT NOT NULL");
        }
        if (Schema::hasColumn('fan_zones', 'groupe')) {
            DB::statement("ALTER TABLE `fan_zones` CHANGE `groupe` `group_label` VARCHAR(50) NULL");
        }
        if (Schema::hasColumn('fan_zones', 'statut')) {
            DB::statement("ALTER TABLE `fan_zones` CHANGE `statut` `status` VARCHAR(20) NOT NULL DEFAULT 'active'");
            DB::table('fan_zones')->where('status', 'actif')->update(['status' => 'active']);
            DB::table('fan_zones')->where('status', 'inactif')->update(['status' => 'inactive']);
            DB::table('fan_zones')->where('status', 'centenaire')->update(['status' => 'centenary']);
        }

        // ── 2. JOUEURS (PLAYERS) ──
        if (Schema::hasColumn('joueurs', 'buts')) {
            DB::statement("ALTER TABLE `joueurs` CHANGE `buts` `goals` INT NOT NULL DEFAULT 0");
        }

        // ── 3. MATCHES ──
        Schema::table('matches', function (Blueprint $table) {
            $cols = ['referee', 'assistant_referees', 'weather_condition', 'weather_temp', 'stadium_image'];
            foreach ($cols as $col) {
                if (Schema::hasColumn('matches', $col)) {
                    $table->dropColumn($col);
                }
            }
        });

        // ── 4. STADIUMS ──
        Schema::table('stadiums', function (Blueprint $table) {
            if (!Schema::hasColumn('stadiums', 'city_id')) {
                 // The audit showed stadium has city_id already, but let's be sure.
                 // If it doesn't have it, we might need to handle it.
            }
            if (!Schema::hasColumn('stadiums', 'image_url')) {
                $table->string('image_url')->nullable()->after('capacity');
            }
            if (!Schema::hasColumn('stadiums', 'description')) {
                $table->text('description')->nullable()->after('image_url');
            }
        });

        // ── 5. TEAM_STANDINGS ──
        Schema::table('team_standings', function (Blueprint $table) {
            if (!Schema::hasColumn('team_standings', 'team_id')) {
                $table->foreignId('team_id')->nullable()->after('id')
                      ->constrained('teams')->onDelete('cascade');
            }
            if (!Schema::hasColumn('team_standings', 'group_id')) {
                $table->foreignId('group_id')->nullable()->after('team_id')
                      ->constrained('groups')->onDelete('cascade');
            }
        });

        Schema::enableForeignKeyConstraints();
    }

    public function down(): void
    {
        Schema::disableForeignKeyConstraints();

        // Reverse fan_zones
        if (Schema::hasColumn('fan_zones', 'status')) {
            DB::table('fan_zones')->where('status', 'active')->update(['status' => 'actif']);
            DB::table('fan_zones')->where('status', 'inactive')->update(['status' => 'inactif']);
            DB::table('fan_zones')->where('status', 'centenary')->update(['status' => 'centenaire']);
            DB::statement("ALTER TABLE `fan_zones` CHANGE `status` `statut` ENUM('actif','inactif','centenaire') NOT NULL DEFAULT 'actif'");
        }

        if (Schema::hasColumn('fan_zones', 'city_id')) {
            DB::statement("ALTER TABLE `fan_zones` CHANGE `city_id` `ville_id` BIGINT UNSIGNED NOT NULL");
        }
        if (Schema::hasColumn('fan_zones', 'stadium_name')) {
            DB::statement("ALTER TABLE `fan_zones` CHANGE `stadium_name` `stade` VARCHAR(150) NOT NULL");
        }
        if (Schema::hasColumn('fan_zones', 'capacity')) {
            DB::statement("ALTER TABLE `fan_zones` CHANGE `capacity` `capacite` VARCHAR(20) NOT NULL");
        }
        if (Schema::hasColumn('fan_zones', 'matches_count')) {
            DB::statement("ALTER TABLE `fan_zones` CHANGE `matches_count` `nb_matchs` INT NOT NULL");
        }
        if (Schema::hasColumn('fan_zones', 'address')) {
            DB::statement("ALTER TABLE `fan_zones` CHANGE `address` `adresse` TEXT NOT NULL");
        }
        if (Schema::hasColumn('fan_zones', 'group_label')) {
            DB::statement("ALTER TABLE `fan_zones` CHANGE `group_label` `groupe` VARCHAR(50) NULL");
        }

        if (Schema::hasColumn('joueurs', 'goals')) {
            DB::statement("ALTER TABLE `joueurs` CHANGE `goals` `buts` INT NOT NULL DEFAULT 0");
        }

        Schema::table('team_standings', function (Blueprint $table) {
            if (Schema::hasColumn('team_standings', 'team_id')) {
                $table->dropConstrainedForeignId('team_id');
            }
            if (Schema::hasColumn('team_standings', 'group_id')) {
                $table->dropConstrainedForeignId('group_id');
            }
        });

        Schema::enableForeignKeyConstraints();
    }
};
