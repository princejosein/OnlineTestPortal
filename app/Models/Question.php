<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    /**
     * Get the quiz that owns the question.
     */
    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    /**
     * Get the options belongs to the question.
     */
    public function options()
    {
        return $this->hasMany(Options::class);
    }

    public function getSelectedOption($options)
    {
        $counter = 0;
        foreach ($options as $option) {
            if ($option['is_correct'] === 1) {
                return $counter;
            }
            $counter++;
        }
        return $counter;
    }
}
