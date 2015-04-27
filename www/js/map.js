function talleresCercanos()
{
    $(".fakeloader").fadeIn();

    GPSTaller.map_canvas = document.getElementById("map_canvas");

    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        // alert('Error en la geolocalización');
        $(".fakeloader").fadeOut();
    }

    var onSuccess = function(position) {
        $('#img_gps').attr('src', 'img/con-gps.png');
        GPSTaller.search(position.coords.latitude, position.coords.longitude, function(data) {
            if(data != null) {
                var points = [];
                for(i = 0; i < data.length; i++) {
                    points.push(new plugin.google.maps.LatLng(data[i].lat, data[i].lng));
                }
                GPSTaller.location = new plugin.google.maps.LatLngBounds(points);
                $(".fakeloader").fadeOut();
                GPSTaller.showMap(GPSTaller.location.getCenter());
                GPSTaller.map.addEventListener(plugin.google.maps.event.MAP_READY, function() {
                    GPSTaller.addMarkers(data);
                    GPSTaller.map.animateCamera({
                        'target': GPSTaller.location,
                        'duration': 500
                    });
                });
            } else {
                alert('No hay talleres cerca');
                $(".fakeloader").fadeOut();
            }
        });
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    $('#btn_search').on('click', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        $(".fakeloader").fadeIn();

        var request = {
            'address': $("#txt_search").val()
        };

        plugin.google.maps.Geocoder.geocode(request, function(results) {
            if (results.length) {
                var result = results[0];
                var position = result.position;

                GPSTaller.search(position.lat, position.lng, function(data) {
                    if(data != null) {
                        var points = [];
                        for(i = 0; i < data.length; i++) {
                            points.push(new plugin.google.maps.LatLng(data[i].lat, data[i].lng));
                        }
                        GPSTaller.location = new plugin.google.maps.LatLngBounds(points);
                        $(".fakeloader").fadeOut();
                        GPSTaller.map.clear();
                        // GPSTaller.showMap(location.getCenter());
                        // GPSTaller.map.addEventListener(plugin.google.maps.event.MAP_READY, function() {
                            GPSTaller.addMarkers(data);
                            GPSTaller.map.animateCamera({
                                'target': GPSTaller.location,
                                'duration': 500
                            });
                        // });
                    } else {
                        alert('No hay talleres cerca');
                        $(".fakeloader").fadeOut();
                    }
                });
            } else {
                alert('No se encuentra dirección');
                $(".fakeloader").fadeOut();
            }
        });
    });

    $('#txt_search').on('keypress', function(e){
        if(e.which == 13) {
            e.preventDefault();
            e.stopImmediatePropagation();

            $('#btn_search').trigger('click');
            $('#txt_search').trigger('blur');
        }
    });
}
