<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Illuminate\Support\Str;
class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('Posts/Index',[
            'posts'=>\App\Models\Post::with('author:id,name')->latest()->get(),
            'logo'=> \App\Models\Setting::find(4)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $categories = \App\Models\Category::whereHas('meta_category',function(Builder $query){
            $query->where('name','Post');
        })->get();
        return Inertia::render('Posts/Partials/Create',[
            'logo'=>\App\Models\Setting::find(4),
            'categories'=>$categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request):RedirectResponse
    {
        //
        $validated = $request->validated();

        $validated["image"]=$request->file('image')->store('post-image');
        $categories = \App\Models\Category::whereIn('name',$request->categories)->get();
        $validated["excerpt"] = Str::limit(strip_tags($request->body), 200);
        $validated["user_id"] = $request->user()->id;
        // dd($validated);
        Post::create($validated)->categories()->attach($categories);
        return redirect(route('posts.index'))->with([
            'msg'=>'Post berhasil ditambahkan',
            'type' =>'success'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
