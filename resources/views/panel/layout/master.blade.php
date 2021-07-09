<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Simenu | @yield('title')</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- css -->
        <link rel="stylesheet" href="{{ URL::asset('public/css/cb-component.css') }}">
        <link rel="stylesheet" href="{{ URL::asset('public/css/cb-build.css') }}">
        <link rel="stylesheet" href="{{ URL::asset('public/css/icon.css') }}">
    </head>
    <body>
        <!-- navigasi -->
        <nav class="navigation-side nav-dark col-20pc">
            <div class="navigation-brand">
                <div class="navigation-img">
                    <img src="" alt="" class="img">
                </div>
            </div>
            <div class="navigation-menu">
                <div>
                    <a href="{{ url('Panel/') }}"> <span></span> Dashboard</a>
                </div>
                <div>
                    <a href="{{ url('Panel/Pegawai/') }}"> <span></span> Pegawai</a>
                </div>
                <div>
                    <a href="{{ url('Panel/Makanan/') }}"> <span></span> Makanan</a>
                </div>
                <div>
                    <a href="{{ url('Panel/Pesanan/') }}"> <span></span> Pesanan</a>
                </div>
                <div>
                    <a href="{{ url('Panel/Transaksi/') }}"> <span></span> Transaksi</a>
                </div>
            </div>
        </nav>

        <div class="offset-20pc">
            <nav class="navigation-top nav-dark jc-end">
                <div>
                    <span class="icn-medium 1"></span>

                    <div class="sub-navigation-top-1 nav-dark">
                        <div><a href=""><span class="icn-medium 68"></span> User Profile</a></div>
                        <div class="note" note-in="form-logout"><span class="icn-medium 13"></span> Log Out</div>
                    </div>
                </div>
            </nav>

            <div class="pad-10px">
                @yield('content')
            </div>
        </div>
    </body>

    <div class="greater col-40pc bg-white" id="form-logout">
        <div class="boundary pad-10px">
            <div>
                <h3>Status Data</h3>
            </div>
            <div class="pad-5px">
                <div class="txt-center">
                    Apakah anda yakin ingin keluar ?
                    
                </div>
                <div class="ds-flex">
                    <div>
                        <button type="button" class="btn btn-warning" name="button" onclick="onLocation('{{ url('AksesLogout') }}')">Iya</button>
                        <button type="button" class="btn btn-danger" name="button" onclick="">Tidak</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @yield('form')

    <script src="{{ URL::asset('public/js/cb-component.js') }}"></script>
    <script src="{{ URL::asset('public/js/cb-build.js') }}"></script>
    <script src="{{ URL::asset('public/js/icon.js') }}"></script>
    @yield('js-custom')
    <script src="{{ URL::asset('public/js/cb-build-no-class.js') }}"></script>
</html>
