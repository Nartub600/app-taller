GPSTaller.talleresCercanos =  function ()
{
    $('#footer').hide();
    $(".loader").fadeIn();

    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        $(".loader").fadeOut();
    }

    var onSuccess = function(position) {
        $('#img_gps').attr('src', 'img/con-gps.png');
        // var data = [{"tallerID":"1","rating":4,"comentarios":3,"categoria":"1","nombre":"Taller Tincani Inyeccion Electronica","direccion":"Mexico 2210","barrio":"","codigoPostal":"1222","lat":"-34.616196","lng":"-58.397865","telefono":"(011) 4943-6474","nextel":"","celular":"","email":"ceciliafontenla@gmail.com","localidad":"Ciudad De Buenos Aires","partido":"CABA","provincia":"Capital Federal","horarioAtencion":"","descripcion":""}];
        GPSTaller.search({lat: position.coords.latitude, lng: position.coords.longitude}, function(data) {
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
                $(".loader").fadeOut();
                GPSTaller.showMap(points);
            } else {
                alert('No hay talleres cerca');
                $(".loader").fadeOut();
            }
        });
    };

    if ($('#txt_search').val() != '') {
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
                        GPSTaller.search({lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}, function(data) {
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
        if (e.which == 13) {
            e.preventDefault();
            e.stopImmediatePropagation();

            $('#btn_search').trigger('click');
            $('#txt_search').trigger('blur');
        }
    });

});
