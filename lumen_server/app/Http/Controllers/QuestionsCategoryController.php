<?php

namespace App\Http\Controllers;
use App\Models\QuestionsCategory;
use Illuminate\Http\Request;

class QuestionsCategoryController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //$categories = QuestionsCategory::with('question_sub_categories')->get();
        $categories = QuestionsCategory::all();
        return response()->json([
            'status'    => 200,
            'success'   => true,
            'categories' => $categories,
            'message' => 'Category successfully inserted'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $category = new QuestionsCategory;
        $category->name = $request->name;
        $category->save();
        return response()->json([
            'status' => 200,
            'category' => $category
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = QuestionsCategory::find($id);
        $category->name = $request->input('name');
        $category->update();
        return response()->json([
            'status' => 200,
            'category' => $category,
            'message' => 'Category successfully updated.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = QuestionsCategory::find($id);
        if ($category->delete()) {
            return response()->json([
                'status' => 200,
                'message' => 'Category successfully deleted.'
            ]);
        }
    }
}