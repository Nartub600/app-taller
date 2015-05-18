GPSTaller.comentarios = function(data) {
    $(".loader").fadeIn();

    $.ajax({
        url: GPSTaller.urls.comments,
        type: 'get',
        dataType: 'json',
        data: {
            id: data.tallerID,
            mail: GPSTaller.logged || ''
        },
        success: function(data) {
            $(".loader").fadeOut();
            $.each(data.comentarios, function(i, e){
                $('#com' + (i + 1) + '_comentario').text(e.comentario);
                $('#com' + (i + 1) + '_nombre').text(e.nombre);
                $('#com' + (i + 1) + '_fecha').text(e.fecha);
            });
            if(data.usuario.permiso == '2') {
                $('#comentarios_comentar').show();
            }
        }
    });
}
