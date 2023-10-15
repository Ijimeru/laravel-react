<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChirpController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Rules\CheckIfFavicon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
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

Route::get('/web-settings',function(){
        
        return Inertia::render('Dashboard/WebSettings',[
            'sejarah'=> \App\Models\Setting::find(1),
            'visi'=> \App\Models\Setting::find(2),
            'misi'=> \App\Models\Setting::find(3),
            'logo' => \App\Models\Setting::find(4),
            'kontak' => \App\Models\Setting::find(5),
            'secret' => \App\Models\Setting::find(6),
            'kontakreset' => \App\Models\Setting::find(7)
        ]);
    }
    
)->name('websettings')->middleware(['auth','verified','role:super_admin']);

Route::patch('/change-settings/{id}',function(Request $request,int $id){
    // ddd($id);
    // if($id ==4){
    //     $validatedData= $request->validate([
    //         'content'=>'required|file|image'
    //     ]);
    //     $settings = \App\Models\Setting::find($id);
    //     $settings->update($validatedData);
    //     return redirect(route("websettings")); 
    // }
    $settings = \App\Models\Setting::find($id);
    $settings->update(['content'=>$request->content]);
    return redirect(route("websettings"));
});

Route::post('/change-logo',function(Request $request){
    $settings = \App\Models\Setting::find(4);
    // $request->file->move(public_path('img/'),"logo.png");
    $validated = $request->validate([
        'file'=> 'required'
    ]);
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
    $settings->update(['content'=>$validated['file']]);
    return redirect(route("websettings"));
});

Route::post('/change-favicon',function (Request $request){
    $request->validate([
        'file'=>['required', new CheckIfFavicon]
    ]);
    $request->file('file')->storeAs('', 'favicon.ico','public_uploads');
});

Route::get('/', function () {
    return Inertia::render('Main/Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'posts'=> \App\Models\Post::where("status","published")->get()->load(['author','categories']),
        'categories'=>\App\Models\Category::where('meta_category_id',1)->get()->load('posts'),
        'logo'=>\App\Models\Setting::find(4),
        'visi'=>\App\Models\Setting::find(2),
        'kontak'=>\App\Models\Setting::find(5)
    ]);
})->name("home");
Route::get('/sejarah-visi-misi',fn()=>
    Inertia::render("Main/SejarahVisiMisi",[
        'sejarah'=> \App\Models\Setting::find(1),
        'visi'=> \App\Models\Setting::find(2),
        'misi'=> \App\Models\Setting::find(3),
        'logo'=>\App\Models\Setting::find(4),
        'kontak'=>\App\Models\Setting::find(5)
    ])
)->name("sejarahvisimisi");
Route::get('/kepengurusan',function(Request $request){
    $name = $request->name;
    $data = \App\Models\Kepengurusan::where('name',$name)->get()[0];
    return Inertia::render("Main/Kepengurusan",[
        'logo'=>\App\Models\Setting::find(4),
        'visi'=>\App\Models\Setting::find(2),
        'kontak'=>\App\Models\Setting::find(5),
        'data'=>$data
    ]);
}
)->name("kepengurusan");
Route::get('/buku',fn(Request $request)=>

    Inertia::render("Main/Buku",[
        "books"=>\App\Models\Book::all()->load('categories'),
        "categories"=>\App\Models\Category::whereHas('meta_category',function(\Illuminate\Database\Eloquent\Builder $query){
            $query->where('name','Book');
        })->get(),
        'logo'=>\App\Models\Setting::find(4),
        'kontak'=>\App\Models\Setting::find(5),
        'visi'=>\App\Models\Setting::find(2)
    ])
)->name("buku")->middleware(['auth','role:default']);
Route::get('/store',fn()=>
    Inertia::render("Main/Store",[
        'logo'=>\App\Models\Setting::find(4),
        'visi'=>\App\Models\Setting::find(2),
        'kontak'=>\App\Models\Setting::find(5)
    ])
)->name("store");
Route::get('/berita/',fn()=>
    Inertia::render("Main/Berita",[
    "posts"=>\App\Models\Post::where("status","published")->get()->load(['author','categories']),
    "categories"=>\App\Models\Category::whereHas('meta_category',function(\Illuminate\Database\Eloquent\Builder $query){
        $query->where('name',"Post");
    })->get(),
    'logo'=>\App\Models\Setting::find(4),
    'visi'=>\App\Models\Setting::find(2),
    'kontak'=>\App\Models\Setting::find(5)
])
)->name("berita");

Route::get('berita/{slug}',function(string $slug){
    $post = Post::where('slug',$slug)->first();
    if(auth()->guest()){
        $cacheKey = 'post_view_' . $post->id;
    }else{
        $cacheKey = 'post_view_' . $post->id . '_' .auth()->user()->id;
    }

    if (!Cache::has($cacheKey)) {
        // Increment the view count
        $post->increment('views');

        // Set cache to prevent multiple increments within the delay period (e.g., 1 hour)
        Cache::put($cacheKey, true, Carbon::now()->addHour());
    }

    return Inertia::render("Main/ShowBerita",[
        'logo'=>\App\Models\Setting::find(4),
        'visi'=>\App\Models\Setting::find(2),
        'kontak'=>\App\Models\Setting::find(5),
        'post'=> $post->load(['author','categories']),
        'categories'=> \App\Models\Category::whereHas('meta_category',function(Builder $query){
            $query->where('name','Post');
        })->get()->load("posts"),
        'comments'=> Comment::with("user:id,name")->where('post_id',$post->id)->latest()->get()
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Index',[
        'logo'=> \App\Models\Setting::find(4),
        'visi'=>\App\Models\Setting::find(2)
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('chirps',ChirpController::class)->only(['index', 'store', 'update', 'destroy','show'])->middleware(['auth','verified']);

Route::patch('posts/{slug}','\App\Http\Controllers\PostController@changeStatus');
Route::resource('posts',PostController::class)->only(['index', 'store','edit', 'update', 'destroy','show','create'])->middleware(['auth','verified']);
Route::resource('books',BookController::class)->only(['index', 'store', 'update', 'destroy','show','create','edit']);
Route::resource('users',UserController::class)->only(['index', 'store', 'update', 'destroy','show','create','edit']);
Route::resource('roles',RoleController::class)->only(['index','store','update','destroy','create','edit']);
Route::resource('categories',CategoryController::class)->only(['store','destroy']);
Route::resource('comments',CommentController::class)->only(['store','destroy','update']);
Route::get('/tutorial',function(){
    return Inertia::render('Tutorial',[
        'logo'=>\App\Models\Setting::find(4)
    ]);
})->name("tutorial");


require __DIR__.'/auth.php';
