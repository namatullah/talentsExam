<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('question_sub_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->bigInteger('category_id')->unsigned()->index()->nullable();
            $table->foreign('category_id')
                ->references('id')
                ->on('question_categories')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('question_sub_categories');
    }
};