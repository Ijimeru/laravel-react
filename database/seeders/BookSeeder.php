<?php

namespace Database\Seeders;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        \App\Models\Book::factory(30)->create();
        $categories = \App\Models\Category::whereHas('meta_category', function (Builder $query) {
            $query->where('name','Book');
        })->get();

// Populate the pivot table
        \App\Models\Book::all()->each(function ($book) use ($categories) { 
            $book->categories()->attach(
                $categories->random(rand(1, 3))->pluck('id')->toArray()
            ); 
        });
    }
}
