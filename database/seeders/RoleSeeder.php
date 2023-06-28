<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        \App\Models\Role::create([
            'role'=> 'admin'
        ]);
        \App\Models\Role::create([
            'role'=> 'super_admin'
        ]);
        \App\Models\Role::create([
            'role'=> 'default'
        ]);
        
        $roles = \App\Models\Role::all();
        \App\Models\User::all()->each(function ($user) use ($roles) { 
            $user->roles()->attach(
                $roles->random(rand(1, 3))->pluck('id')->toArray()
            ); 
        });
    }
}
