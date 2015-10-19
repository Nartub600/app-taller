GPSTaller.verPerfil = function() {

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
        beforeSend: function() {
            if (!$('#mensajeroModal').is(':visible')) {
                GPSTaller.alert();
            }
        },
        success: function(data) {
            GPSTaller.alertClose();
            // $('#perfil_ID').val() = data.usuario.ID;
            $('#perfil_titular').val(data.usuario.titular);
            $('#perfil_empresa').val(data.usuario.empresa);
            $('#perfil_email').val(data.usuario.email);
            $('#perfil_celular').val(data.usuario.celular);
            $('#perfil_telefono').val(data.usuario.telefono);

            $('#perfil_fechaNacimiento').val(data.usuario.fechaNacimiento);
            var fecha = data.usuario.fechaNacimiento.split('-');
            $('#perfil_fechaNacimientoReal').val(fecha[2] + '-' + fecha[1] + '-' + fecha[0]);

            $('#perfil_domicilio').val(data.usuario.domicilio);
            $('#perfil_codigoPostal').val(data.usuario.codigoPostal);

            if (data.usuario.provinciaID == '' || data.usuario.provinciaID == null || data.usuario.provinciaID == '0') {
                $('#perfil_provincia').prop('disabled', false);
            } else {
                $('#perfil_provincia option[value="' + data.usuario.provinciaID + '"]').prop('selected', true);
                $('#perfil_provincia').trigger('change');

                if (data.usuario.partidoID == '' || data.usuario.partidoID == null || data.usuario.partidoID == '0') {
                    // $('#perfil_partido option').first().prop('selected', true);
                } else {
                    $('#perfil_partido').html('<option value="' + data.usuario.partidoID + '">' + data.usuario.partido + '</option>').prop('disabled', false);
                    $('#perfil_partido').trigger('change');

                    if (data.usuario.localidadID == '' || data.usuario.localidadID != null || data.usuario.localidadID == '0') {
                        // $('#perfil_localidad option').first().prop('selected', true);
                    } else {
                        $('#perfil_localidad').html('<option value="' + data.usuario.localidadID + '">' + data.usuario.localidad + '</option>').prop('disabled', false);
                    }
                }
            }

            // $('#perfil_partido option[value="' + data.usuario.partidoID + '"]').prop('selected', true);
            // if(data.usuario.partidoID != '') {
            //     $('#perfil_partido').prop('disabled', false);
            // }

            // $('#perfil_localidad option[value="' + data.usuario.localidadID + '"]').prop('selected', true);
            // if(data.usuario.localidadID) {
            //     $('#perfil_localidad').prop('disabled', false);
            // }

            $('#perfil_cuit').val(data.usuario.cuit);
            $('#perfil_iva option[value="' + data.usuario.condicionIva + '"]').prop('selected', true);
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

                    $('#dominio-' + ibis).append("<div class=\"row ajuste-grid\"><div class=\"col-xs-6\"><p><strong>Marca:</strong> " + e.marca + "</p><p><strong>Año:</strong> " + e.ano + "</p></div><div class=\"col-xs-6\"><p><strong>Versión:</strong> " + e.version + "</p><p><strong>Modelo:</strong> " + e.modelo + "</p></div></div><div class=\"row ajuste-grid\"><div class=\"col-xs-6\"><p><strong>Color:</strong> " + e.color + "</p><p><strong>VIN:</strong> " + e.vin + "</p></div><div class=\"col-xs-6\"><p><strong>Motor:</strong> " + e.motor + "</p><p><strong>Chasis:</strong> " + e.chasis + "</p></div></div><div class=\"row ajuste-grid\"><div class=\"col-xs-6\"><p><strong>Combustible:</strong> " + e.combustible + "</p></div><div class=\"col-xs-6\"><p><strong>Recupero:</strong> " + e.dispositivoRecupero + "</p></div></div> <div class=\"row ajuste-grid\"><div class=\"col-xs-6\"><p><strong>Historia Clínica</strong> (Usuario)</p></div><div class=\"col-xs-6\"><a nav=\"ingresar-servicio\" data-dominio=\"" + e.dominio + "\" href=\"#\" class=\"link-nuevo-servicio\">Agregar nuevo servicio</a></div></div>");
                    $('#taller-' + ibis).append("<div class=\"row ajuste-grid\"><div class=\"col-xs-6\"><p><strong>Marca:</strong> " + e.marca + "</p><p><strong>Año:</strong> " + e.ano + "</p></div><div class=\"col-xs-6\"><p><strong>Versión:</strong> " + e.version + "</p><p><strong>Modelo:</strong> " + e.modelo + "</p></div></div><div class=\"row ajuste-grid\"><div class=\"col-xs-6\"><p><strong>Color:</strong> " + e.color + "</p><p><strong>VIN:</strong> " + e.vin + "</p></div><div class=\"col-xs-6\"><p><strong>Motor:</strong> " + e.motor + "</p><p><strong>Chasis:</strong> " + e.chasis + "</p></div></div><div class=\"row ajuste-grid\"><div class=\"col-xs-6\"><p><strong>Combustible:</strong> " + e.combustible + "</p></div><div class=\"col-xs-6\"><p><strong>Recupero:</strong> " + e.dispositivoRecupero + "</p></div></div> <div class=\"row ajuste-grid\"><div class=\"col-xs-6\"><p><strong>Historia Clínica</strong> (Taller)</p></div><div class=\"col-xs-6\"><a nav=\"ingresar-servicio\" data-dominio=\"" + e.dominio + "\" href=\"#\" class=\"link-nuevo-servicio\">Agregar nuevo servicio</a></div></div>");

                    var countusuario = 0;
                    var counttaller = 0;

                    if(e.servicios != '0') {
                        $.each(e.servicios, function(i, e){
                            if(e.tipo == 'usuario') {
                                countusuario = countusuario + 1;
                                if(countusuario == 1) {
                                    $('#dominio-' + ibis).append("<div class=\"row content-background-listado\"><div class=\"col-xs-4\"><p>Fecha</p></div><div class=\"col-xs-4\"><p>Kilómetros</p></div><div class=\"col-xs-4\"><p>Servicio</p></div></div>");
                                }
                                $('#dominio-' + ibis).append("<div class=\"row content-background-listado descripciones\"><div class=\"col-xs-4\"><p>" + e.fecha + "</p></div><div class=\"col-xs-4\"><p>" + e.kilometros + "</p></div><div class=\"col-xs-4\"><p>" + e.servicioTipo + "</p><p>Relizado por: " + e.servicioRealizadoPor + "</p></div></div>");
                            } else if(e.tipo == 'taller') {
                                counttaller = counttaller + 1;
                                if(counttaller == 1) {
                                    $('#taller-' + ibis).append("<div class=\"row content-background-listado\"><div class=\"col-xs-4\"><p>Fecha</p></div><div class=\"col-xs-4\"><p>Kilómetros</p></div><div class=\"col-xs-4\"><p>Servicio</p></div></div>");
                                }
                                $('#taller-' + ibis).append("<div class=\"row content-background-listado descripciones\"><div class=\"col-xs-4\"><p>" + e.fecha + "</p></div><div class=\"col-xs-4\"><p>" + e.kilometros + "</p></div><div class=\"col-xs-4\"><p>" + e.servicioTipo + "</p><p>Relizado por: " + e.servicioRealizadoPor + "</p></div></div>");
                            }
                        });
                    }

                    $('#dominio-' + ibis).append("<div class=\"row\"><div class=\"col-xs-6\"><button data-dominio=\"" + e.dominio + "\" nav=\"desvincular-vehiculo\" class=\"btn btn-gps btn-reducido center-block btn-registrarme btn_desvincularDominio\">Desvincular <br>dominio</button></div><div class=\"col-xs-6\"><button nav=\"solicitar-cambios\" data-dominio=\"" + e.dominio + "\" class=\"btn btn-gps btn-reducido center-block btn-registrarme btn_cambioDatos\">Solicitar <br>Cambio de Datos</button></div></div>");

                });
            }
        }
    });
}

