<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PelangganController extends Controller
{
    // halaman utama
    public function index(){
        $data = Makanan::all()->toArray();
        
        return view('panel.makanan.home',['data' => $data]);
    }

    public function dataAll(){
        $data = Makanan::all()->toArray();
        
        echo json_encode($data);
    }

    public function dataSelect($id){
        $data = Makanan::where('id',$id)->get()->toArray();
        
        echo json_encode($data);
    }


    // simpan
    public function store(Request $req){
        $makananValidate = $req->validate(
            [   'id' => 'required',
                'nama' => 'required',
                'jenis' =>'required',
                'keterangan' =>'required'
            ]
        );

        $makanan = new Makanan;

        // ['id', 'nama', 'jenis', 'status', 'keterangan', 'gambar', 'create_at', 'update_at']
        $makanan->id = $req->input('id');
        $makanan->nama = $req->input('nama');
        $makanan->jenis = $req->input('jenis');
        $makanan->status = 'belum';
        $makanan->keterangan = $req->input('keterangan');
        $makanan->gambar = $req->input('gambar');

        $makanan->save();

        return redirect('Panel/Makanan')->with('sukses','Berhasil di tambahkan');
    }

    public function update(Request $req){
        // data
        $makanan = Makanan::where('id',$req->input('id'))
        ->update([
            'id' => $req->input('id'),
            'nama' => $req->input('nama'),
            'jenis' => $req->input('jenis'),
            'keterangan' => $req->input('keterangan'),
            'gambar' => $req->input('gambar')
        ]);

        return redirect('Panel/Makanan')->with('sukses','Berhasil di perbarui');
    }
    
    public function updateStatus(Request $req){
        // data
        $makanan = Makanan::where('id',$req->input('id'))
        ->update([
            'status' => $req->input('jenis')
        ]);

        return redirect('Panel/Makanan')->with('sukses','Status berhasil di perbarui');
    }

    public function destroy(Request $req){
        Makanan::destroy($req->input('id'));

        return redirect('Panel/Makanan')->with('sukses','Berhasil di hapus');
    }
}
