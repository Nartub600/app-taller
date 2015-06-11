document.addEventListener("deviceready", function() {
// $(function(){
    $.mobile.loading().hide();

    $.ajax({
        url: GPSTaller.urls.faq,
        type: 'get',
        dataType: 'json',
        success: function(data) {
            $.each(data, function(i, e){
                $('.content-preguntas').append("<div class=\"item-pregunta\"><p class=\"pregunta\">" + e.pregunta + "</p><p class=\"respuesta\">" + e.respuesta + "</p></div>");
            });
        }
    });

    if (window.localStorage['user_email'] === undefined ||  window.localStorage['user_email'] === 'undefined' || window.localStorage['user_email'] === 'null') { // no hay usuario
        $('[auth]').hide();
        $('[noauth]').show();
    } else { // hay usuario
        $('[auth]').show();
        $('[noauth]').hide();
    }

}, false);

document.addEventListener("offline", function(){

}, false);

document.addEventListener("online", function(){

}, false);
