<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Simenu | Login</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- css -->
        <link rel="stylesheet" href="{{ URL::asset('public/css/cb-component.css') }}">
        <link rel="stylesheet" href="{{ URL::asset('public/css/cb-build.css') }}">
        <link rel="stylesheet" href="{{ URL::asset('public/css/icon.css') }}">
    </head>
    <body>
        <div class="pad-10px">
            <div class="col-40pc mg-auto bg-white pad-5px bd-shadow bd-radius-5px">
                <h2>Login</h2>

                <form action="{{ url('AksesLogin') }}" method="post" id="form">
                    @csrf
                    <div class="group-control">
                        <input type="text" name="username" id="username" class="control-sm" placeholder="Username">
                    </div>
                    <div class="group-control">
                        <input type="password" name="password" id="password" class="control-sm" placeholder="Password">
                    </div>
                    <div class="group-control">
                        <input type="checkbox" name="setuju" id=""> Setuju
                    </div>
                    
                    <div class="ds-flex group-control jc-end">
                        <button type="submit" class="btn btn-safe" name="button">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </body>

    <script src="{{ URL::asset('public/js/cb-component.js') }}"></script>
    <script src="{{ URL::asset('public/js/cb-build.js') }}"></script>
    @yield('js-custom')
    <script src="{{ URL::asset('public/js/cb-build-no-class.js') }}"></script>
</html>