GPSTaller.verRegistro = function() {
    $('#registro form')[0].reset();
}

GPSTaller.verLogin = function() {
    $('#login form')[0].reset();
}

GPSTaller.verAsociar = function() {
    $('#asociar-dominio form')[0].reset();
    $('#asociar_modelo').html('<option value="">Modelo*</option>').prop('disabled', true);
    $('#asociar_version').html('<option value="">Versión*</option>').prop('disabled', true);
}

GPSTaller.verDesvincularDominio = function(data) {
    // $('#desvincular_dominio').text('');
    $('#desvincular_dominio').text(data.dominio);
    $('#desvincular-vehiculo form')[0].reset();
}

GPSTaller.verIngresarServicio = function(data) {
    // $('#ingresar_dominio').text('');
    $('#ingresar_dominio').text(data.dominio);
    $('#ingresar-servicio form')[0].reset();
}

GPSTaller.verSolicitarCambios = function(data) {
    // $('#solicitar_dominio').val('');
    $('#solicitar_dominio').val(data.dominio);
    $('#solicitar-cambios form')[0].reset();
}

document.addEventListener("deviceready", function() {
// $(function(){

    $('#btn_guardarPerfil').on('click', function(e){
        e.preventDefault();

        GPSTaller.alert();

        var data = {
            fechaNacimiento: $('#perfil_fechaNacimiento').val(),
            mail: $('#perfil_email').val(),
            empresa: $('#perfil_empresa').val(),
            celular: $('#perfil_celular').val(),
            telefono: $('#perfil_telefono').val(),
            horarioContacto: $('#perfil_horarioContacto').val(),
            cuit: $('#perfil_cuit').val(),
            condicionIva: $('#perfil_iva').val(),
            domicilio: $('#perfil_domicilio').val(),
            codigoPostal: $('#perfil_codigoPostal').val(),
            provincia: $('#perfil_provincia').val(),
            partido: $('#perfil_partido').val(),
            localidad: $('#perfil_localidad').val(),
            genero: $('#perfil_genero').val(),
            estadoCivil: $('#perfil_estadoCivil').val(),
            pagoSeguros: $('#perfil_pagoSeguros').val()
        };

        GPSTaller.editarPerfil(data, function (data) {
            // GPSTaller.alertClose();
            if (data[0].status == 'ok') {
                GPSTaller.alert(data[0].mensaje, true);
                GPSTaller.visited = ['index', 'panel-administracion'];
                GPSTaller.show('panel-administracion');
            } else {
                GPSTaller.alert(data[0].mensaje, true);
            }
        });
    });

    $('#btn_cambiarContrasena').on('click', function(e){
        e.preventDefault();

        GPSTaller.alert();

        data = {
            contrasena: $('#cambiar_oldPass').val(),
            nuevaContrasena: $('#cambiar_newPass').val(),
            nuevaContrasena2: $('#cambiar_newPass2').val()
        };

        GPSTaller.cambiarContrasena(data, function(data){
            // GPSTaller.alertClose();
            $('#cambiarcontrasenia form')[0].reset();
            if (data[0].status == 'ok') {
                GPSTaller.alert(data[0].mensaje, true);
                GPSTaller.visited = ['index'];
                GPSTaller.show('index');
            } else {
                GPSTaller.alert(data[0].mensaje, true);
            }
        });
    });

    $('#btn_asociarVehiculo').on('click', function(e){
        e.preventDefault();

        GPSTaller.alert();

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
            combustible: $('#asociar_combustible').val(),
            dispositivoRecupero: $('#asociar_dispositivoRecupero').val()
        };

        GPSTaller.asociarVehiculo(data, function(data){
            // GPSTaller.alertClose();
            if (data[0].status == 'ok') {
                GPSTaller.alert(data[0].mensaje, true);
                GPSTaller.visited = ['index', 'panel-administracion'];
                GPSTaller.show('panel-administracion');
            } else if (data[0].status == 'error') {
                if (data[0].code == '14') {
                    $('#myModalButtons').children().not('#btn_dismiss').remove();
                    $('#btn_dismiss').before("<p id=\"btn_reclamar\" class=\"texto-centrado\"><a type=\"button\" class=\"btn btn-gps center-block ui-link\">Aceptar</a></p>");
                    GPSTaller.alert(data[0].mensaje, true);

                    $('body').on('click', '#btn_reclamar', function(e){
                        e.preventDefault();

                        $.ajax({
                            url: GPSTaller.urls.data,
                            type: 'post',
                            dataType: 'json',
                            data: {
                                mail: GPSTaller.loggedUser,
                                hash: GPSTaller.hash,
                                action: 'reclamarTitularidad',
                                dominio: $('#asociar_dominio').val()
                            },
                            beforeSend: function() {
                                GPSTaller.alert();
                            },
                            success: function(data) {
                                if (data[0].status == 'ok') {
                                    GPSTaller.alert(data[0].mensaje, true);
                                    GPSTaller.visited = ['index'];
                                    GPSTaller.show('index');
                                } else {
                                    GPSTaller.alert(data[0].mensaje, true);
                                }
                            },
                            complete: function() {
                                $('#myModalButtons').children().not('#btn_dismiss').remove();
                            }
                        });
                    });
                } else {
                    GPSTaller.alert(data[0].mensaje, true);
                }
            }
        });
    });

    $('#btn_desvincular').on('click', function(e){
        e.preventDefault();

        GPSTaller.alert();

        var data = {
            mail: GPSTaller.loggedUser,
            dominio: $('#desvincular_dominio').text(),

        };

        GPSTaller.desvincularVehiculo(data, function(data){
            // GPSTaller.alertClose();
            if (data[0].status == 'ok') {
                GPSTaller.alert(data[0].mensaje, true);
                GPSTaller.visited = ['index', 'panel-administracion'];
                GPSTaller.show('panel-administracion');
            } else if (data[0].status == 'error') {
                GPSTaller.alert(data[0].mensaje, true);
            }
        });
    });

    $('#btn_ingresarServicio').on('click', function(e){
        e.preventDefault();

        GPSTaller.alert();

        var data = {
            mail: GPSTaller.loggedUser,
            dominio: $('#ingresar_dominio').text(),
            km: $('#ingresar_km').val(),
            fecha: $('#ingresar_fecha').val(),
            tipoServicio: $('#ingresar_tipoServicio').val(),
            detalle: $('#ingresar_detalle').val(),
            realizadoPor: $('#ingresar_realizadoPor').val()
        };

        GPSTaller.ingresarServicio(data, function(data){
            // GPSTaller.alertClose();
            if(data[0].status == 'ok') {
                GPSTaller.alert(data[0].mensaje, true);
                GPSTaller.visited = ['index'];
                GPSTaller.show('index');
            } else {
                GPSTaller.alert(data[0].mensaje, true);
            }
        });
    });

    $('#btn_solicitarCambios').on('click', function(e){
        e.preventDefault();

        GPSTaller.alert();

        var data = {
            mail: GPSTaller.loggedUser,
            dominio: $('#solicitar_dominio').val(),
            mensaje: $('#solicitar_mensaje').val()
        };

        GPSTaller.solicitarCambios(data, function(data){
            // GPSTaller.alertClose();
            if(data[0].status == 'ok') {
                GPSTaller.alert(data[0].mensaje, true);
                GPSTaller.visited = ['index', 'panel-administracion'];
                GPSTaller.show('panel-administracion');
            } else {
                GPSTaller.alert(data[0].mensaje, true);
            }
        });
    });

    $('#btn_cancelarAsociar, #btn_cancelarDesvincular, #btn_cancelarIngresar, #btn_cancelarSolicitar').on('click', function(e){
        e.preventDefault();

        $('#btn_volver').trigger('click');
    });

});
