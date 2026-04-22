<?php
 
namespace Database\Seeders;
 
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
 
class WorldCupSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        // ── GROUPS (A - L) ────────────────────────────────────
        DB::table('groups')->truncate();
        $groupLetters = range('A', 'L');
        foreach ($groupLetters as $letter) {
            DB::table('groups')->insert([
                'name' => "Group $letter",
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
 
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}