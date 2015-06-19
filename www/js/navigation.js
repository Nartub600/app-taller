GPSTaller.visited = ['index'];

function navigationHandler(e) {
    e.preventDefault();

    var actual = $('[page]:visible').attr('id');
    var next = $(this).attr('nav');
    GPSTaller.visited.push(next);

    if (next != actual) {
        GPSTaller.show(next);
    }
}

function backbuttonHandler(e) {
    e.preventDefault();

    if (GPSTaller.visited.length >= 2) {
        GPSTaller.visited.pop();
        var next = GPSTaller.visited[GPSTaller.visited.length - 1];
        GPSTaller.show(next, null, false);
    } else {
        navigator.app.exitApp();
    }
}

document.addEventListener("deviceready", function() {
// $(function(){

    $('body').on('click', '[nav]', navigationHandler);

    document.addEventListener("backbutton", backbuttonHandler, false);

    $('#btn_volver').on('click', backbuttonHandler);

    $('#btn_guardar').on('click', function(e){
        e.preventDefault();
        $('#btn_volver_settings').trigger('click');
    });

    $('#btn_asegura, #btn_historia').on('click', function(e){
        e.preventDefault();

        alert('Próximamente');
    });

}, false);
