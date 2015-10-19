function checkConnection() {
    var networkState = navigator.connection.type;

    switch (networkState) {
        case Connection.NONE:
            return false;
            break;
        default:
            return true;
            break;
    }

    // var states = {};
    // states[Connection.UNKNOWN]  = 'Unknown connection';
    // states[Connection.ETHERNET] = 'Ethernet connection';
    // states[Connection.WIFI]     = 'WiFi connection';
    // states[Connection.CELL_2G]  = 'Cell 2G connection';
    // states[Connection.CELL_3G]  = 'Cell 3G connection';
    // states[Connection.CELL_4G]  = 'Cell 4G connection';
    // states[Connection.CELL]     = 'Cell generic connection';
    // states[Connection.NONE]     = 'No network connection';

    // alert('Connection type: ' + states[networkState]);
}

document.addEventListener("deviceready", function() {
// $(function(){

    if (window.localStorage['user_email'] === undefined || window.localStorage['user_email'] === 'undefined' || window.localStorage['user_email'] === 'null') { // no hay usuario
        $('[auth]').hide();
        $('[noauth]').show();
        GPSTaller.loggedUser = '';
    } else { // hay usuario
        $('[auth]').show();
        $('[noauth]').hide();
        GPSTaller.loggedUser = window.localStorage['user_email'];
        $('#btn_historia').attr('nav', 'panel-administracion');
    }

    // data que pedimos al inicio de la aplicación
    $.ajax({
        url: GPSTaller.urls.faq,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            $.each(data, function(i, e){
                $('.content-preguntas').append("<div class=\"item-pregunta\"><p class=\"pregunta\">" + e.pregunta + "</p><p class=\"respuesta\">" + e.respuesta + "</p></div>");
            });
        }
    });

    $.ajax({
        url: 'https://www.gpstaller.com.ar/templates/servicios.json.php',
        type: 'get',
        dataType: 'json',
        success: function(data) {
            $.each(data, function(i, e){
                $('#ingresar_tipoServicio').append('<option value="' + e.id + '">' + e.text + '</option>');
            });
        }
    });

    $.ajax({
        url: 'https://www.gpstaller.com.ar/templates/provincias.json.php',
        type: 'get',
        dataType: 'json',
        beforeSend: function() {
            // $('#perfil_provincia').html('<option value="">Provincia</option>').prop('disabled', true);
            // $('#perfil_partido').html('<option value="">Partido</option>').prop('disabled', true);
            // $('#perfil_localidad').html('<option value="">Localidad</option>').prop('disabled', true);
        },
        success: function (data) {
            $.each(data, function(i, e){
                $('#perfil_provincia').append('<option value="' + e.id + '">' + e.text + '</option>');
            });
            $('#perfil_provincia').prop('disabled', false);
        }
    });

    $('#perfil_provincia').on('change', function(){
        $.ajax({
            url: 'https://www.gpstaller.com.ar/templates/partidos.json.php',
            type: 'get',
            dataType: 'json',
            data: {
                provinciaID: $('#perfil_provincia').val()
            },
            beforeSend: function() {
                GPSTaller.alert();
                $('#perfil_partido').html('<option value="">Partido</option>').prop('disabled', true);
                $('#perfil_localidad').html('<option value="">Localidad</option>').prop('disabled', true);
            },
            success: function (data) {
                $.each(data, function(i, e){
                    $('#perfil_partido').append('<option value="' + e.id + '">' + e.text + '</option>');
                });
                $('#perfil_partido').prop('disabled', false);
                GPSTaller.alertClose();
            }
        });
    });

    $('#perfil_partido').on('change', function(){
        $.ajax({
            url: 'https://www.gpstaller.com.ar/templates/localidades.json.php',
            type: 'get',
            dataType: 'json',
            data: {
                provinciaID: $('#perfil_provincia').val(),
                partidoID: $('#perfil_partido').val()
            },
            beforeSend: function() {
                GPSTaller.alert();
                $('#perfil_localidad').html('<option value="">Localidad</option>').prop('disabled', true);
            },
            success: function (data) {
                $.each(data[0].children, function(i, e){
                    $('#perfil_localidad').append('<option value="' + e.id + '">' + e.text + '</option>');
                });
                $('#perfil_localidad').prop('disabled', false);
                GPSTaller.alertClose();
            }
        });
    });

    $('#perfil_fechaNacimiento').on('focus', function(){
        $('#perfil_fechaNacimientoReal').trigger('focus');
    });

    $('#perfil_fechaNacimientoReal').on('input', function(){
        if ($('#perfil_fechaNacimientoReal').val() != '') {
            // var fecha = $('#perfil_fechaNacimientoReal').val().split('-');
            // $('#perfil_fechaNacimiento').val(fecha[2] + '-' + fecha[1] + '-' + fecha[0]);
            var fecha = Date.parseExact($('#perfil_fechaNacimientoReal').val(), ["yyyy-MM-dd", "dd/MM/yyyy"]);
            var anio = fecha.getFullYear();
            var mes = pad('00', fecha.getMonth() + 1, true);
            var dia = pad('00', fecha.getDate(), true);
            $('#perfil_fechaNacimiento').val(dia + '-' + mes + '-' + anio);
        } else {
            $('#perfil_fechaNacimiento').val('');
        }
    });

    $('#ingresar_fecha').on('focus', function(){
        $('#ingresar_fechaReal').trigger('focus').trigger('click');
    });

    $('#ingresar_fechaReal').on('input', function(){
        if ($('#ingresar_fechaReal').val() != '') {
            // var fecha = $('#ingresar_fechaReal').val().split('-');
            // $('#ingresar_fecha').val(fecha[2] + '-' + fecha[1] + '-' + fecha[0]);
            var fecha = Date.parseExact($('#ingresar_fechaReal').val(), ["yyyy-MM-dd", "dd/MM/yyyy"]);
            var anio = fecha.getFullYear();
            var mes = pad('00', fecha.getMonth() + 1, true);
            var dia = pad('00', fecha.getDate(), true);
            $('#ingresar_fecha').val(dia + '-' + mes + '-' + anio);
        } else {
            $('#ingresar_fecha').val('');
        }
    });

    $.ajax({
        url: 'https://www.gpstaller.com.ar/templates/marcas.json.php',
        type: 'get',
        dataType: 'json',
        beforeSend: function() {
            $('#asociar_marca').html('<option value="">Marca*</option>');
            $('#asociar_modelo').html('<option value="">Modelo*</option>').prop('disabled', true);
            $('#asociar_version').html('<option value="">Versión*</option>').prop('disabled', true);
        },
        success: function (data) {
            $.each(data, function(i, e){
                $('#asociar_marca').append('<option value="' + e.id + '">' + e.text + '</option>');
            });
            $('#asociar_marca').prop('disabled', false);
        }
    });

    $('#asociar_marca').on('change', function(){
        $.ajax({
            url: 'https://www.gpstaller.com.ar/templates/modelos.json.php',
            type: 'get',
            dataType: 'json',
            data: {
                marcaID: $('#asociar_marca').val()
            },
            beforeSend: function() {
                GPSTaller.alert();
                $('#asociar_modelo').html('<option value="">Modelo*</option>').prop('disabled', true);
                $('#asociar_version').html('<option value="">Versión*</option>').prop('disabled', true);
            },
            success: function (data) {
                $.each(data, function(i, e){
                    $('#asociar_modelo').append('<option value="' + e.id + '">' + e.text + '</option>');
                });
                $('#asociar_modelo').prop('disabled', false);
                GPSTaller.alertClose();
            }
        });
    });

    $('#asociar_modelo').on('change', function(){
        $.ajax({
            url: 'https://www.gpstaller.com.ar/templates/versiones.json.php',
            type: 'get',
            dataType: 'json',
            data: {
                marcaID: $('#asociar_marca').val(),
                modeloID: $('#asociar_modelo').val()
            },
            beforeSend: function() {
                GPSTaller.alert();
                $('#asociar_version').html('<option value="">Versión*</option>').prop('disabled', true);
            },
            success: function (data) {
                $.each(data, function(i, e){
                    $('#asociar_version').append('<option value="' + e.id + '">' + e.text + '</option>');
                });
                $('#asociar_version').prop('disabled', false);
                GPSTaller.alertClose();
            }
        });
    });

    $('#footer').on('click', function(e){
        e.preventDefault();

        alert('20151014162104');
    });

    window.webintent.getUri(function(uri) {
        var chunks = uri.split('gpstaller.com.ar/');
        if (chunks[chunks.length - 1].search('verificationCode') != -1) {
            var preQueryString = chunks[chunks.length - 1].split('?');
            var queryString = preQueryString[preQueryString.length - 1];
            // alert(queryString);
            var queries = queryString.split('&');

            $.each(queries, function(i,e){
                alert(e);
            });

            // GPSTaller.activarCuenta(data, function(data) {
            //     if(data[0].status == 'ok') {
            //         GPSTaller.alert(data[0].mensaje, true);
            //         GPSTaller.visited = ['index', 'panel-administracion'];
            //         GPSTaller.show('panel-administracion');
            //     } else {
            //         GPSTaller.alert(data[0].mensaje, true);
            //     }
            // });
        }
    });

}, false);

document.addEventListener("offline", function(){

}, false);

document.addEventListener("online", function(){

}, false);
