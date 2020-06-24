'use strict';

$('#logout').click(function(e) {
    e.preventDefault();

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/logout'
    }).done(function(res) {
        window.location = res;
    });
});
