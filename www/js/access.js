$(function(){

    $('#btn_register').on('click', function(e){
        e.preventDefault();

        GPSTaller.registro($('#reg_email').val(), $('#reg_firstname').val(), $('#reg_lastname').val(), $('#reg_password').val(), function(data){
            alert(data);
        });
    });

    $('#btn_login').on('click', function(e){
        e.preventDefault();

        var email = $('#login_email').val();

        GPSTaller.login(email, $('#login_password').val(), function(data){
            switch(data.login) {
                case 1:
                    alert('Complete el email');
                    break;
                case 2:
                    alert('Complete la contraseña');
                    break;
                case 3:
                    alert('El email es inválido');
                    break;
                case 4:
                    alert('No existe un usuario con esa dirección');
                    break;
                case 5:
                    alert('El usuario todavía no está activado');
                    break;
                case 6:
                    alert('La contraseña es incorrecta');
                    break;
                case 7:
                    alert('El ingreso está bloqueado por reiterados intentos fallidos');
                    break;
                case 10:
                    alert('Usuario logueado');
                    GPSTaller.logged = email;
                    GPSTaller.show('index');
                    break;
            }
        });
    });

});
