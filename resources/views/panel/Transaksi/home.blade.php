@extends('panel.layout.master')

@section('title','Transaksi')

@section('content')
    <div class="pad-5px bg-white">
        <h2>Halaman Transaksi</h2>
    </div>
    <div class="mg-top-10px">
        <div class="bg-white pad-5px">
            @if(session('sukses'))
                <div class="pad-5px bd-radius-5px btn-warning">
                    {{ session('sukses') }}
                </div>
            @endif
            <h2>Data Transaksi
            </h2>
        </div>

        <div class="table-responsive bg-white">
            <table class="table tables">
                <thead>
                    <th>No</th>
                    <th>Tanggal Transaksi</th>
                    <th>Status</th>
                    <th>Keterangan</th>
                    <th>Pesanan</th>

                    <th>Dibuat</th>
                    <th>Diupdate</th>
                    <th>Aksi</th>
                </thead>
                <tbody>
                @if(count($data) > 0)
                <?php 
                $keyArray = array_keys($data[0]);

                // out data transaksi
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
                        <td><button class="btn-sm btn-danger" onclick="remove('{{ $value['kode'] }}')">Hapus</button></td>
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
    <div class="greater col-40pc bg-white pad-10px" id="form-hapus">
        <div class="boundary">
            <div>
                <h3>Hapus Data</h3>
            </div>
            <div class="pad-5px">
                <form action="{{ url('DeleteTransaksi') }}" method="post">
                    @csrf
                    <div class="group-control ds-none">
                        <label for="">Id</label>
                        <input type="text" name="id" id="id-hapus" class="control-sm" placeholder="masukan kode">
                    </div>

                    <div class="txt-center">
                        Apakah anda yakin ingin menghapus Transaksi <span id="nama-hapus"></span> ?
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
                <form action="{{ url('StatusTransaksi') }}" method="post">
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
@endsection

@section('js-custom')
<script>
    //
    function add(){
        document.getElementById('form').action = "{{ url('SaveTransaksi') }}"
            
        document.getElementById('gambar').value = ""

        document.getElementById('id').value = ""

        document.getElementById('nama').value = ""

        document.getElementById('jenis').value = ""

        document.getElementById('keterangan').innerHTML = ""

        addCssWithId('form-tambah',{
            display:"block"
        })
    }

    function update(id){
        httpGetAsync("{{url('data-Transaksi-select/')}}/"+id,function(response){
            let dataTransaksiSelect = JSON.parse(response.responseText)

            document.getElementById('form').action = "{{ url('UpdateTransaksi') }}"
            
            document.getElementById('gambar').value = dataTransaksiSelect[0].gambar

            document.getElementById('id').value = dataTransaksiSelect[0].id

            document.getElementById('nama').value = dataTransaksiSelect[0].nama

            document.getElementById('jenis').value = dataTransaksiSelect[0].jenis

            document.getElementById('keterangan').innerHTML = dataTransaksiSelect[0].keterangan


        });

        addCssWithId('form-tambah',{
            display:"block"
        })
    }

    function remove(id){
        httpGetAsync("{{url('data-Transaksi-select/')}}/"+id,function(response){
            let dataTransaksiSelect = JSON.parse(response.responseText)

            document.getElementById('id-hapus').value = dataTransaksiSelect[0].id

            document.getElementById('nama-hapus').innerHTML = dataTransaksiSelect[0].nama

        });

        addCssWithId('form-hapus',{
            display:"block"
        })
    }

    function status(id){
        httpGetAsync("{{url('data-Transaksi-select/')}}/"+id,function(response){
            let dataTransaksiSelect = JSON.parse(response.responseText)

            document.getElementById('id-status').value = dataTransaksiSelect[0].id

            document.getElementById('nama-status').innerHTML = dataTransaksiSelect[0].nama

            document.getElementById('jenis-status').innerHTML = dataTransaksiSelect[0].jenis

        });

        addCssWithId('form-status',{
            display:"block"
        })
    }
</script>
@endsection