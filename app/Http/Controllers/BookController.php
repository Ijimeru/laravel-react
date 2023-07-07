<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $this->middleware(['auth','verified','role:admin']);
    }
    public function index()
    {
        //
        return Inertia::render('Books/Index',[

            'logo'=>\App\Models\Setting::find(4),
            'books'=>\App\Models\Book::all()->load('categories')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Books/Partials/Create',[
            'logo'=>\App\Models\Setting::find(4),
            "categories"=>\App\Models\Category::whereHas('meta_category',function(\Illuminate\Database\Eloquent\Builder $query){
                $query->where('name','Book');
            })->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request)
    {
        //

        $validated = $request->validated();

        if($request->file('file')){
            $validated['file']=$request->file('file')->store('book-images');
        }
        if($request->file('cover')){
            $validated['cover']= $request->file('cover')->store('cover');
        }
        $categories = \App\Models\Category::whereIn('name',$request->categories)->get();
        
        Book::create($validated)->categories()->attach($categories);
        return redirect(route('books.index'))->with([
            'msg'=>'Buku berhasil ditambahkan',
            'type'=>'success'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        return Inertia::render('Books/Partials/Edit',[
            'logo'=>\App\Models\Setting::find(4),
            "categories"=>\App\Models\Category::whereHas('meta_category',function(\Illuminate\Database\Eloquent\Builder $query){
                $query->where('name','Book');
            })->get(),
            'book'=>[
                'id'=>$book->id,
                'title'=>$book->title,
                'author'=>$book->author,
                'file'=>$book->file,
                'cover'=>$book->cover,
                'categories'=>$book->categories()->get(),
                'tahun'=>$book->tahun,
                'penerbit'=>$book->penerbit
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book):RedirectResponse
    {
        //
        $this->authorize('update', $book);
        $validated = $request->validated();
        if($request->file != $book->file){
            $request->validate([
                'file'=>['mimes:pdf']
            ]);
        }
        if($request->cover != $book->cover){
            $request->validate([
                'cover'=>'image|file',
            ]);
        }
        $book->update($validated);
 
        return redirect(route('books.index'))->with(
            [   
                'msg'=>'Buku berhasil diedit',
                'type'=>'success'
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book) :RedirectResponse
    {
        //
        $this->authorize('delete', $book);
        File::delete(storage_path($book->cover));
        File::delete(storage_path($book->file));
        $book->categories()->detach();
        $book->delete();
        return redirect(route('books.index'));
    }
}
