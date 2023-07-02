<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KepengurusanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        \App\Models\Kepengurusan::create([
            'name'=>"2018-1",
            "kepengurusan"=>""
        ]);
        \App\Models\Kepengurusan::create([
            'name'=>"2018-2",
            "kepengurusan"=>""
        ]);
        \App\Models\Kepengurusan::create([
            'name'=>"2018-3",
            "kepengurusan"=>""
        ]);
        \App\Models\Kepengurusan::create([
            'name'=>"2019",
            "kepengurusan"=>""
        ]);
        \App\Models\Kepengurusan::create([
            'name'=>"2020",
            "kepengurusan"=>""
        ]);
    }
}
