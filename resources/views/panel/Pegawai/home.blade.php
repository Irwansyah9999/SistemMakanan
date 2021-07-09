@extends('panel.layout.master')

@section('title','Pegawai')

@section('content')
    <div class="pad-5px bg-white">
        <h2>Halaman Pegawai</h2>
    </div>
    <div class="mg-top-10px">
        <div class="bg-white pad-5px">
            @if(session('sukses'))
                <div class="pad-5px bd-radius-5px btn-warning">
                    {{ session('sukses') }}
                </div>
            @endif
            <h2>Data Pegawai
                <button class="btn btn-safe" onclick="add()">+</button>
            </h2>
        </div>

        <div class="ds-flex jc-start mg-top-20px">
            @if(count($data) > 0)
            <?php 
            $keyArray = array_keys($data[0]);

            $datapegawai = [];

            // out data pegawai
            foreach ($data as $key => $value) { ?>
                <div class="col-25pc bg-white">
                    <div class="pad-5px">
                        <h3>{{ $value['nama'] }} <sub>{{ $value['bagian'] }}</sub></h3>
                        <div class="pad-5px">
                            <span>{{ $value['email'] }}</span> <br>
                            <span>{{ $value['telepon'] }}</span> <br>
                            <span>{{ $value['alamat'] }}</span> <br>
                        </div>
                        <div class="ds-flex jc-end mg-top-10px">
                            <div>
                                <button class="btn-sm btn-warning" onclick="update('{{$value['nip']}}')">Perbarui</button>
                                <button class="btn-sm btn-danger" onclick="remove('{{$value['nip']}}')">Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>
            <?php
            }
            ?>
        </div>
        @else
        <div class="col-50pc bg-white txt-center">
            <div class="pad-5px">
                Data Pegawai tidak tersedia
            </div>
        </div>
        @endif
    </div>
@endsection

@section('form')
    <div class="greater bg-white pad-10px" id="form-tambah">
        <div class="boundary col-60pc">
            <div>
                <h3>Form Tambah</h3>
            </div>
            <div class="pad-5px">
                <form action="{{ url('SavePegawai') }}" method="post" id="form">
                    @csrf
                    <div class="group-control">
                        <label for="">Nip</label>
                        <input type="text" name="nip" id="nip" class="control-sm" placeholder="masukan kode">
                    </div>
                    <div class="group-control">
                        <label for="">Nama</label>
                        <input type="text" name="nama" id="nama" class="control-sm" placeholder="masukan nama">
                    </div>
                    <div class="group-control">
                        <label for="">Divisi</label>
                        <select name="divisi" id="divisi" class="control-sm">
                            <option value="">-Pilih-</option>
                            <option value="pelayan">Pelayan</option>
                            <option value="kasir">Kasir</option>
                        </select>
                    </div>
                    <div class="group-control">
                        <label for="">Telepon</label>
                        <input type="tel" name="telepon" id="telepon" class="control-sm" placeholder="masukan telepon">
                    </div>
                    <div class="group-control">
                        <label for="">Email</label>
                        <input type="email" name="email" id="email" class="control-sm" placeholder="masukan email">
                    </div>
                    <div class="group-control">
                        <label for="">Alamat</label>
                        <textarea name="alamat" id="alamat" class="control-sm" cols="30" rows="10" placeholder="masukan alamat"></textarea>
                    </div>
                    <div class="group-control">
                        <button type="submit" class="btn btn-safe" name="button" id="button">Simpan</button>
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
                <form action="{{ url('DeletePegawai') }}" method="post">
                    @csrf
                    <div class="group-control ds-none">
                        <label for="">Id</label>
                        <input type="text" name="id" id="id-hapus" class="control-sm" placeholder="masukan kode">
                    </div>

                    <div class="txt-center">
                        Apakah anda yakin ingin menghapus pegawai <span id="nama-hapus"></span> ?
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
                <form action="{{ url('Statuspegawai') }}" method="post">
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
        document.getElementById('form').action = "{{ url('SavePegawai') }}"

        document.getElementById('nip').value = ""
        document.getElementById('nip').readonly = "off"

        document.getElementById('nama').value = ""

        document.getElementById('divisi').value = ""

        document.getElementById('telepon').value = ""

        document.getElementById('email').value = ""

        document.getElementById('alamat').innerHTML = ""

        document.getElementById('button').innerHTML = "Tambah"

        addCssWithId('form-tambah',{
            display:"block"
        })
    }

    function update(id){
        httpGetAsync("{{url('data-pegawai-select/')}}/"+id,function(response){
            let datapegawaiSelect = JSON.parse(response.responseText)

            document.getElementById('form').action = "{{ url('UpdatePegawai') }}"

            document.getElementById('nip').value = datapegawaiSelect[0].nip
            document.getElementById('nip').readonly = "on"

            document.getElementById('nama').value = datapegawaiSelect[0].nama

            document.getElementById('divisi').value = datapegawaiSelect[0].bagian

            document.getElementById('telepon').value = datapegawaiSelect[0].telepon

            document.getElementById('email').value = datapegawaiSelect[0].email

            document.getElementById('alamat').innerHTML = datapegawaiSelect[0].alamat

            document.getElementById('button').innerHTML = "Perbarui"


        });

        addCssWithId('form-tambah',{
            display:"block"
        })
    }

    function remove(id){
        httpGetAsync("{{url('data-pegawai-select/')}}/"+id,function(response){
            let datapegawaiSelect = JSON.parse(response.responseText)

            document.getElementById('id-hapus').value = datapegawaiSelect[0].id

            document.getElementById('nama-hapus').innerHTML = datapegawaiSelect[0].nama

        });

        addCssWithId('form-hapus',{
            display:"block"
        })
    }

    function status(id){
        httpGetAsync("{{url('data-pegawai-select/')}}/"+id,function(response){
            let datapegawaiSelect = JSON.parse(response.responseText)

            document.getElementById('id-status').value = datapegawaiSelect[0].id

            document.getElementById('nama-status').innerHTML = datapegawaiSelect[0].nama

            document.getElementById('jenis-status').innerHTML = datapegawaiSelect[0].jenis

        });

        addCssWithId('form-status',{
            display:"block"
        })
    }
</script>
@endsection