<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MetaCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        \App\Models\MetaCategory::create([
            'name' => "Post",
        ]);
        \App\Models\MetaCategory::create([
            'name' => "Book",
        ]);
    }
}
