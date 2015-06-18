GPSTaller.verPerfil = function() {
    $(".loader").fadeIn();

    $('#dominiosRegistradosTabs').html('');
    $('#dominiosRegistradosData').html('');

    $.ajax({
        url: GPSTaller.urls.data,
        type: 'get',
        dataType: 'json',
        data: {
            mail: GPSTaller.loggedUser,
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
                    var ibis = i + 1;
                    if (ibis == 1) { var activeString = 'active' } else { var activeString = '' }

                    $('#dominiosRegistradosTabs').append("<li role=\"presentation\" class=\"" + activeString + "\"><a href=\"#dominio-" + ibis + "\" aria-controls=\"home\" role=\"tab\" data-toggle=\"tab\">" + e.dominio + "</a></li>");
                    $('#serviciosRegistradosTabs').append("<li role=\"presentation\" class=\"" + activeString + "\"><a href=\"#taller-" + ibis + "\" aria-controls=\"home\" role=\"tab\" data-toggle=\"tab\">" + e.dominio + "</a></li>")

                    $('#dominiosRegistradosData').append("<div role=\"tabpanel\" class=\"tab-pane " + activeString + "\" id=\"dominio-" + ibis + "\"></div>");
                    $('#serviciosRegistradosData').append("<div role=\"tabpanel\" class=\"tab-pane " + activeString + "\" id=\"taller-" + ibis + "\"></div>");

                    $('#dominio-' + ibis).append("<div class=\"row ajuste-grid\"><div class=\"col-xs-6\"><p><strong>Marca:</strong> " + e.marca + "</p><p><strong>Año:</strong> " + e.ano + "</p></div><div class=\"col-xs-6\"><p><strong>Modelo:</strong> " + e.modelo + "</p></div></div><div class=\"row ajuste-grid\"><div class=\"col-xs-6\"><p><strong>Historia Clínica</strong> (Usuario).</p></div><div class=\"col-xs-6\"><a href=\"#\" class=\"link-nuevo-servicio\">Agregar nuevo servicio</a></div></div>");
                    $('#taller-' + ibis).append("<div class=\"row ajuste-grid\"><div class=\"col-xs-6\"><p><strong>Marca:</strong> " + e.marca + "</p><p><strong>Año:</strong> " + e.ano + "</p></div><div class=\"col-xs-6\"><p><strong>Modelo:</strong> " + e.modelo + "</p></div></div><div class=\"row ajuste-grid\"><div class=\"col-xs-6\"><p><strong>Historia Clínica</strong> (Taller).</p></div><div class=\"col-xs-6\"><a href=\"#\" class=\"link-nuevo-servicio\">Agregar nuevo servicio</a></div></div>");

                    if(e.servicios != '0') {
                        $.each(e.servicios, function(i, e){
                            if(e.tipo == 'usuario') {
                                $('#dominio-' + ibis).append("<div class=\"row content-background-listado\"><div class=\"col-xs-4\"><p>Fecha</p></div><div class=\"col-xs-4\"><p>Kilómetros</p></div><div class=\"col-xs-4\"><p>Servicio</p></div></div><div class=\"row content-background-listado descripciones\"><div class=\"col-xs-4\"><p>" + e.fecha + "</p></div><div class=\"col-xs-4\"><p>" + e.kilometros + "</p></div><div class=\"col-xs-4\"><p>" + e.servicioTipo + "</p><p>Relizado por: " + e.servicioRealizadoPor + "</p></div></div>");
                            } else if(e.tipo == 'taller') {
                                $('#taller-' + ibis).append("<div class=\"row content-background-listado\"><div class=\"col-xs-4\"><p>Fecha</p></div><div class=\"col-xs-4\"><p>Kilómetros</p></div><div class=\"col-xs-4\"><p>Servicio</p></div></div><div class=\"row content-background-listado descripciones\"><div class=\"col-xs-4\"><p>" + e.fecha + "</p></div><div class=\"col-xs-4\"><p>" + e.kilometros + "</p></div><div class=\"col-xs-4\"><p>" + e.servicioTipo + "</p><p>Relizado por: " + e.servicioRealizadoPor + "</p></div></div>");
                            }
                        });
                    }

                    $('#dominio-' + ibis).append("<div class=\"row\"><div class=\"col-xs-6\"><button nav=\"desvincular-vehiculo\" data-dominio=\"" + e.dominio + "\" class=\"btn btn-gps btn-reducido center-block btn-registrarme btn_desvincularDominio\">Desvincular <br>dominio</button></div><div class=\"col-xs-6\"><button nav=\"solicitar-cambios\" data-dominio=\"" + e.dominio + "\" class=\"btn btn-gps btn-reducido center-block btn-registrarme btn_cambioDatos\">Solicitar <br>Cambio de Datos</button></div></div>");

                });
            }
        }
    });
}

document.addEventListener("deviceready", function() {
// $(function(){

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

    $('#btn_asociar_vehiculo').on('click', function(e){
        e.preventDefault();

        $(".loader").fadeIn();

        var data = {
            mail: GPSTaller.loggedUser,
            dominio: $('#asociar_dominio').val(),
            ano: $('#asociar_ano').val(),
            color: $('#asociar_color').val(),
            vin: $('#asociar_vin').val(),
            motor: $('#asociar_motor').val(),
            chasis: $('#asociar_chasis').val(),
            marca: $('#asociar_marca').val(),
            modelo: $('#asociar_modelo').val(),
            version: $('#asociar_version').val(),
            gnc: $('#asociar_gnc').val(),
            dispositivoRecupero: $('#asociar_dispositivoRecupero').val()
        };

        GPSTaller.asociarVehiculo(data, function(data){
            $(".loader").fadeOut();
            switch (data.nuevoVehiculo) {
                case 0:
                    alert('Error de conexion o hash incorrecto');
                    break;
                case 1:
                    alert('Dominio inválido o vacio');
                    break;
                case 2:
                    alert('Año inválido o vacio');
                    break;
                case 3:
                    alert('Color inválido');
                    break;
                case 4:
                    alert('Vin inválido');
                    break;
                case 5:
                    alert('Motor inválido');
                    break;
                case 6:
                    alert('Chasis inválido');
                    break;
                case 7:
                    alert('Marca inválido o vacio');
                    break;
                case 8:
                    alert('Modelo inválido o vacio');
                    break;
                case 9:
                    alert('Versión inválido o vacio');
                    break;
                case 10:
                    alert('Gnc inválido');
                    break;
                case 11:
                    alert('Dispositivo de recupero inválido');
                    break;
                case 12:
                    alert('El dominio ya estaba vinculado a su cuenta');
                    break;
                case 13:
                    alert('Dominio ya se encuentra registrado a nombre de otra persona');
                    break;
                case 14:
                    alert('Dominio ya se encuentra registrado pero fue desvinculado');
                    break;
                case 15:
                    alert('Dominio guardado');
                    GPSTaller.show('panel-administracion');
                    break;
            }
        });
    });

    $('#btn_cancelar_asociar_vehiculo').on('click', function(e){
        e.preventDefault();

        $('#btn_volver').trigger('click');
    });

});
