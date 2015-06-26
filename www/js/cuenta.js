GPSTaller.verPerfil = function() {
    $(".loader").fadeIn();

    $('#frm_perfil input').val('');
    $('#frm_perfil select option').prop('selected', false);

    $('#perfil_partido').html('<option value="">Partido</option>').prop('disabled', true);
    $('#perfil_localidad').html('<option value="">Localidad</option>').prop('disabled', true);

    $('#dominiosRegistradosTabs').html('');
    $('#dominiosRegistradosData').html('');
    $('#serviciosRegistradosTabs').html('');
    $('#serviciosRegistradosData').html('');
    $('#serviciosRegistrados').hide();

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

            var fechaNacimiento = data.usuario.fechaNacimiento.split('-');
            $('#perfil_fechaDia').val(fechaNacimiento[0]);
            $('#perfil_fechaMes').val(fechaNacimiento[1]);
            $('#perfil_fechaAno').val(fechaNacimiento[2]);

            $('#perfil_domicilio').val(data.usuario.domicilio);
            $('#perfil_codigoPostal').val(data.usuario.CodigoPostal);

            if (data.usuario.provinciaID != '') {
                $('#perfil_provincia option[value="' + data.usuario.provinciaID + '"]').prop('selected', true);
            } else {
                $('#perfil_provincia').prop('disabled', false);
            }

            $('#perfil_partido').html('<option value="' + data.usuario.partidoID + '">' + data.usuario.partido + '</option>');
            // $('#perfil_partido option[value="' + data.usuario.partidoID + '"]').prop('selected', true);
            // if(data.usuario.partidoID != '') {
            //     $('#perfil_partido').prop('disabled', false);
            // }
            $('#perfil_localidad').html('<option value="' + data.usuario.localidadID + '">' + data.usuario.localidad + '</option>');
            // $('#perfil_localidad option[value="' + data.usuario.localidadID + '"]').prop('selected', true);
            // if(data.usuario.localidadID) {
            //     $('#perfil_localidad').prop('disabled', false);
            // }

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

                    $('#dominio-' + ibis).append("<div class=\"row ajuste-grid\"><div class=\"col-xs-6\"><p><strong>Marca:</strong> " + e.marca + "</p><p><strong>Año:</strong> " + e.ano + "</p></div><div class=\"col-xs-6\"><p><strong>Modelo:</strong> " + e.modelo + "</p></div></div><div class=\"row ajuste-grid\"><div class=\"col-xs-6\"><p><strong>Historia Clínica</strong> (Usuario).</p></div><div class=\"col-xs-6\"><a nav=\"ingresar-servicio\" data-dominio=\"" + e.dominio + "\" href=\"#\" class=\"link-nuevo-servicio\">Agregar nuevo servicio</a></div></div>");
                    $('#taller-' + ibis).append("<div class=\"row ajuste-grid\"><div class=\"col-xs-6\"><p><strong>Marca:</strong> " + e.marca + "</p><p><strong>Año:</strong> " + e.ano + "</p></div><div class=\"col-xs-6\"><p><strong>Modelo:</strong> " + e.modelo + "</p></div></div><div class=\"row ajuste-grid\"><div class=\"col-xs-6\"><p><strong>Historia Clínica</strong> (Taller).</p></div><div class=\"col-xs-6\"><a nav=\"ingresar-servicio\" data-dominio=\"" + e.dominio + "\" href=\"#\" class=\"link-nuevo-servicio\">Agregar nuevo servicio</a></div></div>");

                    if(e.servicios != '0') {
                        $.each(e.servicios, function(i, e){
                            if(e.tipo == 'usuario') {
                                $('#dominio-' + ibis).append("<div class=\"row content-background-listado\"><div class=\"col-xs-4\"><p>Fecha</p></div><div class=\"col-xs-4\"><p>Kilómetros</p></div><div class=\"col-xs-4\"><p>Servicio</p></div></div><div class=\"row content-background-listado descripciones\"><div class=\"col-xs-4\"><p>" + e.fecha + "</p></div><div class=\"col-xs-4\"><p>" + e.kilometros + "</p></div><div class=\"col-xs-4\"><p>" + e.servicioTipo + "</p><p>Relizado por: " + e.servicioRealizadoPor + "</p></div></div>");
                            } else if(e.tipo == 'taller') {
                                $('#taller-' + ibis).append("<div class=\"row content-background-listado\"><div class=\"col-xs-4\"><p>Fecha</p></div><div class=\"col-xs-4\"><p>Kilómetros</p></div><div class=\"col-xs-4\"><p>Servicio</p></div></div><div class=\"row content-background-listado descripciones\"><div class=\"col-xs-4\"><p>" + e.fecha + "</p></div><div class=\"col-xs-4\"><p>" + e.kilometros + "</p></div><div class=\"col-xs-4\"><p>" + e.servicioTipo + "</p><p>Relizado por: " + e.servicioRealizadoPor + "</p></div></div>");
                            }
                        });
                    }

                    $('#dominio-' + ibis).append("<div class=\"row\"><div class=\"col-xs-6\"><button data-dominio=\"" + e.dominio + "\" nav=\"desvincular-vehiculo\" class=\"btn btn-gps btn-reducido center-block btn-registrarme btn_desvincularDominio\">Desvincular <br>dominio</button></div><div class=\"col-xs-6\"><button nav=\"solicitar-cambios\" data-dominio=\"" + e.dominio + "\" class=\"btn btn-gps btn-reducido center-block btn-registrarme btn_cambioDatos\">Solicitar <br>Cambio de Datos</button></div></div>");

                });
            }
        }
    });
}

