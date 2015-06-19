GPSTaller.detalle = function (data) {
    $(".loader").fadeIn();

    $('#detalle_nombre').text('');
    $('#detalle_direccion').text('');
    $('#detalle_telefono').text('');
    $('#detalle_email').text('');
    $('#detalle_horario').text('');
    $('#detalle_descripcion').text('');
    $('#detalle_rating').attr('src', '');
    $('#detalle_cant_comentarios').text('');
    $('[nav="detalle-taller"]').data('tallerID', data.tallerID);
    $('[nav="comentarios"]').data('tallerID', data.tallerID);
    $('#detalle_lat').val('');
    $('#detalle_lng').val('');

    GPSTaller.search({
        tallerID: data.tallerID
    }, function(data){
        $(".loader").fadeOut();
        $('#detalle_nombre').text(data[0].nombre);
        $('#detalle_direccion').text(data[0].direccion);
        $('#detalle_telefono').text(data[0].telefono);
        $('#detalle_email').text(data[0].email);
        $('#detalle_horario').text(data[0].horarioAtencion);
        $('#detalle_descripcion').text(data[0].descripcion);
        $('#detalle_rating').attr('src', 'img/rating-' + data[0].rating + '.png');
        $('#detalle_cant_comentarios').text(data[0].comentarios);
        $('#detalle_lat').val(data[0].lat);
        $('#detalle_lng').val(data[0].lng);
    });
}

document.addEventListener("deviceready", function() {
// $(function(){

    $('body').on('click', '#detalle_comollego', function(e){
        e.preventDefault();

        $(".loader").fadeIn();
        $('#txt_search').val('');

        $('#map_canvas').gmap3('destroy');
        $('#map_canvas').gmap3({
            getroute: {
                options: {
                    origin: GPSTaller.currentPosition,
                    destination: [$('#detalle_lat').val(), $('#detalle_lng').val()],
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                },
                callback: function(results) {
                    $(".loader").fadeOut();
                    if (!results) return;
                    GPSTaller.visited.push('search-map');
                    GPSTaller.show('search-map', null, false);
                    $('#map_canvas').gmap3({
                        map: {
                            mapTypeId: google.maps.MapTypeId.SATELLITE
                        },
                        directionsrenderer: {
                            options: {
                                directions: results
                            }
                        }
                    }, 'autofit');
                }
            }
        });
    });

});
