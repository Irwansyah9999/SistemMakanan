@extends('panel.layout.master')

@section('title','Selamat Datang di menu auss')

@section('content')
    <div class="bg-white pad-5px">
        <h2>Selamat Datang</h2>
    </div>

    <div class="box-list mg-top-20px">
        <div class="height-10em ds-flex jc-space-between bd-right-3px bg-white" color="blue">
            <div class="col-20pc">
                <span class="icn-xlarge">Pesanan</span>
            </div>
            <div class="col-40pc">
                <span class="icn-xxlarge"><?= count($datapesanan) ?></span>
            </div>
        </div>
        <div class="height-10em ds-flex jc-space-between bd-right-3px bg-white" color="red">
            <div class="col-20pc">
                <span class="icn-xlarge">Makanan</span>
            </div>
            <div class="col-40pc">
                <span class="icn-xxlarge"><?= count($datamakanan) ?></span>
            </div>
        </div>
        <div class="height-10em ds-flex jc-space-between bd-right-3px bg-white" color="yellow">
            <div class="col-20pc">
                <span class="icn-xlarge">Transaksi</span>
            </div>
            <div class="col-40pc">
                <span class="icn-xxlarge"><?= count($datatransaksi) ?></span>
            </div>
        </div>
    </div>
@endsection