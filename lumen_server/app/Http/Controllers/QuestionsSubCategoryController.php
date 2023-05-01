<?php

namespace App\Http\Controllers;

use App\Models\QuestionsCategory;
use App\Models\QuestionsSubCategory;
use Illuminate\Http\Request;

class QuestionsSubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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

        $category = QuestionsCategory::find($request->id);
        $subCategory = new QuestionsSubCategory();
        $subCategory->name = $request->name;
        $category = $category->subCategories()->save($subCategory);
        return response()->json([
            'status' => 200,
            'message' => 'Sub category successfully inserted.'
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
        $category = QuestionsSubCategory::find($id);
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
        $subCategory = QuestionsSubCategory::find($id);
        if ($subCategory->delete()) {
            return response()->json([
                'status' => 200,
                'message' => 'Sub category successfully deleted.'
            ]);
        }
    }

    public function getSubCategoriesOfCategory(string $categoryId)
    {
        $subCategory = QuestionsSubCategory::where('category_id',$categoryId)->get();
        return response()->json([
            'status'    => 200,
            'success'   => true,
            'subCategory' => $subCategory,
        ]);
    }
}
