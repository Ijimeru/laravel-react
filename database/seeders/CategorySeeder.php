<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        \App\Models\Category::factory(10)->create();
        \App\Models\Category::create([
            'name'=>'Pengumuman',
            'meta_category_id'=>'1'
        ]);
        \App\Models\Category::create([
            'name'=>'Akademik',
            'meta_category_id'=>'1'
        ]);
    }
}
