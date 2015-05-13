GPSTaller = {

    urls: {
        access: 'https://www.gpstaller.com.ar/dev_v1/api/views/access.json.php',
        buscador: 'https://www.gpstaller.com.ar/dev_v1/api/views/talleres.json.php'
    },

    login: function(mail, pass, callback) {
        $.ajax({
            url: GPSTaller.urls.access,
            type: 'post',
            dataType: 'json',
            data: {
                action: 'login',
                mail: mail,
                contraseña: pass
            },
            success: function(data) {
                callback(data);
            }
        });
    },

    search: function (lat, lng, callback) {
        $.ajax({
            url: GPSTaller.urls.buscador,
            type: 'get',
            dataType: 'json',
            data: {
                latitud: lat,
                longitud: lng,
                cantidad: $('#input_cantidad').val(),
                categoria: ($('#chk_taller').is(':checked') && $('#chk_gomeria').is(':checked') ? '0' : ($('#chk_taller').is(':checked') ? '1' : ($('#chk_gomeria').is(':checked') ? '2' : '0' ))),
                radio: $('#input_distancia').val()
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
                values: points
            }
        }, 'autofit');
    }

};
