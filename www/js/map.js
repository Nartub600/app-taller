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
        // var data = [{"tallerID":"22","rating":0,"comentarios":0,"categoria":"1","nombre":"Ricardo Jose Armando Giovine","direccion":"Caracas 582 3ro A","barrio":"","codigoPostal":"1406","lat":"-34.582901","lng":"-58.494637","telefono":"(011) 4637-8279","nextel":"","celular":"","email":"no-reply@gpstaller.com","localidad":"Ciudad De Buenos Aires","partido":"CABA","provincia":"Capital Federal","horarioAtencion":"","descripcion":"","distancia":"1.7762385921819233"}];
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
