<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    protected $table = 'questions';
    protected $fillable = ['question', 'category', 'subCategory'];

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }
    // public function user()
    // {
    //     return $this->belongsTo(User::class);
    // }
    public function answers()
    {
        return $this->hasMany(QuestionAnswer::class);
    }
}
