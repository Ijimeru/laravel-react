<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Book;
use Cviebrock\EloquentSluggable\Services\SlugService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
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
        if($validated["status"]=="published"){
            $validated["published_at"]=now();
        }
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
        return Inertia::render('Posts/Partials/View',[
            'logo'=>\App\Models\Setting::find(4),
            'post'=> $post->load(["author","categories"]),
            'categories'=> \App\Models\Category::whereHas('meta_category',function(Builder $query){
                $query->where('name','post');
            })->get()->load("posts")
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
        return Inertia::render('Posts/Partials/Edit',[
            'logo'=>\App\Models\Setting::find(4),
            'postingan'=>$post->load('categories'),
            'categories'=>\App\Models\Category::whereHas('meta_category',function(Builder $query){
                $query->where('name','Post');
            })->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
        $this->authorize('update', $post);
        $req = $request->except(['_method','categories']);
        $dummy = [
            "id"=>$post->id,
            "user_id"=>$post->user_id,
            "image"=>$req["image"],
            "title"=>$req["title"],
            "slug"=> $post->slug,
            "excerpt"=> Str::limit(strip_tags($req["body"]), 200),
            "body" => $req["body"],
            "status"=> $req["status"],
            "published_at"=>$post->published_at,
            "created_at"=> $post->attributesToArray()["created_at"],
            "updated_at"=> $post->attributesToArray()["updated_at"]
        ];
        if($post->attributesToArray() == $dummy){
            return redirect(route("posts.index"))->with([
                "msg"=>"Tidak ada perubahan",
                "type"=> "success"
            ]);
        }
        $validated = $request->validated();
        if($request->image != $post->image){
            $request->validate([
                    'image'=> 'image',
                ]);
            File::delete(public_path()."/storage/".$post->image);
            $validated['image']=$request->file('image')->store('post-image');
        }
        
        $categories = \App\Models\Category::whereIn('name',$request->categories)->get();
        $post->categories()->sync($categories);
        $post->update($validated);
        return redirect(route('posts.index'))->with(
            [   
                'msg'=>'Postingan berhasil diedit',
                'type'=>'success'
            ]
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
        $this->authorize('delete',$post);
        File::delete(public_path()."/storage/".$post->image);
        $post->categories()->detach();
        $post->delete();
        return redirect(route("posts.index"));
    }

    /**
     * Patch specified posts status from storage.
     */
    public function changeStatus(Request $request,string $slug):RedirectResponse{
        $post = Post::where('slug',$slug)->firstOrFail();
        $post->status = $request->status;
        if($request->status == "published"){
            $post->published_at = now();
        }
        if($request->status == "draft" || $request->status =="trash"){
            $post->published_at = null;
        }
        $post->save();
        return redirect(route('posts.index'));
    }
}
