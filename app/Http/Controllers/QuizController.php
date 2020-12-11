<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuestionCollection;
use App\Http\Resources\Quiz as ResourcesQuiz;
use App\Http\Resources\QuizCollection;
use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Symfony\Component\HttpFoundation\Response;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $quiz = Quiz::latest();
        if ($request->has('category_id')) {
            $quiz = $quiz->where('category_id', $request->input('category_id'));
        }
        if ($request->has('level')) {
            if ($request->input('level') != 0) {
                $quiz = $quiz->where('question_level', $request->input('level'));
            }
        }
        if ($request->has('search')) {
            if ($request->input('search') != "") {
                $quiz = $quiz->where('name', 'like', '%' . $request->input('search') . '%');
            }
        }

        $quiz = new QuizCollection($quiz->paginate(100));

        return $quiz;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $quiz = new Quiz();
        $quiz->name = $request->name;
        $quiz->question_level = $quiz->question_level_to_id($request->question_level);
        $quiz->category_id = $request->category_id;
        $quiz->status = $request->status == 'Active' ? 1 : 0;
        $quiz->save();
        return response()->json([
            'quiz_id' => $quiz->id,
            'success' => true
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Quiz  $quiz
     * @return \Illuminate\Http\Response
     */
    public function show(Quiz $quiz)
    {
        $quizCollection = new ResourcesQuiz($quiz);
        return $quizCollection;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Quiz  $quiz
     * @return \Illuminate\Http\Response
     */
    public function edit(Quiz $quiz)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Quiz  $quiz
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Quiz $quiz)
    {
        $quiz->name = $request->name;
        $quiz->question_level = $quiz->question_level_to_id($request->question_level);
        $quiz->category_id = $request->category_id;
        $quiz->status = $request->status == 'Active' ? 1 : 0;
        $quiz->save();
        return response("Updated", Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Quiz  $quiz
     * @return \Illuminate\Http\Response
     */
    public function destroy(Quiz $quiz)
    {
        //
    }
    public function getQuizQuestions($id)
    {
        $questions = new QuestionCollection(Question::latest()->with('options')->where('quiz_id', $id)->get());

        return $questions;
    }
}
