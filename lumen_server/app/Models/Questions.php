<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{
    use HasFactory;
    protected $table = 'questions';
    protected $fillable = ['question', 'category_id','sub_category_id'];

    public function subCategory()
    {
        return $this->belongsTo(QuestionsSubCategory::class);
    }
    // public function user()
    // {
    //     return $this->belongsTo(User::class);
    // }
    public function answers()
    {
        return $this->hasMany(QuestionsAnswer::class);
    }
}
