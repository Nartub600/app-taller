document.addEventListener("deviceready", function() {
// $(function(){

    $('#btn_register').on('click', function(e){
        e.preventDefault();

        $(".loader").fadeIn();

        var data = {
            nombre: $('#reg_firstname').val(),
            apellido: $('#reg_lastname').val(),
            mail: $('#reg_email').val(),
            contrasena: $('#reg_password').val(),
            contrasena2: $('#reg_passconf').val(),
            tyc: $('#reg_terms').is(':checked') ? '1' : '0'
        }

        GPSTaller.registro(data, function(data) {
            $(".loader").fadeOut();
            if(data[0].status == 'ok') {
                alert(data[0].mensaje);
                GPSTaller.visited = ['index'];
                GPSTaller.show('index');
            } else {
                alert(data[0].mensaje);
            }
        });
    });

    $('#btn_login').on('click', function(e){
        e.preventDefault();

        $(".loader").fadeIn();

        var data = {
            mail: $('#login_email').val(),
            contrasena: $('#login_password').val()
        };

        GPSTaller.login(data, function(data){
            $(".loader").fadeOut();
            window.localStorage['user_email'] = undefined;
            if (data[0].status == 'ok' || data[0].code == 200) {
                // rutina de login
                GPSTaller.loggedUser = $('#login_email').val();
                $('#btn_historia').attr('nav', 'panel-administracion');
                if ($('#login_remember').is(':checked')) {
                    window.localStorage['user_email'] = $('#login_email').val();
                }
                $('[auth]').show();
                $('[noauth]').hide();
                GPSTaller.visited = ['index', 'panel-administracion'];
                GPSTaller.show('panel-administracion');
            } else if (data[0].status == 'error') {
                alert(data[0].mensaje);
            }
        });
    });

    $('#btn_solicitarContrasena').on('click', function(e){
        e.preventDefault();

        $(".loader").fadeIn();

        data = {
            mail: $('#solicitar_email').val()
        };

        GPSTaller.solicitarContrasena(data, function(data){
            $(".loader").fadeOut();
            if (data[0].status == 'ok') {
                alert(data[0].mensaje);
                GPSTaller.visited = ['index'];
                GPSTaller.show('index');
            } else {
                alert(data[0].mensaje);
            }
        });
    });

    $('#btn_logout').on('click', function(e) {
        e.preventDefault();

        window.localStorage['user_email'] = null;
        GPSTaller.visited = ['index'];
        $('[auth]').hide();
        $('[noauth]').show();
        $('#btn_historia').attr('nav', 'login');
        $('input').val('');
        $('option').selected = false;
        GPSTaller.show('index');
    });

});
