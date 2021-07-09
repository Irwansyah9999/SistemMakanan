<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pegawai;
use App\User;

class PegawaiController extends Controller
{
    // halaman utama
    public function index(Request $req){
        $data = Pegawai::all()->toArray();
    
        $id = $req->session()->get('id');
        $akses = $req->session()->get('akses');

        if($id == ''){
            return redirect('Login');
        }else{
            return view('panel.Pegawai.home',['data' => $data,'akses' => $akses]);
        }    
        
    }

    public function dataAll(){
        $data = Pegawai::all()->toArray();
        
        echo json_encode($data);
    }

    public function dataSelect($id){
        $data = Pegawai::where('nip',$id)->get()->toArray();
        
        echo json_encode($data);
    }


    // simpan
    public function store(Request $req){
        $pegawaiValidate = $req->validate(
            [   'nip' => 'required',
                'nama' => 'required',
                'divisi' =>'required',
                'telepon' =>'required',
                'email' => 'required',
                'alamat' => 'required'
            ]
        );

        $pegawai = new Pegawai;

        // ['nip', 'nama', 'bagian', 'email', 'telepon', 'alamat'];
        $pegawai->nip = $req->input('nip');
        $pegawai->nama = $req->input('nama');
        $pegawai->bagian = $req->input('divisi');
        $pegawai->telepon = $req->input('telepon');
        $pegawai->email = $req->input('email');
        $pegawai->alamat = $req->input('alamat');

        $pegawai->save();

        $user = new User;
        $user->name = $req->input('nama');
        $user->email = $req->input('email');
        $user->password = "12345";
        $user->akses = $req->input('divisi');

        $user->save();

        return redirect('Panel/Pegawai')->with('sukses','Berhasil di tambahkan');
    }

    public function update(Request $req){
        // data
        $pegawai = Pegawai::where('nip',$req->input('nip'))
        ->update([
            'nama' => $req->input('nama'),
            'bagian' => $req->input('divisi'),
            'telepon' => $req->input('telepon'),
            'email' => $req->input('email'),
            'alamat' => $req->input('alamat')
        ]);

        return redirect('Panel/Pegawai')->with('sukses','Berhasil di perbarui');
    }

    public function destroy(Request $req){
        Pegawai::destroy($req->input('nip'));

        return redirect('Panel/Pegawai')->with('sukses','Berhasil di hapus');
    }
}
