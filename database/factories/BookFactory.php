<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'title'=>fake()->sentence(2),
            'file'=> '\file\daftarpembimbing.pdf',
            'cover'=>'\img\cover.webp',
            'author'=>fake()->name(),
            'tahun'=>fake()->year()
        ];
    }
}
