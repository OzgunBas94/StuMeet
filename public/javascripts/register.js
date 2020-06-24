'use strict';
$('#register').click(function(e) {
    e.preventDefault();
    
    function getCookie(name) {
        var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
        var result = regexp.exec(document.cookie);
    return (result === null) ? null : result[1];
    }
    
    var username = getCookie("username");
    var email = getCookie("email");
    var password = getCookie("password");
    var passwordVfc = getCookie("passwordVfc");
    var birthday = getCookie("birthday");
    var gender = getCookie("gender");
    var interest = getCookie("interest");

    //var $gender = $('input[name="gender"]:checked');
    //var $interest = $('input[name="interest"]:checked');
    //var $username = $('#register-username');
    //var $email = $('#register-email');
    //var $password = $('#register-password');
    //var $passwordVerification = $('#register-passwordVerification');
    //var $birthday = $('#register-birthday');
    var user = {};

    //user.gender = $gender.val();
    //user.interest = $interest.val();
    //user.username = $username.val();
    //user.email = $email.val();
    //user.password = $password.val();
    //user.passwordVerification = $passwordVerification.val();
    //user.birthday = $birthday.val();
    
    user.gender = gender;
    user.interest = interest;
    user.username = username;
    user.email = email;
    user.password = password;
    user.passwordVerification = passwordVfc;
    user.birthday = birthday;

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/register',
        data: JSON.stringify(user),
        contentType: 'application/json'
    }).done(function(res) {
        console.log(res);
    }).fail(function(res) {
        var errors = res.responseJSON;
        console.log(errors);
    });
});
