GPSTaller.visited = ['index'];

function backbuttonHandler(e) {
    e.preventDefault();

    if (GPSTaller.visited.length >= 2) {
        GPSTaller.visited.pop();
        var next = GPSTaller.visited[GPSTaller.visited.length - 1];
        GPSTaller.show(next, $(e.currentTarget).data());
    } else {
        navigator.app.exitApp();
    }
}

// document.addEventListener("deviceready", function() {
$(function(){

    $('body').on('click', '[nav]', function(e){
        e.preventDefault();

        var actual = $('[page]:visible').attr('id');
        var next = $(this).attr('nav');

        if (next != actual) {
            GPSTaller.show(next, $(e.currentTarget).data());
            GPSTaller.visited.push(next);
        }
    });

    document.addEventListener("backbutton", backbuttonHandler, false);

    $('#btn_volver').on('click', backbuttonHandler);

    $('#btn_guardar').on('click', function(e){
        e.preventDefault();
        $('#btn_volver_settings').trigger('click');
    });

}, false);
