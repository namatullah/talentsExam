<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubCategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/student/add', [StudentController::class, 'store']);
Route::get('/student', [StudentController::class, 'index']);
Route::get('/question', [QuestionController::class, 'index']);
Route::post('/question/add', [QuestionController::class, 'store']);

Route::get('/category', [CategoryController::class, 'index']);
Route::put('/category/update/{id}', [CategoryController::class, 'update']);
Route::post('/category/add', [CategoryController::class, 'store']);
Route::post('/category/delete/{id}', [CategoryController::class, 'destroy']);

Route::post('/subCategory/add', [SubCategoryController::class, 'store']);
Route::delete('/subCategory/delete/{id}', [SubCategoryController::class, 'destroy']);
// Route::get('/user', [AuthController::class, 'me']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json([
        'data' => $request->user(),
    ]);
    // return $request->user();
});
