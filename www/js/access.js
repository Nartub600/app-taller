$(function(){

    $('#btn_login').on('click', function(e){
        e.preventDefault();

        GPSTaller.login($('#login_email').val(), $('#login_password').val(), function(data){
            alert(data.login);
        });
    });

});
