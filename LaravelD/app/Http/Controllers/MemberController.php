<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Member;
use App\Services\MemberService;
use Illuminate\Support\Facades\Log;

class MemberController extends Controller
{
    public function index(Request $request) {
        $members = Member::all();
        return json_encode([
            'data' => $members,
            'message' => "OK",
            'status' => 200
        ]);
    }

    public function store(Request $request) {
        try{
            $newMember = (new MemberService)->store($request, Member::class);
            return json_encode([
                'data' => $newMember,
                'message' => "Miembro creado correctamente",
                'status' => 200
            ]);
        }
        catch(\Exception $ex){
            Log::error($ex);
            dd($ex);
            return json_encode([
                'data' => $ex,
                'message' => "ERROR",
                'status' => 402
            ]);
        }

    }
}
