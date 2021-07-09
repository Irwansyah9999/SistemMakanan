@extends('panel.layout.master')

@section('title','Pesanan')

@section('content')
    <div class="pad-5px bg-white">
        <h2>Halaman Pesanan</h2>
    </div>
    <div class="mg-top-10px">
        <div class="bg-white pad-5px">
            @if(session('sukses'))
                <div class="pad-5px bd-radius-5px btn-warning">
                    {{ session('sukses') }}
                </div>
            @endif
            <h2>Data Pesanan
                <button class="btn btn-safe" onclick="add()">+</button>
            </h2>
        </div>

        <div class="table-responsive bg-white">
            <table class="table tables">
                <thead>
                    <th>No</th>
                    <th>Tanggal Pesanan</th>
                    <th>Status</th>
                    <th>Keterangan</th>
                    <th>Pelanggan</th>
                    <th>Dibuat</th>
                    <th>Diupdate</th>

                    <th>Pesanan</th>
                    <th colspan="3">Aksi</th>
                </thead>
                <tbody>
                @if(count($data) > 0)
                <?php 
                $keyArray = array_keys($data[0]);

                $datapesanan = [];

                // out data pesanan
                foreach ($data as $key => $value) { ?>
                    <tr>
                    <?php
                    foreach ($keyArray as $keyKey => $valueKey) { ?>
                        @if($valueKey == 'status' && $value[$valueKey] == 'aktif')
                            <td><span class=" pad-5px btn-green">{{ $value[$valueKey] }}</span></td>
                        @elseif($valueKey == 'status' && $value[$valueKey] != 'aktif')
                            <td><span class=" pad-5px btn-warning">{{ $value[$valueKey] }}</span></td>
                        @else
                            <td>{{ $value[$valueKey] }}</td>
                        @endif
                    <?php
                    }
                    ?>

                    <!-- pesanan detail -->
                    <?php
                    $dtDetail = App\PesananDetail::where('no_pesanan',$value['no'])->get()->toArray();

                    // out detail
                    $dataa = [];
                    foreach ($dtDetail as $keyDet => $valueDet) { 
                        $spanDet = '';
                        $dtMakananDetail = App\Makanan::where('id',$valueDet['id_makanan'])->get()->toArray();
                        $spanDet = '<div class="btn-green pad-5px">'.$dtMakananDetail[0]['nama'].' '.$valueDet['jumlah_pembelian'].'</div>';

                        array_push($dataa,$spanDet);
                        ?>
                        
                    <?php
                    }
                    ?>

                    <td><?= implode('<br>',$dataa) ?></td>

                    <td><button class="btn-sm btn-warning" onclick="update('{{ $value['no'] }}')">Perbarui</button></td>
                    <td><button class="btn-sm btn-danger" onclick="remove('{{ $value['no'] }}')">Hapus</button></td>
                    <td><button class="btn-sm btn-green" onclick="transaksi('{{ $value['no'] }}')">Bayar</button></td>
                    </tr>
                <?php
                }
                ?>
                @else
                    <td>Data Tidak Tersedia</td>
                @endif
                </tbody>
            </table>
        </div>
    </div>
@endsection

