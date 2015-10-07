GPSTaller.talleresCercanos = function () {
    $('#footer').hide();
    GPSTaller.alert();

    function onError(error) {
        // alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        // GPSTaller.alert('Para mejorar la presición de tu ubicación te recomendamos tener el GPS activado', true);
        // alert(error.code);
        GPSTaller.currentPosition = null;
        switch (error.code) {
            case error.PERMISSION_DENIED:
                GPSTaller.alert('El permiso para obtener la posición fue denegado', true);
            break;
            case error.POSITION_UNAVAILABLE:
                GPSTaller.alert('Debe activar los servicios de ubicación de su dispositivo', true);
            break;
            case error.TIMEOUT:
                GPSTaller.alert('Para mejorar la precisión de su ubicación le recomendamos tener el GPS activado', true);
            break;
        }
        $('#btn_volver').trigger('click');
    }

    var onSuccess = function(position) {
        GPSTaller.currentPosition = [position.coords.latitude, position.coords.longitude];
        $('#img_gps').attr('src', 'img/con-gps.png');
        GPSTaller.search({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }, function(data) {
            if (data != null) {
                var points = [];
                for (i = 0; i < data.length; i++) {
                    points.push({
                        latLng: [data[i].lat, data[i].lng],
                        data: {
                            tallerID: data[i].tallerID
                        }
                    });
                }
                points.push({
                    latLng: GPSTaller.currentPosition,
                    options: {
                        icon: "http://maps.google.com/mapfiles/marker_green.png"
                    }
                });
                GPSTaller.alertClose();
                GPSTaller.showMap(points);
            } else {
                GPSTaller.alert('No hay talleres cerca', true);
            }
        });
    };

    if ($('#txt_search').val() != '') {
        $('#btn_search').trigger('click');
    } else {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 20000
        });
    }
}

document.addEventListener("deviceready", function() {
// $(function(){

    $('#btn_search').on('click', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        GPSTaller.alert();

        $('#map_canvas').gmap3({
            getlatlng: {
                address: $("#txt_search").val(),
                callback: function(results) {
                    if (!results) {
                        GPSTaller.alert('No se encuentra dirección', true);
                    } else {
                        GPSTaller.search(
                            {
                                lat: results[0].geometry.location.lat(),
                                lng: results[0].geometry.location.lng()
                            }, function(data) {
                            if (data[0].nombre != 'sin resultados.') {
                                var points = [];
                                for (i = 0; i < data.length; i++) {
                                    points.push({
                                        latLng: [data[i].lat, data[i].lng],
                                        data: {
                                            tallerID: data[i].tallerID
                                        }
                                    });
                                }
                                GPSTaller.alertClose();
                                GPSTaller.showMap(points);
                            } else {
                                GPSTaller.alert('No hay talleres cerca', true);
                            }
                        });
                    }
                }
            }
        });
    });

    $('#txt_search').on('keypress', function(e){
        if (e.which == 13) {
            e.preventDefault();
            e.stopImmediatePropagation();

            $('#btn_search').trigger('click');
            $('#txt_search').trigger('blur');
        }
    });

    $('#gps-estado').on('click', function(e){
        if (GPSTaller.currentPosition != null) {
            var currentPosition = {
                lat: GPSTaller.currentPosition[0],
                lng: GPSTaller.currentPosition[1]
            };
            // var newLatLng = new google.maps.LatLng(GPSTaller.currentPosition[0], GPSTaller.currentPosition[1]);
            $('#map_canvas').gmap3('get').setCenter(currentPosition);
        }
    });

});
