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

    $.mobile.loading().hide();

    if (window.localStorage['user_email'] === undefined || window.localStorage['user_email'] === 'undefined' || window.localStorage['user_email'] === 'null') { // no hay usuario
        $('[auth]').hide();
        $('[noauth]').show();
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
                $('#perfil_partido').html('<option value="">Partido</option>').prop('disabled', true);
                $('#perfil_localidad').html('<option value="">Localidad</option>').prop('disabled', true);
            },
            success: function (data) {
                $.each(data, function(i, e){
                    $('#perfil_partido').append('<option value="' + e.id + '">' + e.text + '</option>');
                });
                $('#perfil_partido').prop('disabled', false);
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
                $('#perfil_localidad').html('<option value="">Localidad</option>').prop('disabled', true);
            },
            success: function (data) {
                $.each(data[0].children, function(i, e){
                    $('#perfil_localidad').append('<option value="' + e.id + '">' + e.text + '</option>');
                });
                $('#perfil_localidad').prop('disabled', false);
            }
        });
    });

    $('#perfil_codigoPostal').autocomplete({
        minLength: 4,
        source: function(request, response) {
            $.ajax({
                url: 'https://www.gpstaller.com.ar/templates/codigosPostales.json.php',
                type: 'get',
                dataType: 'json',
                data: {
                    q: request.term
                },
                success: function(data) {
                    response($.map(data, function(item){
                        return {
                            label: item.text,
                            value: item.id
                        };
                    }));
                }
            });
        }
    });

    $.ajax({
        url: 'https://www.gpstaller.com.ar/templates/marcas.json.php',
        type: 'get',
        dataType: 'json',
        beforeSend: function() {
            $('#asociar_marca').html('<option value="">Marca</option>');
            $('#asociar_modelo').html('<option value="">Modelo</option>').prop('disabled', true);
            $('#asociar_version').html('<option value="">Versión</option>').prop('disabled', true);
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
                $('#asociar_modelo').html('<option value="">Modelo</option>').prop('disabled', true);
                $('#asociar_version').html('<option value="">Versión</option>').prop('disabled', true);
            },
            success: function (data) {
                $.each(data, function(i, e){
                    $('#asociar_modelo').append('<option value="' + e.id + '">' + e.text + '</option>');
                });
                $('#asociar_modelo').prop('disabled', false);
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
                $('#asociar_version').html('<option value="">Versión</option>').prop('disabled', true);
            },
            success: function (data) {
                $.each(data, function(i, e){
                    $('#asociar_version').append('<option value="' + e.id + '">' + e.text + '</option>');
                });
                $('#asociar_version').prop('disabled', false);
            }
        });
    });

    GPSTaller.alert('Para mejorar la presición de tu ubicación te recomendamos tener el GPS activado', true);

}, false);

document.addEventListener("offline", function(){

}, false);

document.addEventListener("online", function(){

}, false);