@section('form')
    <div class="greater col-40pc bg-white" id="form-tambah">
        <div class="boundary pad-5px">
            <div>
                <h3>Form Pesanan</h3>
            </div>
            <div class="pad-5px">
                <form action="{{ url('SavePesanan') }}" method="post" id="form">
                    @csrf
                    
                    <div class="ds-flex jc-space-between">                        
                        <!-- Pesanan -->
                        <div class="col-50pc">
                            <h3>Pesanan</h3>
                            <div class="group-control">
                                <label for="">No</label>
                                <input type="text" name="no" id="no" class="control-sm" placeholder="masukan kode" value="{{ date('dmY') }}">
                            </div>
                            <div class="group-control">
                                <label for="">Keterangan</label>
                                <textarea name="keterangan" id="keterangan" class="control-sm" cols="30" rows="10" placeholder="masukan keterangan"></textarea>
                            </div>
                        </div>

                        <!-- pelanggan -->
                        <div class="col-45pc">
                            <h3>Pelanggan</h3>
                            <div class="group-control">
                                <label for="">No Pelanggan</label>
                                <input type="text" name="nope" id="nope" class="control-sm" placeholder="masukan kode" value="<?= "P".time() ?>">
                            </div>
                            <div class="group-control">
                                <label for="">Keterangan</label>
                                <textarea name="keterangan_pelanggan" id="keterangan_pelanggan" class="control-sm" cols="30" rows="10" placeholder="masukan keterangan"></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- makanan -->
                    <div class="mg-top-20px">
                        <h3>Pilih Makanan</h3>
                    </div>
                    <div class="box-list mg-top-10px">
                    @foreach($datamakanan as $key => $value)
                    <div class="bg-white">
                        <div class="height-10em pos-rel">
                            <img src="{{ url('public/img/'.$value['gambar']) }}" alt="" class="img max-height">

                            <div class="pos-abs top">
                                <input type="checkbox" name="pilih[{{ $value['id'] }}]" id="" value="{{ $value['id'] }}">
                            </div>
                        </div>
                        <div class="pad-5px">
                            <h3>{{ $value['nama'] }} <sub>{{ $value['jenis'] }}</sub></h3>
                            <h4>Rp. {{ $value['harga'] }}</h4>
                            <div class="pad-5px">
                                <span>{{ $value['keterangan'] }}</span>
                            </div>

                            <div class="ds-flex jc-end">
                                @if($value['status'] == 'ready')
                                <span class="pad-5px bd-radius-5px btn-green" onclick="status('{{$value['id']}}')">{{ $value['status'] }}</span>
                                @else
                                <span class="pad-5px bd-radius-5px btn-danger" onclick="status('{{$value['id']}}')">{{ $value['status'] }}</span>
                                @endif
                            </div>

                            <div class="ds-flex jc-end mg-top-10px">
                                <div>
                                    <div class="group-control">
                                        <label for="">Jumlah Pembelian</label>
                                        <input type="number" name="jumlah[{{ $value['id'] }}]" id="jumlah[{{ $value['id'] }}]" class="control-sm" placeholder="masukan jumlah">
                                    </div>
                                    <div class="group-control">
                                        <label for="">Keterangan</label>
                                        <textarea name="keteranganDetail[{{ $value['id'] }}]" id="keteranganDetail[{{ $value['id'] }}]" class="control-sm" cols="30" rows="10" placeholder="masukan keterangan"></textarea>
                                    </div>                                      
                                </div>
                            </div>
                        </div>
                    </div>
                    @endforeach
                    </div>
                    <div class="group-control">
                        <button type="submit" class="btn btn-safe" name="button">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="greater col-40pc bg-white pad-10px" id="form-hapus">
        <div class="boundary">
            <div>
                <h3>Hapus Data</h3>
            </div>
            <div class="pad-5px">
                <form action="{{ url('DeletePesanan') }}" method="post">
                    @csrf
                    <div class="group-control ds-none">
                        <label for="">Id</label>
                        <input type="text" name="id" id="id-hapus" class="control-sm" placeholder="masukan kode">
                    </div>

                    <div class="txt-center">
                        Apakah anda yakin ingin menghapus pesanan <span id="nama-hapus"></span> ?
                    </div>
                    <div class="group-control">
                        <button type="submit" class="btn btn-safe" name="button">Lanjutkan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="greater col-40pc bg-white" id="form-status">
        <div class="boundary pad-10px">
            <div>
                <h3>Status Data</h3>
            </div>
            <div class="pad-5px">
                <form action="{{ url('StatusPesanan') }}" method="post">
                    @csrf
                    <div class="group-control ds-none">
                        <label for="">Id</label>
                        <input type="text" name="id" id="id-status" class="control-sm" placeholder="masukan kode">
                    </div>

                    <div class="txt-center">
                        Apakah anda yakin ingin mengubah status <span id="jenis-status"></span><span id="nama-status"></span> ?
                        <div class="col-30pc">
                            <select name="jenis" id="jenis-status" class="control-sm">
                                <option value="">-Pilih-</option>
                                <option value="belum">Belum Ready</option>
                                <option value="ready">Ready</option>
                            </select>
                        </div>
                    </div>
                    <div class="group-control">
                        <button type="submit" class="btn btn-safe" name="button">Lanjutkan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


    <div class="greater col-40pc bg-white" id="form-transaksi">
        <div class="boundary pad-5px">
            <div>
                <h3>Form Transaksi</h3>
            </div>
            <div class="pad-5px">
                <form action="{{ url('SavePembayaran') }}" method="post" id="form">
                    @csrf
                    
                    <div class="ds-flex jc-space-between">                        
                        <!-- Pesanan -->
                        <div class="col-50pc">
                            <h3>Transaksi</h3>
                            <div class="group-control">
                                <label for="">Kode</label>
                                <input type="text" name="kode" id="kode" class="control-sm" placeholder="masukan kode" value="<?= "TR".time() ?>">
                            </div>
                            <div class="group-control">
                                <label for="">Keterangan</label>
                                <textarea name="keterangan_transaksi" id="keterangan_transaksi" class="control-sm" cols="30" rows="10" placeholder="masukan keterangan"></textarea>
                            </div>
                            <div class="group-control">
                                <label for="">Pesanan</label>
                                <input type="text" name="no_pesanan" id="no_pesanan" class="control-sm" placeholder="masukan kode" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="group-control">
                        <button type="submit" class="btn btn-safe" name="button">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@section('js-custom')
