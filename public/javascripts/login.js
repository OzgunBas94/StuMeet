'use strict';

$('#login').click(function(e) {
    e.preventDefault();

    var $username = $('#login-username');
    var $password = $('#login-password');
    var user = {};

    user.username = $username.val();
    user.password = $password.val();

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/login',
        data: user,
        contentType: 'application/json'
    }).done(function(res) {
        window.location = res;
    }).fail(function(res) {
        var errors = res.responseJSON;
        console.log(errors);
    });
});
