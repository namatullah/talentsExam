<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category'=>$this->faker->numberBetween(1,100),
            'subCategory'=>$this->faker->numberBetween(1,100),
            'question'=>$this->faker->text(),
        ];
    }
}
