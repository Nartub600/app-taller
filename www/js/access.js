$(function(){

    $('#btn_register').on('click', function(e){
        e.preventDefault();

        GPSTaller.registro($('#reg_email').val(), $('#reg_firstname').val(), $('#reg_lastname').val(), $('#reg_password').val(), function(data){
            alert(data);
        });
    });

    $('#btn_login').on('click', function(e){
        e.preventDefault();

        GPSTaller.login($('#login_email').val(), $('#login_password').val(), function(data){
            alert(data.login);
        });
    });

});
