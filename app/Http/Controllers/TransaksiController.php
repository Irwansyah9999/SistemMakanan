<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transaksi;

class TransaksiController extends Controller
{
    // halaman utama
    public function index(Request $req){
        $data = Transaksi::all()->toArray();
        
        $id = $req->session()->get('id');
        $akses = $req->session()->get('akses');

        if($id == ''){
            return redirect('Login');
        }else{
            return view('panel.transaksi.home',['data' => $data,'akses'=>$akses]);
        }

    }

    public function dataAll(){
        $data = Transaksi::all()->toArray();
        
        echo json_encode($data);
    }

    public function dataSelect($id){
        $data = Transaksi::where('id',$id)->get()->toArray();
        
        echo json_encode($data);
    }


    // simpan
    public function store(Request $req){
        $transaksiValidate = $req->validate(
            [   'id' => 'required',
                'nama' => 'required',
                'jenis' =>'required',
                'keterangan' =>'required'
            ]
        );

        $transaksi = new Transaksi;

        // ['id', 'nama', 'jenis', 'status', 'keterangan', 'gambar', 'create_at', 'update_at']
        $transaksi->id = $req->input('id');
        $transaksi->nama = $req->input('nama');
        $transaksi->jenis = $req->input('jenis');
        $transaksi->status = 'belum';
        $transaksi->keterangan = $req->input('keterangan');
        $transaksi->gambar = $req->input('gambar');

        $transaksi->save();

        return redirect('Panel/Transaksi')->with('sukses','Berhasil di tambahkan');
    }

    public function update(Request $req){
        // data
        $transaksi = Transaksi::where('id',$req->input('id'))
        ->update([
            'id' => $req->input('id'),
            'nama' => $req->input('nama'),
            'jenis' => $req->input('jenis'),
            'keterangan' => $req->input('keterangan'),
            'gambar' => $req->input('gambar')
        ]);

        return redirect('Panel/Transaksi')->with('sukses','Berhasil di perbarui');
    }
    
    public function updateStatus(Request $req){
        // data
        $transaksi = Transaksi::where('id',$req->input('id'))
        ->update([
            'status' => $req->input('jenis')
        ]);

        return redirect('Panel/Transaksi')->with('sukses','Status berhasil di perbarui');
    }

    public function destroy(Request $req){
        Transaksi::destroy($req->input('id'));

        return redirect('Panel/Transaksi')->with('sukses','Berhasil di hapus');
    }
}
