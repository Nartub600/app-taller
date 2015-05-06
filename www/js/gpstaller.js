GPSTaller = {

    search: function (lat, lng, callback) {
        $.ajax({
            url: 'https://www.gpstaller.com.ar/dev_v1/api/views/talleres.json.php',
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

    addMarkers: function (points) {
        for(i = 0; i < points.length; i++) {
            var point = new plugin.google.maps.LatLng(points[i].lat, points[i].lng);
            GPSTaller.map.addMarker({
                'position': point,
                'title': points[i].nombre
            }, function(marker) {
                // marker.showInfoWindow();
            });
        }
    },

    showMap: function (location) {
        GPSTaller.map = plugin.google.maps.Map.getMap(GPSTaller.map_canvas, {
            'backgroundColor': 'white',
            'mapType': plugin.google.maps.MapTypeId.ROADMAP,
            'controls': {
                'zoom': true
            },
            'camera': {
                'latLng': location,
                'zoom': 10
            }
        });
    }

};
