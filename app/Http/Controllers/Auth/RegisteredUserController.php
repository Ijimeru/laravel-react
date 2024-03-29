<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Jobs\SendEmailVerification;
use App\Models\Role;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register',['logo'=>\App\Models\Setting::find(4)]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required','string','email','max:255','unique:'.User::class,'regex:/^.+\.+[0-9]{2,3}.+28.+[0-9]{2,4}.+\@student\.itera\.ac\.id$/i'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $default= Role::all()->where('role','default');
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $user->roles()->attach($default);
        event(new Registered($user));
        Auth::login($user);

        return redirect(RouteServiceProvider::HOME)->with([
            'msg'=>"Akun berhasil dibuat, silahkan cek email untuk verifikasi akun.",
            'type'=>'success'
        ]);
    }
}
