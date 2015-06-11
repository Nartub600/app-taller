$(function(){

    $('#btn_guardar_perfil').on('click', function(e){
        e.preventDefault();

        $(".loader").fadeIn();

        var data = {
            fechaNacimiento: $('#perfil_fechaNacimiento').val(),
            empresa: $('#perfil_empresa').val(),
            celular: $('#perfil_celular').val(),
            telefono: $('#perfil_telefono').val(),
            horarioContacto: $('#perfil_horarioContacto').val(),
            cuit: $('#perfil_cuit').val(),
            condIva: $('#perfil_condIva').val(),
            domicilio: $('#perfil_domicilio').val(),
            codigoPostal: $('#perfil_codigoPostal').val(),
            localidad: $('#perfil_provincia').val() + ' ' + $('#perfil_partido').val() + ' ' + $('#perfil_localidad').val(),
            genero: $('#perfil_genero').val(),
            estadoCivil: $('#perfil_estadoCivil').val(),
            pagoSeguros: $('#perfil_pagoSeguros'.val()
        };

        // GPSTaller.editarPerfil(data, function (data) {
        //     $(".loader").fadeOut();
        //     switch(data.cambioPerfil) {
        //         case 1:
        //             alert('Fecha de nacimiento inválida');
        //             break;
        //         case 2:
        //             alert('El formato de la empresa es incorrecto');
        //             break;
        //         case 3:
        //             alert('El formato del celular es incorrecto');
        //             break;
        //         case 4:
        //             alert('El formato del teléfono es incorrecto');
        //             break;
        //         case 5:
        //             alert('El formato del horario de contacto es incorrecto');
        //             break;
        //         case 6:
        //             alert('El formato del CUIT es incorrecto');
        //             break;
        //         case 7:
        //             alert('Error en la condición de IVA');
        //             break;
        //         case 8:
        //             alert('El formato del domicilio es incorrecto');
        //             break;
        //         case 9:
        //             alert('El formato del código postal es incorrecto');
        //             break;
        //         case 10:
        //             alert('Error en la localidad');
        //             break;
        //         case 11:
        //             alert('Error en el género');
        //             break;
        //         case 12:
        //             alert('Error en el estado civil');
        //             break;
        //         case 13:
        //             alert('Error en la forma de pago');
        //             break;
        //         case 14:
        //             alert('Datos guardados correctamente');
        //             GPSTaller.show('index');
        //             break;
        //     }
        // });
    });

});