GPSTaller.verAsociar = function() {
    $('#asociar-dominio form input').val('');
    $('#asociar-dominio form select option [value=""]').prop('selected', true);
}

GPSTaller.verDesvincularDominio = function(data) {
    $('#desvincular_dominio').text('');
    $('#desvincular_dominio').text(data.dominio);
    $('#desvincular_mensaje').val('');

}

GPSTaller.verIngresarServicio = function(data) {
    $('#ingresar_dominio').text('');
    $('#ingresar_dominio').text(data.dominio);
}

GPSTaller.verSolicitarCambios = function(data) {
    $('#solicitar_mensaje').val('');
    $('#solicitar_dominio').val('');
    $('#solicitar_dominio').val(data.dominio);
}

document.addEventListener("deviceready", function() {
// $(function(){

    $('#btn_guardarPerfil').on('click', function(e){
        e.preventDefault();

        $(".loader").fadeIn();

        var data = {
            fechaNacimiento: $('#perfil_fechaDia').val() + '-' + $('#perfil_fechaMes').val() + '-' + $('#perfil_fechaAno').val(),
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
            if (data[0].status == 'ok') {
                alert(data[0].mensaje);
                GPSTaller.show('index');
            } else {
                alert(data[0].mensaje);
            }
        });
    });

    $('#btn_asociarVehiculo').on('click', function(e){
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
            if (data[0].status == 'ok') {
                alert(data[0].mensaje);
                GPSTaller.show('panel-administracion');
            } else if (data[0].status == 'error') {
                alert(data[0].mensaje);
            }
        });
    });

    $('#btn_desvincular').on('click', function(e){
        e.preventDefault();

        $(".loader").fadeIn();

        var data = {
            mail: GPSTaller.loggedUser,
            dominio: $('#desvincular_dominio').text(),

        };

        GPSTaller.desvincularVehiculo(data, function(data){
            $(".loader").fadeOut();
            if (data[0].status == 'ok') {
                alert(data[0].mensaje);
                GPSTaller.show('panel-administracion');
            } else if (data[0].status == 'error') {
                alert(data[0].mensaje);
            }
        });
    });

    $('#btn_ingresarServicio').on('click', function(e){
        e.preventDefault();

        $(".loader").fadeIn();

        var data = {
            mail: GPSTaller.loggedUser,
            dominio: $('#ingresar_dominio').text(),
            km: $('#ingresar_km').val(),
            fecha: $('#ingresar_dia').val() + '-' + $('#ingresar_mes').val() + '-' + $('#ingresar_ano').val(),
            tipoServicio: $('#ingresar_tipoServicio').val(),
            detalle: $('#ingresar_detalle').val(),
            realizadoPor: $('#ingresar_realizadoPor').val()
        };

        GPSTaller.ingresarServicio(data, function(data){
            $(".loader").fadeOut();
            if(data[0].status == 'ok') {
                alert(data[0].mensaje);
                GPSTaller.show('panel-administracion');
            } else {
                alert(data[0].mensaje);
            }
        });
    });

    $('#btn_solicitarCambios').on('click', function(e){
        e.preventDefault();

        $(".loader").fadeIn();

        var data = {
            mail: GPSTaller.loggedUser,
            dominio: $('#solicitar_dominio').val(),
            mensaje: $('#solicitar_mensaje').val()
        };

        GPSTaller.solicitarCambios(data, function(data){
            $(".loader").fadeOut();
            if(data[0].status == 'ok') {
                alert(data[0].mensaje);
                GPSTaller.show('panel-administracion');
            } else {
                alert(data[0].mensaje);
            }
        });
    });

    $('#btn_cancelarAsociar, #btn_cancelarDesvincular, #btn_cancelarIngresar, #btn_cancelarSolicitar').on('click', function(e){
        e.preventDefault();

        $('#btn_volver').trigger('click');
    });

});
