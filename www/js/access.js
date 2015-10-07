document.addEventListener("deviceready", function() {
// $(function(){

    $('#btn_register').on('click', function(e){
        e.preventDefault();

        GPSTaller.alert();

        var data = {
            nombre: $('#reg_firstname').val(),
            apellido: $('#reg_lastname').val(),
            mail: $('#reg_email').val(),
            contrasena: $('#reg_password').val(),
            contrasena2: $('#reg_passconf').val(),
            tyc: $('#reg_terms').is(':checked') ? '1' : '0'
        }

        GPSTaller.registro(data, function(data) {
            // GPSTaller.alertClose();
            if(data[0].status == 'ok') {
                GPSTaller.alert(data[0].mensaje, true);
                GPSTaller.visited = ['index'];
                GPSTaller.show('index');
            } else if (data[0].status == 'error') {
                GPSTaller.alert(data[0].mensaje, true);
            }
        });
    });

    $('#btn_login').on('click', function(e){
        e.preventDefault();

        GPSTaller.alert();

        var data = {
            mail: $('#login_email').val(),
            contrasena: $('#login_password').val()
        };

        GPSTaller.login(data, function(data){
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
                GPSTaller.alert(data[0].mensaje, true);
                $('#login_password').val('');
            }
        });
    });

    $('#btn_solicitarContrasena').on('click', function(e){
        e.preventDefault();

        GPSTaller.alert();

        data = {
            mail: $('#solicitar_email').val()
        };

        GPSTaller.solicitarContrasena(data, function(data){
            // GPSTaller.alertClose();
            $('#solicitarcontrasenia form')[0].reset();
            if (data[0].status == 'ok') {
                GPSTaller.alert(data[0].mensaje, true);
                GPSTaller.visited = ['index'];
                GPSTaller.show('index');
            } else {
                GPSTaller.alert(data[0].mensaje, true);
            }
        });
    });

    $('#btn_logout').on('click', function(e) {
        e.preventDefault();

        window.localStorage['user_email'] = null;
        GPSTaller.loggedUser = '';
        GPSTaller.visited = ['index'];
        $('[auth]').hide();
        $('[noauth]').show();
        $('#btn_historia').attr('nav', 'login');
        GPSTaller.show('index');
        $('input').val('');
        $('option').selected = false;
        $('input[type="checkbox"]').prop('checked', false);
        $('form').each(function(i, e) {
            e.reset();
        });
    });

});
