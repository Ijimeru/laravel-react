<?php

namespace Database\Seeders;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

//         \App\Models\Post::factory(30)->create();
//         $categories = \App\Models\Category::whereHas('meta_category', function (Builder $query) {
//             $query->where('name','Post');
//         })->get();

// // Populate the pivot table
//         \App\Models\Post::all()->each(function ($post) use ($categories) { 
//             $post->categories()->attach(
//                 $categories->random(rand(1, 3))->pluck('id')->toArray()
//             ); 
//         });
    }
}
