function talleresCercanos()
{
    $(".loader").fadeIn();

    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        $(".loader").fadeOut();
    }

    var onSuccess = function(position) {
        $('#img_gps').attr('src', 'img/con-gps.png');
        GPSTaller.search(position.coords.latitude, position.coords.longitude, function(data) {
            if(data != null) {
                var points = [];
                for(i = 0; i < data.length; i++) {
                    points.push([data[i].lat, data[i].lng]);
                }
                $(".loader").fadeOut();
                GPSTaller.showMap(points);
            } else {
                alert('No hay talleres cerca');
                $(".loader").fadeOut();
            }
        });
    };

    if($('#txt_search').val() != '') {
        $('#btn_search').trigger('click');
    } else {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
}

$(function(){

    $('#btn_search').on('click', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        $(".loader").fadeIn();

        $('#map_canvas').gmap3({
            getlatlng: {
                address: $("#txt_search").val(),
                callback: function(results) {
                    if (!results) {
                        alert('No se encuentra dirección');
                        $(".loader").fadeOut();
                    } else {
                        GPSTaller.search(results[0].geometry.location.lat(), results[0].geometry.location.lng(), function(data) {
                            if(data[0].nombre != 'sin resultados.') {
                                var points = [];
                                for(i = 0; i < data.length; i++) {
                                    points.push([data[i].lat, data[i].lng]);
                                }
                                $(".loader").fadeOut();
                                GPSTaller.showMap(points);
                            } else {
                                alert('No hay talleres cerca');
                                $(".loader").fadeOut();
                            }
                        });
                    }
                }
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

});
