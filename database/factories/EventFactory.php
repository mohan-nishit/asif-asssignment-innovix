<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $startDate = now()->format('Y-m-d H:i:s');

    
        $endDate = now()->addDays(30)->format('Y-m-d H:i:s'); 

    
       
        return [
            'name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'date'=> $this->faker->dateTimeBetween($startDate, $endDate),
            'location'=> $this->faker->address,
            'ticket_price'=>$this->faker->randomFloat(2, 10, 1000),
            'tickets_count'=>200
        ];
    }
}
