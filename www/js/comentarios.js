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
            $('#comentarios_btn').attr('tallerID', data.tallerID);
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
