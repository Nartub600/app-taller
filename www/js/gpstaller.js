GPSTaller = {

    urls: {
        access: 'https://www.gpstaller.com.ar/dev_v1/api/views/access.json.php',
        search: 'https://www.gpstaller.com.ar/dev_v1/api/views/talleres.json.php',
        comments: 'https://www.gpstaller.com.ar/dev_v1/api/views/comentariosTaller.json.php'
    },

    show: function (page, data) {
        if(!$('#footer').is(':visible')) {
            $('#footer').show();
        }
        $('[page]:visible').hide();
        $('[page][id="' + page + '"]').show();
        if($('[page][id="' + page + '"]').attr('callback')) {
            if (data) {
                var string = 'data';
            } else {
                var string = '';
            }
            var func = $('[page][id="' + page + '"]').attr('callback') + "(" + string + ");";
            eval(func);
        }
    },

    registro: function (email, nombre, apellido, password, callback) {
        $.ajax({
            url: GPSTaller.urls.access,
            type: 'post',
            dataType: 'json',
            data: {
                action: 'registro',
                nombre: nombre,
                apellido: apellido,
                mail: email,
                contraseña: password
            },
            success: function(data) {
                callback(data);
            }
        });
    },

    login: function (email, password, callback) {
        $.ajax({
            url: GPSTaller.urls.access,
            type: 'post',
            dataType: 'json',
            data: {
                action: 'login',
                mail: email,
                contraseña: password
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
                    click: function(marker, event, context) {
                        GPSTaller.show('detalle-taller', context.data.tallerID);
                    }
                }
            }
        }, 'autofit');
    }

};
