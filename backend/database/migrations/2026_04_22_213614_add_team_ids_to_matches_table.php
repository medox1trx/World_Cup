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
        Schema::table('matches', function (Blueprint $table) {
            $table->foreignId('home_team_id')->nullable()->after('away_team')->constrained('teams')->onDelete('set null');
            $table->foreignId('away_team_id')->nullable()->after('home_team_id')->constrained('teams')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('matches', function (Blueprint $table) {
            $table->dropConstrainedForeignId('home_team_id');
            $table->dropConstrainedForeignId('away_team_id');
        });
    }
};
