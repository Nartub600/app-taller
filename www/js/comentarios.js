GPSTaller.comentarios = function(data) {
    $(".loader").fadeIn();

    $('#comentarios_lista').html('');

    GPSTaller.search({
        tallerID: data.tallerID
    }, function(data){
        $('#comentarios_nombre').text(data[0].nombre);
    });

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
            $('#comentarios_btn').attr('tallerID', data.tallerID);
            $.each(data.comentarios, function(i, e){
                $('#comentarios_lista').append("<div class=\"comentario\"><p class=\"titulo-comentario\">" + e.comentario + "<p class=\"datos-usuario-comentario\">" + e.nombre + " " + e.fecha + "<img class=\"img-rating-comentario\" src=\"img/rating-" + e.rating + ".png\" /></p><div class=\"line-02\"></div></div>");
            });
            if(data.usuario.permiso == '2') {
                $('#comentarios_comentar').show();
            }
        }
    });
}

$(function(){

    $('[star]').on('click', function(e){
        e.preventDefault();

        for(var i = 1; i <= $(e.currentTarget).attr('star'); i++) {
            $('[star="' + i + '"]').find('img').attr('src', 'img/estrella-1.png');
        }

        $('#comentarios_rating').val($(e.currentTarget).attr('star'));
    });

    $('#comentarios_btn').on('click', function(e) {
        e.preventDefault();

        $.ajax({
            url: GPSTaller.urls.comments,
            type: 'post',
            dataType: 'json',
            data: {
                action: 'comentar',
                id: $('#comentarios_btn').attr('tallerID'),
                mail: GPSTaller.logged,
                calificacion: $('#comentarios_rating').val(),
                comentario: $('#comentarios_comentario').val()
            },
            success: function(data) {
                switch(data.comentario) {
                    case 1:
                        alert('Gracias por su comentario');
                        GPSTaller.show('index');
                        break;
                    case 2:
                        alert('Debe elegir una calificación');
                        break;
                    case 3:
                        alert('Debe ingresar un comentario');
                        break;
                    case 4:
                        alert('Hay un problema con el email');
                        break;
                    case 5:
                        alert('No tiene permiso para comentar');
                        break;
                    case 6:
                        alert('El usuario ya comentó hace menos de una hora');
                        break;
                }
            }
        });
    });

});
