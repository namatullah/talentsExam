<?php

namespace App\Http\Controllers;
use App\Models\Questions;
use Illuminate\Http\Request;

class QuestionsController extends Controller
{
    public function index(Request $request)
    {
        $limit =$request->input('limit');
        $questions  = Questions::join('question_categories','questions.category_id','=','question_categories.id')
                ->join('question_sub_categories','questions.sub_category_id','=','question_sub_categories.id')->orderBy('created_at', 'desc')
                ->select('questions.*','question_categories.name as category','question_sub_categories.name as subCategory')->paginate($limit);
        if($questions)
        {
            return response()->json([
                'success'       =>true,
                'questions'     =>$questions
            ]);
        }
        else
        {
            return response()->json([
                'success'       =>false,
                'message'       =>'Records not available.'
            ]);
        }
    }

    public function store(Request $request)
    {
        $question = Questions::create([
            'category_id'       =>$request->category,
            'sub_category_id'   =>$request->subCategory,
            'question'          =>$request->question]);
        return response()->json([
            'success'   =>true,
            'message'   =>'Question has been inserted successfully.',
            'question'  =>$question
        ]);
    }

    public function update(Request $request){
        
        $questionId=$request->input('questionId');
        $question = Questions::find($questionId);

        if(!$question)
        {
            return response()->json([
                'success'   => false,
                'message'   => 'Record not found.'
            ]);
        }
        $question->category_id      = $request->input('category');
        $question->sub_category_id  = $request->input('subCategory');
        $question->question         = $request->input('question');
        if($question->save())
        {
            return response()->json([
                'success'   => true,
                'message'   => 'Record has been updated successfully.'
            ]);
        }   
        else
        {
            return response()->json([
                'success'   => false,
                'message'   => 'Update failed.'
            ]);
        }
    }

    public function delete(string $questionId)
    {
        $question = Questions::find($questionId);
        if(!$question)
        {
            return response()->json([
                'success'   => false,
                'message'   => 'Record not found.'
            ]);
        }        
        if($question->delete()) 
        {
            return response()->json([
                'success'   => true,
                'message'   => 'Record has been deleted successfully.'
            ]);
        }   
        else
        {
            return response()->json([
                'success'   => false,
                'message'   => 'Delete failed.'
            ]);
        }
    }
}
