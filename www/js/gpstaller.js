GPSTaller = {

    search: function (lat, lng, callback) {
        $.ajax({
            url: 'https://www.gpstaller.com.ar/dev200814/api/views/talleres.json.php',
            type: 'get',
            dataType: 'json',
            data: {
                latitud: lat,
                longitud: lng,
                cantidad: 10,
                categoria: 1
            },
            success: function(data) {
                callback(data);
            }
        });
    },

    addMarkers: function (points) {
        for(i = 0; i < points.length; i++) {
            var point = new plugin.google.maps.LatLng(points[i].lat, points[i].lng);
            map.addMarker({
                'position': point,
                'title': points[i].nombre
            }, function(marker) {
                // marker.showInfoWindow();
            });
        }
    },

    showMap: function (location) {
        map = plugin.google.maps.Map.getMap(map_canvas, {
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