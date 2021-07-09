<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function login(Request $req){
        $data = User::where([
            'email' => $req->input('username'),
            'password' => $req->input('password')
        ])->get()->toArray();

        if(count($data) > 0){
            $req->session()->push('id',$data[0]['id']);
            $req->session()->push('nama',$data[0]['name']);
            $req->session()->push('akses',$data[0]['akses']);

            return redirect('Panel');
        }else{
            return back('status','Username dan password salah');
        }
    }

    public function logout(Request $req){
        $req->session()->forget('nama');
        $req->session()->forget('akses');

        return redirect('Login');
    }
}
