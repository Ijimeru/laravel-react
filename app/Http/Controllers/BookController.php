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

        if (strpos($validated['file'], 'https://drive.google.com')!==false){
            $link = explode("/file/d/", $validated['file']);
            if (count($link) >= 2){
                $validated['file'] = $link[1];
                $check_view = strpos($validated['file'], '/view');
                $check_preview = strpos($validated['file'], '/preview');
                if ($check_view !== false){
                    $validated['file'] = substr($validated['file'], 0, $check_view);
                }elseif ($check_preview !== false){
                    $validated['file'] = substr($validated['file'], 0, $check_preview);
                }else{
                    $validated['file'] = $request->file;
                }
            }
        }else{
            $validated['file'] = $request->file;
        }
        if (strpos($validated['cover'], 'https://drive.google.com')!==false){
            $link = explode("/file/d/", $validated['cover']);
            if (count($link) >= 2){
                $validated['cover'] = $link[1];
                $check_view = strpos($validated['cover'], '/view');
                $check_preview = strpos($validated['cover'], '/preview');
                if ($check_view !== false){
                    $validated['cover'] = substr($validated['cover'], 0, $check_view);
                }elseif ($check_preview !== false){
                    $validated['cover'] = substr($validated['cover'], 0, $check_preview);
                }else{
                    $validated['cover'] = $request->cover;
                }
            }
        }else{
            $validated['cover'] = $request->cover;
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
        $req = $request->only(['title','cover','file','author','tahun','penerbit']);
        $dummy = [
            "id"=>$book->id,
            "title"=>$req["title"],
            "cover"=>$req["cover"],
            "file"=>$req["file"],
            "author"=>$req["author"],
            "tahun"=>$req["tahun"],
            "penerbit"=>$req["penerbit"],
            "created_at"=>$book->attributesToArray()["created_at"],
            "updated_at"=>$book->attributesToArray()["updated_at"]
        ];
        if($book->attributesToArray() == $dummy){
            return redirect(route("books.index"))->with(
                [   
                    'msg'=>'Tidak ada perubahan',
                    'type'=>'success'
                ]);
        }
        
        $validated = $request->validated();
        $this->authorize('update', $book);
        if (strpos($validated['file'], 'https://drive.google.com')!==false){
            $link = explode("/file/d/", $validated['file']);
            if (count($link) >= 2){
                $validated['file'] = $link[1];
                $check_view = strpos($validated['file'], '/view');
                $check_preview = strpos($validated['file'], '/preview');
                if ($check_view !== false){
                    $validated['file'] = substr($validated['file'], 0, $check_view);
                }elseif ($check_preview !== false){
                    $validated['file'] = substr($validated['file'], 0, $check_preview);
                }else{
                    $validated['file'] = $request->file;
                }
            }
        }else{
            $validated['file'] = $request->file;
        }
        if (strpos($validated['cover'], 'https://drive.google.com')!==false){
            $link = explode("/file/d/", $validated['cover']);
            if (count($link) >= 2){
                $validated['cover'] = $link[1];
                $check_view = strpos($validated['cover'], '/view');
                $check_preview = strpos($validated['cover'], '/preview');
                if ($check_view !== false){
                    $validated['cover'] = substr($validated['cover'], 0, $check_view);
                }elseif ($check_preview !== false){
                    $validated['cover'] = substr($validated['cover'], 0, $check_preview);
                }else{
                    $validated['cover'] = $request->cover;
                }
            }
        }else{
            $validated['cover'] = $request->cover;
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
        File::delete(public_path().'/storage/'.$book->cover);
        File::delete(public_path().'/storage/'.$book->file);
        $book->categories()->detach();
        $book->delete();
        return redirect(route('books.index'));
    }
}
