GPSTaller.detalle = function (tallerID) {
    $(".loader").fadeIn();

    GPSTaller.search({tallerID: tallerID}, function(data){
        $(".loader").fadeOut();
        $('#detalle_nombre').text(data[0].nombre);
        $('#detalle_direccion').text(data[0].direccion);
        $('#detalle_telefono').text(data[0].telefono);
        $('#detalle_email').text(data[0].email);
        $('#detalle_horario').text(data[0].horarioAtencion);
        $('#detalle_descripcion').text(data[0].descripcion);
        $('[nav="comentarios"]').data('tallerID', tallerID);
    });
}
