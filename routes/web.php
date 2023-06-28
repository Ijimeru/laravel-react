<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\ChirpController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/web-settings',fn()=>
    Inertia::render('Dashboard/WebSettings')
)->name('websettings');

Route::get('/', function () {
    return Inertia::render('Main/Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'posts'=> \App\Models\Post::all()->load(['author','categories']),
        'categories'=>\App\Models\Category::all()->load('posts')
    ]);
})->name("home");
Route::get('/sejarah-visi-misi',fn()=>
    Inertia::render("Main/SejarahVisiMisi")
)->name("sejarahvisimisi");
Route::get('/kepengurusan',fn()=>
    Inertia::render("Main/Kepengurusan")
)->name("kepengurusan");
Route::get('/buku',fn(Request $request)=>

    Inertia::render("Main/Buku",[
        "books"=>\App\Models\Book::all()->load('categories'),
        "categories"=>\App\Models\Category::whereHas('meta_category',function(\Illuminate\Database\Eloquent\Builder $query){
            $query->where('name','Book');
        })->get()
    ])
)->name("buku");
Route::get('/store',fn()=>
    Inertia::render("Main/Store")
)->name("store");
Route::get('/berita/',fn()=>
    Inertia::render("Main/Berita",[
    "posts"=>\App\Models\Post::all()->load(['author','categories']),
    "categories"=>\App\Models\Category::whereHas('meta_category',function(\Illuminate\Database\Eloquent\Builder $query){
        $query->where('name',"Post");
    })->get()
])
)->name("berita");

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('chirps',ChirpController::class)->only(['index', 'store', 'update', 'destroy','show'])->middleware(['auth','verified']);
Route::resource('posts',PostController::class)->only(['index', 'store', 'update', 'destroy','show'])->middleware(['auth','verified']);
Route::resource('books',BookController::class)->only(['index', 'store', 'update', 'destroy','show'])->middleware(['auth','verified']);
require __DIR__.'/auth.php';
