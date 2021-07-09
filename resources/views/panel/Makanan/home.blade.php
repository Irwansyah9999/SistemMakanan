@extends('panel.layout.master')

@section('title','Makanan')

@section('content')
    <div class="pad-5px bg-white">
        <h2>Halaman Makanan</h2>
    </div>
    <div class="mg-top-10px">
        <div class="bg-white pad-5px">
            @if(session('sukses'))
                <div class="pad-5px bd-radius-5px btn-warning">
                    {{ session('sukses') }}
                </div>
            @endif
            <h2>Data Makanan
                <button class="btn btn-safe" onclick="add()">+</button>
            </h2>
        </div>

        <div class="ds-flex jc-start mg-top-20px">
            @if(count($data) > 0)
            <?php 
            $keyArray = array_keys($data[0]);

            $dataMakanan = [];

            // out data makanan
            foreach ($data as $key => $value) { ?>
                <div class="col-25pc bg-white">
                    <div class="height-10em">
                        <img src="{{ url('public/img/'.$value['gambar']) }}" alt="" class="img max-height">
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
                                <button class="btn-sm btn-warning" onclick="update('{{$value['id']}}')">Perbarui</button>
                                <button class="btn-sm btn-danger" onclick="remove('{{$value['id']}}')">Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>
            <?php
            }
            ?>
            @endif
        </div>
    </div>
@endsection

@section('form')
    <div class="greater col-40pc bg-white pad-10px" id="form-tambah">
        <div class="boundary">
            <div>
                <h3>Form Tambah</h3>
            </div>
            <div class="pad-5px">
                <form action="{{ url('SaveMakanan') }}" method="post" id="form">
                    @csrf
                    <div class="group-control">
                        <label for="">Gambar</label>
                        <input type="text" name="gambar" id="gambar" class="control-sm" placeholder="masukan gambar">
                    </div>
                    <div class="group-control">
                        <label for="">Id</label>
                        <input type="text" name="id" id="id" class="control-sm" placeholder="masukan kode">
                    </div>
                    <div class="group-control">
                        <label for="">Nama</label>
                        <input type="text" name="nama" id="nama" class="control-sm" placeholder="masukan nama">
                    </div>
                    <div class="group-control">
                        <label for="">Jenis</label>
                        <select name="jenis" id="jenis" class="control-sm">
                            <option value="">-Pilih-</option>
                            <option value="makanan">Makanan</option>
                            <option value="minuman">Minuman</option>
                        </select>
                    </div>
                    <div class="group-control">
                        <label for="">Harga</label>
                        <input type="number" name="harga" id="harga" class="control-sm" placeholder="masukan harga">
                    </div>
                    <div class="group-control">
                        <label for="">Keterangan</label>
                        <textarea name="keterangan" id="keterangan" class="control-sm" cols="30" rows="10" placeholder="masukan keterangan"></textarea>
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
                <form action="{{ url('DeleteMakanan') }}" method="post">
                    @csrf
                    <div class="group-control ds-none">
                        <label for="">Id</label>
                        <input type="text" name="id" id="id-hapus" class="control-sm" placeholder="masukan kode">
                    </div>

                    <div class="txt-center">
                        Apakah anda yakin ingin menghapus makanan <span id="nama-hapus"></span> ?
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
                <form action="{{ url('StatusMakanan') }}" method="post">
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
        document.getElementById('form').action = "{{ url('SaveMakanan') }}"
            
        document.getElementById('gambar').value = ""

        document.getElementById('id').value = ""

        document.getElementById('nama').value = ""

        document.getElementById('jenis').value = ""

        document.getElementById('harga').value = ""

        document.getElementById('keterangan').innerHTML = ""

        addCssWithId('form-tambah',{
            display:"block"
        })
    }

    function update(id){
        httpGetAsync("{{url('data-makanan-select/')}}/"+id,function(response){
            let dataMakananSelect = JSON.parse(response.responseText)

            document.getElementById('form').action = "{{ url('UpdateMakanan') }}"
            
            document.getElementById('gambar').value = dataMakananSelect[0].gambar

            document.getElementById('id').value = dataMakananSelect[0].id

            document.getElementById('nama').value = dataMakananSelect[0].nama

            document.getElementById('jenis').value = dataMakananSelect[0].jenis

            document.getElementById('harga').value = dataMakananSelect[0].harga

            document.getElementById('keterangan').innerHTML = dataMakananSelect[0].keterangan


        });

        addCssWithId('form-tambah',{
            display:"block"
        })
    }

    function remove(id){
        httpGetAsync("{{url('data-makanan-select/')}}/"+id,function(response){
            let dataMakananSelect = JSON.parse(response.responseText)

            document.getElementById('id-hapus').value = dataMakananSelect[0].id

            document.getElementById('nama-hapus').innerHTML = dataMakananSelect[0].nama

        });

        addCssWithId('form-hapus',{
            display:"block"
        })
    }

    function status(id){
        httpGetAsync("{{url('data-makanan-select/')}}/"+id,function(response){
            let dataMakananSelect = JSON.parse(response.responseText)

            document.getElementById('id-status').value = dataMakananSelect[0].id

            document.getElementById('nama-status').innerHTML = dataMakananSelect[0].nama

            document.getElementById('jenis-status').innerHTML = dataMakananSelect[0].jenis

        });

        addCssWithId('form-status',{
            display:"block"
        })
    }
</script>
@endsection