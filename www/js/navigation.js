GPSTaller.visited = ['index'];

// document.addEventListener("deviceready", function() {
$(function(){

    $('body').on('click', '[nav]', function(e){
        e.preventDefault();

        var actual = $('[page]:visible').attr('id');
        var next = $(this).attr('nav');

        if (next != actual) {
            GPSTaller.show(next, $(e.target).data());
            GPSTaller.visited.push(next);
        }
    });

    document.addEventListener("backbutton", function(e){
        e.preventDefault();

        if (GPSTaller.visited.length >= 2) {
            GPSTaller.visited.pop();
            var next = GPSTaller.visited[GPSTaller.visited.length - 1];
            GPSTaller.show(next, $(e.target).data());
        } else {
            navigator.app.exitApp();
        }

    }, false);

    $('#btn_guardar').on('click', function(e){
        e.preventDefault();
        $('#btn_volver').trigger('click');
    });

}, false);
