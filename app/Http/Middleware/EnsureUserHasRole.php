<?php

namespace App\Http\Middleware;

use App\Providers\AuthServiceProvider;
use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role ): Response
    {
        if(!$request->user()->hasRole($role)){
            return redirect('dashboard')->with([
                'msg'=>'Anda tidak mempunyai role '.$role,
                'type'=>"warning"
            ]);
        }
        return $next($request);
    }
}
