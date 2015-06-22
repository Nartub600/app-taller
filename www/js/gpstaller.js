GPSTaller = {

    hash: '1f8393c163b12a7c87550866ba07444f31bc4012c501e4e006ab475e5cd2d06b',

    urls: {
        access: 'https://www.gpstaller.com.ar/api/v1/access.json.php',
        search: 'https://www.gpstaller.com.ar/dev_v1/api/views/talleres.json.php',
        comments: 'https://www.gpstaller.com.ar/api/v1/comentariosTaller.json.php',
        faq: 'https://www.gpstaller.com.ar/api/v1/faq.json.php',
        data: 'https://www.gpstaller.com.ar/api/v1/data.json.php'
    },

    show: function (page, data, die) {

        var onlineStatus = checkConnection();

        if (onlineStatus == false) {
            alert('Debe contar con conexión a internet');
            return;
        }

        if($('[page][id="' + page + '"]').is('[nofooter]')) {
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
            success: function (data) {
                callback(data);
            }
        });
    },

    solicitar: function (data, callback) {
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
    }

};
