<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

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
            'book'=>\App\Models\Book::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Books/Create',[
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
        // dd($request->categories);
        $categories = \App\Models\Category::whereIn('name',$request->categories)->get();
        
        Book::create($validated)->categories()->attach($categories);
        return redirect(route('books.index'))->with('msg','Post Berhasil ditambahkan');
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        //
    }
}
