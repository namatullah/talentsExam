<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/


$router->get('/category','QuestionsCategoryController@index');
$router->put('/category/update/{id}','QuestionsCategoryController@update');
$router->post('/category/add','QuestionsCategoryController@store');
$router->delete('/category/delete/{id}','QuestionsCategoryController@destroy');

$router->post('/subCategory/add','QuestionsSubCategoryController@store');
$router->delete('/subCategory/delete/{id}','QuestionsSubCategoryController@destroy');
$router->get('/subCategoryOfCategory/{categoryId}','QuestionsSubCategoryController@getSubCategoriesOfCategory');

$router->get('/question','QuestionsController@index');
$router->post('/question/add','QuestionsController@store');
$router->put('/question/update','QuestionsController@update');
$router->delete('/question/delete/{questionId}','QuestionsController@delete');

$router->get('/', function () use ($router) {
    return $router->app->version();
});
