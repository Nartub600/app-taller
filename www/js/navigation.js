GPSTaller.visited = ['index'];

$(function(){
//document.addEventListener("deviceready", function() {

    $('body').on('click', '[nav]', function(e){
        e.preventDefault();

        var actual = $('[page]:visible').attr('id');
        var next = $(this).attr('nav');

        if(next != actual) {
            $('[page]:visible').hide();
            $('[page][id="' + next + '"]').show();
            if($('[page][id="' + next + '"]').attr('callback')) {
                var func = $('[page][id="' + next + '"]').attr('callback') + "();";
                eval(func);
            }
            GPSTaller.visited.push(next);
        }
    });

    document.addEventListener("backbutton", function(e){
        e.preventDefault();

        if(GPSTaller.visited.length >= 2) {
            GPSTaller.visited.pop();
            var next = GPSTaller.visited[GPSTaller.visited.length - 1];
            $('[page]:visible').hide();
            $('[page][id="' + next + '"]').show();
            if($('[page][id="' + next + '"]').attr('callback')) {
                var func = $('[page][id="' + next + '"]').attr('callback') + "();";
                eval(func);
            }
        } else {
            navigator.app.exitApp();
        }

    }, false);

}, false);
