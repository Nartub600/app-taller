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
            switch (data.register) {
                case 0:
                    alert('Error de conexión');
                    break;
                case 1:
                    alert('Complete el email');
                    break;
                case 2:
                    alert('Complete la contraseña');
                    break;
                case 3:
                    alert('No coinciden las contraseñas');
                    break;
                case 4:
                    alert('Complete el nombre');
                    break;
                case 5:
                    alert('Complete el apellido');
                    break;
                case 6:
                    alert('Debe aceptar los términos y condiciones');
                    break;
                case 7:
                    alert('El formato del email es inválido');
                    break;
                case 8:
                    alert('El formato de la contraseña es inválido');
                    break;
                case 9:
                    alert('El formato del nombre es inválido');
                    break;
                case 10:
                    alert('El formato del apellido es inválido');
                    break;
                case 11:
                    alert('El email ya fue registrado pero no fue activado');
                    break;
                case 12:
                    alert('El email ya fue registrado y fue activado');
                    break;
                case 13:
                    alert('Registro exitoso, se envió un mail para la activación');
                    GPSTaller.visited = ['index'];
                    GPSTaller.show('index');
                    break;
                }
            }
        );
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

        GPSTaller.solicitar(data, function(data){
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
