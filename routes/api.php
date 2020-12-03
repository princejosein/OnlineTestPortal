<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::apiResource('category', CategoryController::class);
Route::get('category/list', 'CategoryController@GetCategoryListApi');
Route::apiResource('quiz', QuizController::class);
Route::get('quiz/questions/{id}', 'QuizController@getQuizQuestions');
Route::apiResource('question', QuestionController::class);
Route::apiResource('exam', ExamController::class);
// Route::apiResource('examresult', ExamResultController::class);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
