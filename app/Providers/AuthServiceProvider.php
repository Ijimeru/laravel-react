<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Notifications\Messages\MailMessage;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
        'App\Models\Book'=>'App\Policies\BookPolicy',
        'App\Models\Post'=>'App\Policies\PostPolicy',
        'App\Models\Category'=>'App\Policies\CategoryPolicy',
        'App\Models\Comment'=>'App\Policies\CommentPolicy'
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            return (new MailMessage)
                ->subject('Verifikasi Alamat Email')
                ->greeting("Halo!")
                ->line('Klik tombol di bawah untuk memverifikasi alamat email Anda.')
                ->action('Verifikasi Alamat Email', $url);
        });
    }
}
