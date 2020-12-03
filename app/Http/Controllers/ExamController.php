<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\ExamResult;
use App\Models\Options;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use PhpOption\Option;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $exam = new Exam();
        $exam->user_id = 0;
        $exam->quiz_id = $request->quiz_id;
        $exam->question_count = count($request->exam);
        $exam->right_answer_count = 0;
        $exam->is_completed = 1;
        $exam->save();

        $exam_id = $exam->id;
        $count = 0;
        foreach ($request->exam as $ex) {
            $question_id = $ex['qid'];
            $option_id = $ex['optionGroup'];
            $correctOption = Options::where('question_id', $question_id)->where('is_correct', 1)->select('id')->first();
            $is_correct = $option_id === $correctOption->id ? 1 : 0;
            $exam_result = new ExamResult();
            $exam_result->exam_id = $exam_id;
            $exam_result->question_id = $question_id;
            $exam_result->option_id = $option_id;
            $exam_result->is_correct = $is_correct;
            $is_correct == 1 ? $count++ : '';
            $exam_result->save();
        }
        $exam->right_answer_count = $count;
        $exam->save();
        return response()->json([
            'right_count' => $count,
            'success' => true
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
