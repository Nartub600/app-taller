GPSTaller.comentarios = function (data) {
    GPSTaller.alert();

    $('#comentarios_nombre').text('');
    $('#comentarios_lista').html('');
    $('#comentarios_comentario').val('');
    $('#comentarios_stars').val('');
    $('#comentarios_rating').val('');
    $('#comentarios_form').hide();
    $('[star]').find('img').attr('src', 'img/estrella-0.png');

    var tallerID = data.tallerID;

    GPSTaller.search({
        tallerID: tallerID
    }, function(data){
        $('#comentarios_nombre').text(data[0].nombre);
    });

    $.ajax({
        url: GPSTaller.urls.comments,
        type: 'get',
        dataType: 'json',
        data: {
            id: tallerID,
            mail: GPSTaller.loggedUser || ''
        },
        success: function(data) {
            // GPSTaller.alertClose();
            $('#comentarios_btn').attr('tallerID', tallerID);
            if (data.comentarios) {
                $.each(data.comentarios, function(i, e){
                    $('#comentarios_lista').append("<div class=\"comentario\"><p class=\"titulo-comentario\">" + e.comentario + "</p><p class=\"datos-usuario-comentario\">" + e.nombre + " " + e.fecha + "<img class=\"img-rating-comentario\" src=\"img/rating-" + e.rating + ".png\" /></p><div class=\"line-02\"></div></div>");
                });
            } else {
                $('#comentarios_lista').append("<p>Este taller no tiene comentarios</p>")
            }
            switch (data.permisos[0].code) {
                case 200:
                    $('#comentarios_form').show();
                    break;
                case 0:
                case 1:
                case 2:
                    GPSTaller.alert(data.permisos[0].mensaje, true);
                    break;
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

        if (GPSTaller.loggedUser == '') {
            GPSTaller.show('login');
        } else {
            GPSTaller.alert();

            var data = {
                hash: GPSTaller.hash,
                action: 'comentar',
                id: $('#comentarios_btn').attr('tallerID'),
                mail: GPSTaller.loggedUser,
                calificacion: $('#comentarios_rating').val(),
                comentario: $('#comentarios_comentario').val()
            };

            $.ajax({
                url: GPSTaller.urls.comments,
                type: 'get',
                dataType: 'json',
                data: data,
                beforeSend: function() {
                    if ($('#comentarios_comentario').val() == '') {
                        GPSTaller.alert('Ingrese su comentario', true);
                        return false;
                    }
                    if ($('#comentarios_rating').val() == '') {
                        GPSTaller.alert('Ingrese su calificación', true);
                        return false;
                    }
                    return true;
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
        }

    });

});
