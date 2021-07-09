<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// login
Route::get('Login', function () {
    return view('panel.login');
});

Route::post('AksesLogin',"UserController@login");

Route::get('AksesLogout',"UserController@logout");

// halaman utama panel
Route::get('Panel', function(Illuminate\Http\Request $req){
    $dataPesanan = App\Pesanan::all()->toArray();
    $dataMakanan = App\Makanan::all()->toArray();
    $dataTransaksi = App\Transaksi::all()->toArray();

    $id = $req->session()->get('nama');

    if($id == array()){
        return redirect('Login');
    }else{
        return view('panel.home',['datapesanan' => $dataPesanan,'datamakanan'=>$dataMakanan,'datatransaksi'=>$dataTransaksi]);
    }
});


// pesanan
Route::get('Panel/Pesanan/', 'PesananController@index');

Route::get('data-pesanan', 'PesananController@dataAll');

Route::get('data-pesanan-select/{id}', 'PesananController@dataSelect');

Route::post('SavePesanan', 'PesananController@store');

Route::post('UpdatePesanan', 'PesananController@update');

Route::post('DeletePesanan', 'PesananController@destroy');

Route::post('SavePembayaran', 'PesananController@updatePembayaran');


// makanan
Route::get('Panel/Makanan/', 'MakananController@index');

Route::get('data-makanan', 'MakananController@dataAll');

Route::get('data-makanan-select/{id}', 'MakananController@dataSelect');

Route::post('SaveMakanan', 'MakananController@store');

Route::post('UpdateMakanan', 'MakananController@update');

Route::post('DeleteMakanan', 'MakananController@destroy');

Route::post('StatusMakanan', 'MakananController@updateStatus');

// transaksi
Route::get('Panel/Transaksi/', 'TransaksiController@index');

Route::get('data-transaksi', 'TransaksiController@dataAll');

Route::get('data-transaksi-select/{id}', 'TransaksiController@dataSelect');

Route::post('SaveTransaksi', 'TransaksiController@store');

Route::post('UpdateTransaksi', 'TransaksiController@update');

Route::post('DeleteTransaksi', 'TransaksiController@destroy');

Route::post('StatusTransaksi', 'TransaksiController@updateStatus');


// pegawai
Route::get('Panel/Pegawai/', 'PegawaiController@index');

Route::get('data-pegawai', 'PegawaiController@dataAll');

Route::get('data-pegawai-select/{id}', 'PegawaiController@dataSelect');

Route::post('SavePegawai', 'PegawaiController@store');

Route::post('UpdatePegawai', 'PegawaiController@update');

Route::post('DeletePegawai', 'PegawaiController@destroy');