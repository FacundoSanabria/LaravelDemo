<?php

namespace App\Http\Middleware;

use Closure;

class JSONresponse
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        if( isset($response->original[2]) ){
            $response->setContent(json_encode([
                ( $response->original[2] < 399 ? "data" : "errors" ) => $response->original[0],
                "message" => $response->original[1],
                "status" => $response->original[2],   
            ]));
            $response->setStatusCode($response->original[2]); 
        }
 
        return $response; 
    }
}
