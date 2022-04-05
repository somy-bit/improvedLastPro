<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    function register(Request $req)

    {
        
        $data = request()->validate(
           [ 
            'name'=>'required',
            'email'=>'unique:users|required',
            'password'=>'required'
           ]
        );


      
        try {
           $user= User::create($data);
        } catch (Exception $exception) {
            return $exception->getMessage();
        }

        return $user;
    }

    function login(Request $req)
    {

        $user = User::where('email', $req->email)->first();

        if (!$user || !Hash::check($req->password, $user->password)) {
            return 'false';
        }
        return $user;
    }
}
