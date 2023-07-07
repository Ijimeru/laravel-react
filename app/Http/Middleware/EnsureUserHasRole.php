<?php

namespace App\Http\Middleware;

use App\Providers\AuthServiceProvider;
use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use function PHPSTORM_META\type;

class EnsureUserHasRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role ): Response
    {
        $role = explode(',',$role);
        if(!$request->user()->hasRole($role)){
            if($request->user()->hasRole(['admin'])){
                return redirect(url()->previous())->with([
                    'msg'=>'Anda tidak mempunyai role '. implode(',',$role),
                    'type'=>"warning"
                ]);
            }else{
                return redirect(RouteServiceProvider::HOME)->with([
                    'msg'=>'Anda tidak mempunyai role '. implode(',',$role),
                    'type'=>"warning"
                ]);
            }
        }
        return $next($request);
    }
}
