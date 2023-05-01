<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionsCategory extends Model
{
    use HasFactory;
    protected $table = 'question_categories';
    protected $fillable = ['name'];

    public $timestamps = false;

    public function subCategories(){
        return $this->hasMany(QuestionsSubCategory::class);
    }
}
