<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\MemberRequest;
use App\Models\Member;
use App\Services\MemberService;
use Illuminate\Support\Facades\Log;

class MemberController extends Controller
{
    public function index(MemberRequest $request) {
        $members = Member::all();
        return [$members, "OK", 200];
    }

    public function store(MemberRequest $request) {
        try{
            $newMember = (new MemberService)->store($request, Member::class);
            return [$newMember, "Miembro creado correctamente", 200];
        }
        catch(\Exception $ex){
            Log::error($ex);
            dd($ex);
            return [$ex, "ERROR", 402];
        }
    }

    public function update(MemberRequest $request, Member $member) {
        try{
            (new MemberService)->update($request, $member);
            return [$member,"Miembro actualizado correctamente",200];
        }
        catch(\Exception $ex){
            Log::error($ex);
            dd($ex);
            return [$ex, "ERROR", 402];
        }
    }
}
