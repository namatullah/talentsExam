<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionAnswer extends Model
{
    use HasFactory;
    protected $table = 'question_answers';
    protected $fillable = ['answer'];
    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
