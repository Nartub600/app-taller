GPSTaller.comentarios = function (data) {
    GPSTaller.alert();

    $('#comentarios_nombre').text('');
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
            mail: GPSTaller.loggedUser || ''
        },
        success: function(data) {
            GPSTaller.alertClose();
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

document.addEventListener("deviceready", function() {
// $(function(){

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
                mail: window.localStorage['user_email'],
                calificacion: $('#comentarios_rating').val(),
                comentario: $('#comentarios_comentario').val()
            },
            success: function(data) {
                if (data[0].status == 'ok') {
                    GPSTaller.alert(data[0].mensaje, true);
                    GPSTaller.visited = ['index'];
                    GPSTaller.show('index');
                } else {
                    GPSTaller.alert(data[0].mensaje, true);
                }
            }
        });
    });

});
