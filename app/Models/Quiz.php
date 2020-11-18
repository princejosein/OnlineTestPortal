<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function question_level_to_id($question_level_name)
    {
        if ($question_level_name == 'Beginner') {
            $question_level = 1;
        } elseif ($question_level_name == 'Intermediate') {
            $question_level = 2;
        } else {
            $question_level = 3;
        }
        return $question_level;
    }
    public function question_level_id_to_name($question_level_id)
    {
        if ($this->question_level === 1) {
            $question_level = 'Beginner';
        } elseif ($this->question_level === 2) {
            $question_level = 'Intermediate';
        } else {
            $question_level = 'Expert';
        }
        return $question_level;
    }
}
