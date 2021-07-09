<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\PesananDetail;
use App\Pesanan;
use App\Makanan;
use App\Pelanggan;
use App\Transaksi;

class PesananController extends Controller
{
    // halaman utama
    public function index(Request $req){
        $datamakanan = Makanan::where('status','ready')->get()->toArray();
        $data = Pesanan::all()->toArray();
        $dataNow = Pesanan::where('tanggal_pesanan',date('Y-m-d'))->get()->toArray();
        
        $id = $req->session()->get('id');
        $akses = $req->session()->get('akses');

        if($id == ''){
            return redirect('Login');
        }else{
            return view('panel.pesanan.home',['data' => $data,'dataNow' => $dataNow,'akses' => $akses,'datamakanan'=>$datamakanan]);
        }
    }

    public function dataAll(){
        $data = Pesanan::all()->toArray();
        
        echo json_encode($data);
    }

    public function dataSelect($id){
        $data = Pesanan::where('no',$id)->get()->toArray();
        
        echo json_encode($data);
    }

    // simpan
    public function store(Request $req){

        $pesananValidate = $req->validate(
            [   'no' => 'required',
                'keterangan' => 'required',
                'keterangan_pelanggan' =>'required'
            ]
        );

        $pelanggan = new Pelanggan;
        $pelanggan->no_pelanggan = $req->input('nope');
        $pelanggan->status = "pesan";
        $pelanggan->keterangan = $req->input('keterangan_pelanggan');

        $pelanggan->save();

        $pesanan = new Pesanan;

        // ['no', 'tanggal_pesanan', 'status', 'keterangan', 'no_pelanggan'];
        $pesanan->no = $req->input('no');
        $pesanan->tanggal_pesanan = date('Y-m-d H:i:s');
        $pesanan->status = 'aktif';
        $pesanan->keterangan = $req->input('keterangan');
        $pesanan->no_pelanggan = $req->input('nope');

        $pesanan->save();

        // pesanan detail
        $pesananDetail = new PesananDetail;
        if($req->input('pilih') != null){
            foreach($req->input('pilih') as $key => $value){
                $pesananDetail->no_pesanan = $req->input('no');
                $pesananDetail->id_makanan = $value;
                $pesananDetail->jumlah_pembelian = $req->input('jumlah')[$value];;
                $pesananDetail->keterangan = $req->input('keteranganDetail')[$value];

                $pesananDetail->save();
            }
        }

        return redirect('Panel/Pesanan')->with('sukses','Berhasil di tambahkan');
        
    }

    public function update(Request $req){
        // data
        $pesanan = Pesanan::where('id',$req->input('id'))
        ->update([
            'id' => $req->input('id'),
            'nama' => $req->input('nama'),
            'jenis' => $req->input('jenis'),
            'keterangan' => $req->input('keterangan'),
            'gambar' => $req->input('gambar')
        ]);

        return redirect('Panel/Pesanan')->with('sukses','Berhasil di perbarui');
    }
    
    public function updatePembayaran(Request $req){
        // data
        $pesanan = Pesanan::where('no',$req->input('no_pesanan'))
        ->update([
            'status' => "finish"
        ]);

        $transaksi = new Transaksi;

        // ['kode', 'tanggal_transaksi', 'status', 'keterangan', 'no_pesanan'];
        $transaksi->kode = $req->input('kode');
        $transaksi->tanggal_transaksi = date('Y-m-d H:i:s');
        $transaksi->status = 'bayar';
        $transaksi->keterangan = $req->input('keterangan_transaksi');
        $transaksi->no_pesanan = $req->input('no_pesanan');

        $transaksi->save();

        return redirect('Panel/Transaksi')->with('sukses','Status berhasil di perbarui');
    }

    public function destroy(Request $req){
        Pesanan::destroy($req->input('id'));

        return redirect('Panel/Pesanan')->with('sukses','Berhasil di hapus');
    }
}
