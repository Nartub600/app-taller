var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";

document.addEventListener("deviceready", function() {
    if (deviceType == 'Android') {
        if (window.orientation == 90 || window.orientation == -90) {
            $('#splash').css('background-image', 'url(img/splash-land-xhdpi.png)');
        } else {
            $('#splash').css('background-image', 'url(img/splash-port-xhdpi.png)');
        }
        $('#splash').fadeIn(400, function(){
            setTimeout(function(){
                $('#splash').fadeOut(400, function(){
                    $('.container').fadeIn();
                });
            }, 1000);
        });
    } else {
        $('.container').fadeIn();
    }
});

GPSTaller = {

    hash: '1f8393c163b12a7c87550866ba07444f31bc4012c501e4e006ab475e5cd2d06b',

    urls: {
        access: 'https://www.gpstaller.com.ar/api/v1/access.json.php',
        search: 'https://www.gpstaller.com.ar/api/v1/talleres.json.php',
        comments: 'https://www.gpstaller.com.ar/api/v1/comentariosTaller.json.php',
        faq: 'https://www.gpstaller.com.ar/api/v1/faq.json.php',
        data: 'https://www.gpstaller.com.ar/api/v1/data.json.php'
    },

    show: function (page, data, die) {

        var onlineStatus = checkConnection();

        if (onlineStatus == false) {
            GPSTaller.alert('Debe contar con conexión a internet', true);
            return;
        }

        if ($('[page][id="' + page + '"]').is('[nofooter]')) {
            $('#footer').hide();
        } else {
            $('#footer').show();
        }

        if (page == 'index') {
            $('#btn_volver').hide();
        } else {
            $('#btn_volver').show();
        }

        $('[page]:visible').hide();
        $('[page][id="' + page + '"]').show();

        if (!$.isEmptyObject(data)) {
            var string = 'data';
        } else if (!$.isEmptyObject($('[nav="' + page + '"]').data())) {
            var string = 'data';
            data = $('[nav="' + page + '"]').data();
        } else {
            var string = '';
        }

        if ($('[page][id="' + page + '"]').attr('callback') && die != false) {
            var func = $('[page][id="' + page + '"]').attr('callback') + "(" + string + ");";
            eval(func);
        }

    },

    registro: function (data, callback) {
        data.action = 'register';

        $.ajax({
            url: GPSTaller.urls.access,
            type: 'post',
            dataType: 'json',
            data: data,
            beforeSend: function() {
                if ($('#reg_email').val() == '') {
                    GPSTaller.alert('Ingrese su email', true);
                    return false;
                }
                if ($('#reg_firstname').val() == '') {
                    GPSTaller.alert('Ingrese su nombre', true);
                    return false;
                }
                if ($('#reg_lastname').val() == '') {
                    GPSTaller.alert('Ingrese su apellido', true);
                    return false;
                }
                if ($('#reg_password').val() == '') {
                    GPSTaller.alert('Ingrese su contraseña', true);
                    return false;
                }
                if ($('#reg_passconf').val() == '') {
                    GPSTaller.alert('Ingrese la verificación de su contraseña', true);
                    return false;
                }
                if ($('#reg_password').val() != $('#reg_passconf').val()) {
                    GPSTaller.alert('Las contraseñas no coinciden', true);
                    return false;
                }
                if ($('#reg_terms').prop('checked') == false) {
                    GPSTaller.alert('Debe aceptar los términos y condiciones', true);
                    return false;
                }
                return true;
            },
            success: function (data) {
                callback(data);
            }
        });
    },

    login: function (data, callback) {
        data.action = 'login';

        $.ajax({
            url: GPSTaller.urls.access,
            type: 'post',
            dataType: 'json',
            data: data,
            beforeSend: function() {
                if ($('#login_email').val() == '') {
                    GPSTaller.alert('Ingrese su email', true);
                    return false;
                }
                if ($('#login_password').val() == '') {
                    GPSTaller.alert('Ingrese su contraseña', true);
                    return false;
                }
                return true;
            },
            success: function (data) {
                callback(data);
            }
        });
    },

    activarCuenta: function(url, callback) {
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            // data: data,
            success: function(data) {
                callback(data);
            }
        });
    },

    solicitarContrasena: function (data, callback) {
        data.action = 'solicitarContrasena';

        $.ajax({
            url: GPSTaller.urls.access,
            type: 'get',
            dataType: 'json',
            data: data,
            success: function (data) {
                callback(data);
            }
        });
    },

    cambiarContrasena: function(data, callback) {
        data.action = 'nuevaContrasena';
        data.hash = GPSTaller.hash;
        data.mail = GPSTaller.loggedUser;

        $.ajax({
            url: GPSTaller.urls.access,
            type: 'get',
            dataType: 'json',
            data: data,
            beforeSend: function() {
                if ($('#cambiar_oldPass').val() == '') {
                    GPSTaller.alert('Ingrese su contraseña anterior', true);
                    return false;
                }
                if ($('#cambiar_newPass').val() == '') {
                    GPSTaller.alert('Ingrese su nueva contraseña', true);
                    return false;
                }
                if ($('#cambiar_newPass2').val() == '') {
                    GPSTaller.alert('Confirme su nueva contraseña', true);
                    return false;
                } else {
                    if ($('#cambiar_newPass').val() != $('#cambiar_newPass2').val()) {
                        GPSTaller.alert('Las contraseñas no coinciden', true);
                        return false;
                    }
                }
                return true;
            },
            success: function(data) {
                callback(data);
            }
        });
    },

    search: function (data, callback) {
        if(data.tallerID) {
            var data = {
                tallerID: data.tallerID
            };
        } else {
            var data = {
                latitud: data.lat,
                longitud: data.lng,
                cantidad: $('#input_cantidad').val(),
                categoria: ($('#chk_taller').is(':checked') && $('#chk_gomeria').is(':checked') ? '0' : ($('#chk_taller').is(':checked') ? '1' : ($('#chk_gomeria').is(':checked') ? '2' : '0' ))),
                radio: $('#input_distancia').val()
            };
        }

        $.ajax({
            url: GPSTaller.urls.search,
            type: 'get',
            dataType: 'json',
            data: data,
            success: function (data) {
                callback(data);
            }
        });
    },

    editarPerfil: function (data, callback) {
        data.action = 'editarPerfil';
        data.hash = GPSTaller.hash;

        $.ajax({
            url: GPSTaller.urls.data,
            type: 'post',
            dataType: 'json',
            data: data,
            beforeSend: function() {
                if ($('#perfil_fechaNacimiento').val() == '') {
                //     GPSTaller.alert('Ingrese la fecha de nacimiento', true);
                //     return false;
                } else {
                    var currentTime = new Date();
                    // var fecha = $('#perfil_fechaNacimiento').val().split('-');
                    // var day = fecha[0];
                    // var month = fecha[1];
                    // var year = fecha[2];
                    // var fecha = new Date(year, month, day);
                    var fecha = Date.parseExact($('#perfil_fechaNacimiento').val(), "dd-MM-yyyy");
                    if (currentTime.getTime() < fecha.getTime()) {
                        GPSTaller.alert('Ingrese una fecha válida', true);
                        return false;
                    }
                }
                // if ($('#perfil_empresa').val() == '') {
                //     GPSTaller.alert('Ingrese la empresa', true);
                //     return false;
                // }
                // if ($('#perfil_celular').val() == '') {
                //     GPSTaller.alert('Ingrese el celular', true);
                //     return false;
                // }
                // if ($('#perfil_telefono').val() == '') {
                //     GPSTaller.alert('Ingrese el teléfono', true);
                //     return false;
                // }
                // if ($('#perfil_horarioContacto').val() == '') {
                //     GPSTaller.alert('Ingrese el horario de contacto', true);
                //     return false;
                // }
                // if ($('#perfil_cuit').val() == '') {
                //     GPSTaller.alert('Ingrese el CUIT', true);
                //     return false;
                // }
                // if ($('#perfil_iva').val() == '') {
                //     GPSTaller.alert('Ingrese la condición de IVA', true);
                //     return false;
                // }
                // if ($('#perfil_domicilio').val() == '') {
                //     GPSTaller.alert('Ingrese el domicilio', true);
                //     return false;
                // }
                // if ($('#perfil_codigoPostal').val() == '') {
                //     GPSTaller.alert('Ingrese el código postal', true);
                //     return false;
                // }
                // if ($('#perfil_localidad').val() == '') {
                //     GPSTaller.alert('Ingrese la localidad', true);
                //     return false;
                // }
                // if ($('#perfil_genero').val() == '') {
                //     GPSTaller.alert('Ingrese el género', true);
                //     return false;
                // }
                // if ($('#perfil_estadoCivil').val() == '') {
                //     GPSTaller.alert('Ingrese el estado civil', true);
                //     return false;
                // }
                // if ($('#perfil_pagoSeguros').val() == '') {
                //     GPSTaller.alert('Ingrese la forma de pago', true);
                //     return false;
                // }
            },
            success: function (data) {
                callback(data);
            }
        });
    },

    asociarVehiculo: function(data, callback) {
        data.action = 'nuevoVehiculo';
        data.hash = GPSTaller.hash;

        $.ajax({
            url: GPSTaller.urls.data,
            type: 'post',
            dataType: 'json',
            data: data,
            beforeSend: function() {
                if ($('#asociar_dominio').val() == '') {
                    GPSTaller.alert('Ingrese el dominio', true);
                    return false;
                }
                if ($('#asociar_ano').val() == '') {
                    GPSTaller.alert('Ingrese el año', true);
                    return false;
                }
                var currentTime = new Date();
                if (parseInt($('#asociar_ano').val()) > currentTime.getFullYear()) {
                    GPSTaller.alert('El año es incorrecto', true);
                    return false;
                }
                if ($('#asociar_marca').val() == '') {
                    GPSTaller.alert('Seleccione la marca', true);
                    return false;
                }
                if ($('#asociar_modelo').val() == '') {
                    GPSTaller.alert('Seleccione el modelo', true);
                    return false;
                }
                if ($('#asociar_version').val() == '') {
                    GPSTaller.alert('Seleccione la versión', true);
                    return false;
                }
                return true;
            },
            success: function(data) {
                callback(data);
            }
        });
    },

    desvincularVehiculo: function(data, callback) {
        data.action = 'desvincularVehiculo';
        data.hash = GPSTaller.hash;

        $.ajax({
            url: GPSTaller.urls.data,
            type: 'post',
            dataType: 'json',
            data: data,
            success: function(data) {
                callback(data);
            }
        });
    },

    ingresarServicio: function(data, callback) {
        data.action = 'nuevoServicio';
        data.hash = GPSTaller.hash;

        $.ajax({
            url: GPSTaller.urls.data,
            type: 'post',
            dataType: 'json',
            data: data,
            beforeSend: function() {
                if ($('#ingresar_fecha').val() == '') {
                    GPSTaller.alert('Ingrese la fecha', true);
                    return false;
                } else {
                    var currentTime = new Date();
                    // var fecha = $('#ingresar_fecha').val().split('-');
                    // var day = fecha[0];
                    // var month = fecha[1];
                    // var year = fecha[2];
                    // var fecha = new Date(year, month, day);
                    var fecha = Date.parseExact($('#ingresar_fecha').val(), "dd-MM-yyyy");
                    // alert(fecha);
                    if (currentTime.getTime() < fecha.getTime()) {
                        GPSTaller.alert('Ingrese una fecha válida', true);
                        return false;
                    }
                }
                if ($('#ingresar_km').val() == '') {
                    GPSTaller.alert('Ingrese los kilómetros', true);
                    return false;
                }
                if ($('#ingresar_tipoServicio').val() == '') {
                    GPSTaller.alert('Ingrese el tipo de servicio', true);
                    return false;
                }
                return true;
            },
            success: function(data) {
                callback(data);
            }
        });
    },

    solicitarCambios: function(data, callback) {
        data.action = 'solicitarCambios';
        data.hash = GPSTaller.hash;

        $.ajax({
            url: GPSTaller.urls.data,
            type: 'post',
            dataType: 'json',
            data: data,
            beforeSend: function() {
                if ($('#solicitar_mensaje').val() == '') {
                    GPSTaller.alert('Ingrese el mensaje', true);
                    return false;
                }
                return true;
            },
            success: function(data) {
                callback(data);
            }
        });
    },

    showMap: function (points) {
        $('#map_canvas').gmap3('destroy');
        $('#map_canvas').gmap3({
            marker: {
                values: points,
                events: {
                    click: function (marker, event, context) {
                        GPSTaller.visited.push('detalle-taller');
                        GPSTaller.show('detalle-taller', {tallerID: context.data.tallerID});
                    }
                }
            }
        }, 'autofit');
    },

    alert: function (message, button, title) {
        if (GPSTaller.modalTimer) {
            clearTimeout(GPSTaller.modalTimer);
        }

        if (!$('#myModalButtons').is(':visible')) {
            if (message) {
                $('#myModalBody').text(message);
            } else {
                $('#myModalBody').text('Un momento por favor');
            }

            if (title) {
                $('#myModalLabel').text(title);
            } else {
                $('#myModalLabel').text('GPS Taller');
            }

            $('#myModalButtons').hide();
            if (button) {
                $('#myModalButtons').show();
            }
        }

        if (!$('#mensajeroModal').is(':visible')) {
            $('#mensajeroModal').modal('show');
        }

        if (!button) {
            GPSTaller.modalTimer = setTimeout(function(){
                if ($('#mensajeroModal').is(':visible')) {
                    $('#mensajeroModal').modal('hide');
                }
            }, 10000);
        }

    },

    alertClose: function() {
        if (!$('#myModalButtons').is(':visible')) {
            $('#mensajeroModal').modal('hide');
        }
    }

};

function pad(pad, str, padLeft) {
    if (typeof str === 'undefined')
        return pad;
    if (padLeft) {
        return (pad + str).slice(-pad.length);
    } else {
        return (str + pad).substring(0, pad.length);
    }
}

$.ajaxSetup({
    timeout: 20000,
    error: function (x, t, m) {
        if (t === 'timeout') {
            GPSTaller.alert('Error de conexión, vuelva a intentarlo por favor', true);
        } else {
            GPSTaller.alert('Error inesperado, vuelva a intentarlo por favor', true);
        }
    }
});
