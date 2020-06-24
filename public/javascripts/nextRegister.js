'use strict';

var username = $('#register-username').val();
var email = $('#register-email').val();
var pwd = $('#register-password').val();
var pwdVerification = $('#register-passwordVerification')
var birthday = $('#register-birthday').val();
var gender = $('input[name=gender]:checked').val();
var interest = $('input[name=interest]:checked').val();
     
document.cookie = "username="+username+"; email="+email+"; password="+pwd+"; passwordVfc="+pwdVerification+"; birthday="+birthday+"; gender="+"; interest="+interest;
         
$('#next').click(function(e){
e.preventDefault();
             
 $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/api/nextRegister',
    contentType: 'application/json'
    }).done(function(res) {
     console.log(res);
    }).fail(function(res) {
     var errors = res.responseJSON;
     console.log(errors);
    });
});