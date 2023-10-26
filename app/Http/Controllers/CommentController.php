<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;

class CommentController extends Controller
{
    public function __construct(){
        $this->middleware(['verified','auth','role:default']);
    }
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
    public function store(StoreCommentRequest $request):RedirectResponse
    {
        //
        $validated = $request->validated();
        $post = Post::where('id',$validated['post_id'])->firstOrFail();
        $request->user()->comments()->create($validated);
        return redirect('berita/'.$post->slug);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, Comment $comment)
    {
        //
        $this->authorize('update',$comment);
        $post = $comment->post()->firstOrFail();
        $validated = $request->validated();
        $comment->update($validated);
        return redirect('berita/'.$post->slug);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
        $this->authorize('delete',$comment);
        $post = $comment->post()->firstOrFail();
        $comment->delete();
        return redirect('berita/'.$post->slug);
    }
}
