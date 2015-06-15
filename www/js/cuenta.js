GPSTaller.verPerfil = function() {
    $(".loader").fadeIn();

    $.ajax({
        url: GPSTaller.urls.data,
        type: 'get',
        dataType: 'json',
        data: {
            mail: window.localStorage['user_email'],
            hash: GPSTaller.hash
        },
        success: function(data) {
            $(".loader").fadeOut();
            // $('#perfil_ID').val() = data.usuario.ID;
            $('#perfil_titular').val(data.usuario.titular);
            $('#perfil_empresa').val(data.usuario.empresa);
            $('#perfil_email').val(data.usuario.email);
            $('#perfil_celular').val(data.usuario.celular);
            $('#perfil_telefono').val(data.usuario.telefono);
            $('#perfil_fechaNacimiento').val(data.usuario.fechaNacimiento);
            $('#perfil_domicilio').val(data.usuario.domicilio);
            $('#perfil_codigoPostal').val(data.usuario.CodigoPostal);
            $('#perfil_localidad').val(data.usuario.localidad);
            $('#perfil_partido').val(data.usuario.partido);
            $('#perfil_provincia').val(data.usuario.provincia);
            $('#perfil_cuit').val(data.usuario.cuit);
            $('#perfil_iva').val(data.usuario.iva);
            $('#perfil_horarioContacto').val(data.usuario.horarioContacto);
            $('#perfil_genero option[value="' + data.usuario.genero + '"]').prop('selected', true);
            $('#perfil_estadoCivil option[value="' + data.usuario.estadoCivil + '"]').prop('selected', true);
            $('#perfil_pagoSeguros option[value="' + data.usuario.pagoSeguros + '"]').prop('selected', true);

            if (data.vehiculos != '0') {
                $('#administracionTitle').show();
                $('#serviciosRegistrados').show();
                $.each(data.vehiculos, function(i, e){
                    var ibis = i++;
                    if (ibis == 1) { var activeString = "class=\"active\"" } else { var activeString = "" }
                    $('#dominiosRegistradosTabs').append("<li role=\"presentation\" " + activeString + "><a href=\"#dominio-" + ibis + "\" aria-controls=\"home\" role=\"tab\" data-toggle=\"tab\">" + e.dominio + "</a></li>");
                    $.each(e.servicios, function(i, e){
                        $('#dominiosRegistradosData').append("<div role=\"tabpanel\" class=\"tab-pane active\" id=\"dominio-" + ibis + "\"><div class=\"row ajuste-grid\"><div class=\"col-xs-6\"><p><strong>Marca:</strong> Alfa Romeo</p><p><strong>Año:</strong> 1950</p></div><div class=\"col-xs-6\"><p><strong>Modelo:</strong> 147</p></div></div><div class=\"row ajuste-grid\"><div class=\"col-xs-6\"><p><strong>Historia Clínica</strong> (Usuario).</p></div><div class=\"col-xs-6\"><a href=\"#\" class=\"link-nuevo-servicio\">Agregar nuevo servicio</a></div></div><div class=\"row content-background-listado\"><div class=\"col-xs-4\"><p>Fecha</p></div><div class=\"col-xs-4\"><p>Kilómetros</p></div><div class=\"col-xs-4\"><p>Servicio</p></div></div><div class=\"row content-background-listado descripciones\"><div class=\"col-xs-4\"><p>30/03/2015</p></div><div class=\"col-xs-4\"><p>15.000</p></div><div class=\"col-xs-4\"><p>Diagnostico por scanner</p><p>Relizado por: Taller Pepe</p></div></div><div class=\"row\"><div class=\"col-xs-6\"><button class=\"btn btn-gps btn-reducido center-block btn-registrarme btn_desvincularDominio\">Desvincular <br>dominio</button></div><div class=\"col-xs-6\"><button class=\"btn btn-gps btn-reducido center-block btn-registrarme btn_cambioDatos\">Solicitar <br>Cambio de Datos</button></div></div></div>");
                    });
                });
            }
        }
    });
}

$(function(){

    $('#btn_guardar_perfil').on('click', function(e){
        e.preventDefault();

        $(".loader").fadeIn();

        var data = {
            // fechaNacimiento: $('#perfil_fechaNacimiento').val(),
            mail: $('#perfil_email').val(),
            empresa: $('#perfil_empresa').val(),
            celular: $('#perfil_celular').val(),
            telefono: $('#perfil_telefono').val(),
            horarioContacto: $('#perfil_horarioContacto').val(),
            cuit: $('#perfil_cuit').val(),
            condIva: $('#perfil_iva').val(),
            domicilio: $('#perfil_domicilio').val(),
            codigoPostal: $('#perfil_codigoPostal').val(),
            localidad: $('#perfil_localidad').val(),
            genero: $('#perfil_genero').val(),
            estadoCivil: $('#perfil_estadoCivil').val(),
            pagoSeguros: $('#perfil_pagoSeguros').val()
        };

        GPSTaller.editarPerfil(data, function (data) {
            $(".loader").fadeOut();
            switch(data.cambioPerfil) {
                case 0:
                    alert('Error de conexión');
                    break;
                case 1:
                    alert('Fecha de nacimiento inválida');
                    break;
                case 2:
                    alert('El formato de la empresa es incorrecto');
                    break;
                case 3:
                    alert('El formato del celular es incorrecto');
                    break;
                case 4:
                    alert('El formato del teléfono es incorrecto');
                    break;
                case 5:
                    alert('El formato del horario de contacto es incorrecto');
                    break;
                case 6:
                    alert('El formato del CUIT es incorrecto');
                    break;
                case 7:
                    alert('Error en la condición de IVA');
                    break;
                case 8:
                    alert('El formato del domicilio es incorrecto');
                    break;
                case 9:
                    alert('El formato del código postal es incorrecto');
                    break;
                case 10:
                    alert('Error en la localidad');
                    break;
                case 11:
                    alert('Error en el género');
                    break;
                case 12:
                    alert('Error en el estado civil');
                    break;
                case 13:
                    alert('Error en la forma de pago');
                    break;
                case 14:
                    alert('Datos guardados correctamente');
                    GPSTaller.show('index');
                    break;
            }
        });
    });

});