<script>
    //
    function add(){
        document.getElementById('form').action = "{{ url('SavePesanan') }}"

        //document.getElementById('no').value = ""

        document.getElementById('keterangan').innerHTML = ""

        // pelanggan
        //document.getElementById('nope').value = ""

        document.getElementById('keterangan_pelanggan').innerHTML = ""

        addCssWithId('form-tambah',{
            display:"block"
        })
    }

    function update(id){
        httpGetAsync("{{url('data-pesanan-select/')}}/"+id,function(response){
            let datapesananSelect = JSON.parse(response.responseText)

            document.getElementById('form').action = "{{ url('UpdatePesanan') }}"
            
            document.getElementById('gambar').value = datapesananSelect[0].gambar

            document.getElementById('id').value = datapesananSelect[0].id

            document.getElementById('nama').value = datapesananSelect[0].nama

            document.getElementById('jenis').value = datapesananSelect[0].jenis

            document.getElementById('keterangan').innerHTML = datapesananSelect[0].keterangan


        });

        addCssWithId('form-tambah',{
            display:"block"
        })
    }

    function remove(id){
        httpGetAsync("{{url('data-pesanan-select/')}}/"+id,function(response){
            let datapesananSelect = JSON.parse(response.responseText)

            document.getElementById('id-hapus').value = datapesananSelect[0].id

            document.getElementById('nama-hapus').innerHTML = datapesananSelect[0].nama

        });

        addCssWithId('form-hapus',{
            display:"block"
        })
    }

    function status(id){
        httpGetAsync("{{url('data-pesanan-select/')}}/"+id,function(response){
            let datapesananSelect = JSON.parse(response.responseText)

            document.getElementById('id-status').value = datapesananSelect[0].id

            document.getElementById('nama-status').innerHTML = datapesananSelect[0].nama

            document.getElementById('jenis-status').innerHTML = datapesananSelect[0].jenis

        });

        addCssWithId('form-status',{
            display:"block"
        })
    }

    function transaksi(id){
        httpGetAsync("{{url('data-pesanan-select/')}}/"+id,function(response){
            let datapesananSelect = JSON.parse(response.responseText)
            
            document.getElementById('no_pesanan').value = datapesananSelect[0].no
        });

        addCssWithId('form-transaksi',{
            display:"block"
        })
    }
</script>
@endsection