<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionsSubCategory extends Model
{
    use HasFactory;
    protected $table = 'question_sub_categories';
    protected $fillable = ['name'];

    public $timestamps = false;

    public function categories(){
        return $this->belongsTo(QuestionsCategory::class);
    }

    public function questions(){
        return $this->hasMany(Questions::class);
    }
}
