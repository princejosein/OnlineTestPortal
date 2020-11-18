<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuestionCollection;
use App\Models\Options;
use App\Models\Question;
use Illuminate\Http\Request;
use PhpOption\Option;
use Symfony\Component\HttpFoundation\Response;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $questions = new QuestionCollection(Question::latest()->get());
        return $questions;
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
        $question = new Question();
        $question->question = $request->question;
        $question->quiz_id = $request->quiz_id;
        $question->status = $request->status == 'Active' ? 1 : 0;
        $question->save();
        $option_counter = 0;
        if ($request->radioGroup === 1) {
            $option_counter = 1;
        } elseif ($request->radioGroup === 2) {
            $option_counter = 2;
        }
        $n = 0;
        foreach ($request->options as $a_option) {
            $option = new Options();
            $option->question_id = $question->id;
            $option->option = $a_option['option'];
            if ($n === $option_counter) {
                $option->is_correct = 1;
            } else {
                $option->is_correct = 0;
            }
            $option->save();
            $n++;
        }
        return response("Created", Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function show(Question $question)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function edit(Question $question)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Question $question)
    {
        $question->question = $request->question;
        $question->quiz_id = $request->quiz_id;
        $question->status = $request->status == 'Active' ? 1 : 0;
        $question->save();
        $option_counter = 0;
        if ($request->radioGroup === 1) {
            $option_counter = 1;
        } elseif ($request->radioGroup === 2) {
            $option_counter = 2;
        }
        $n = 0;
        foreach ($request->options as $a_option) {
            if ($n === $option_counter) {
                $is_correct = 1;
            } else {
                $is_correct = 0;
            }
            $option = Options::find($a_option['id']);
            $option->option = $a_option['option'];
            $option->is_correct = $is_correct;
            $option->save();
            $n++;
        }
        return response("Created", Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function destroy(Question $question)
    {
        //
    }
}
