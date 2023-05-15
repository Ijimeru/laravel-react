<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        \App\Models\User::factory(3)->create();
        \App\Models\User::create([
            'name' => 'Muhammad Habibi Wasi Narendra',
            'email' => 'muhammad.120280027@student.itera.ac.id',
            'password' => bcrypt('1234567er')
        ]);
    }
}
