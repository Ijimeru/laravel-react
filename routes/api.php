<?php

use App\Http\Controllers\BookApiController;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', function () {
    return new UserResource(User::all());
});

Route::post('/tokens/create', function (LoginRequest $request) {
    $request->authenticate();
    $token = $request->user()->createToken('SHA-256');
    return ['token' => $token->plainTextToken];
});
Route::post('/posts/', function () {
    return new PostResource(Post::all());
})->middleware('auth:sanctum');

Route::apiResource("books",BookApiController::class);