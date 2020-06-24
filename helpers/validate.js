'use strict';

var validator = require('validator');

function isEmpty(str) {
    return validator.isEmpty(str);
}

function isLength(str, options) {
    return validator.isLength(str, options);
}

function hasUpperCase(str) {
    return (/[A-Z]/.test(str));
}

function hasLowerCase(str) {
    return (/[a-z]/.test(str));
}

function hasNumber(str) {
    return (/[0-9]/.test(str));
}

function isSame(str1, str2) {
    return str1 === str2;
}

function isEmail(str) {
    var email = str.substr(str.indexOf('@') + 1);
    return email.includes('student.reutlingen-university.de');
}

function calculateAge(str) {
    var birthday = new Date(str);
    var currentDate = new Date();

    var calculateYear = currentDate.getFullYear();
    var calculateMonth = currentDate.getMonth();
    var calculateDay = currentDate.getDate();

    var birthYear = birthday.getFullYear();
    var birthMonth = birthday.getMonth();
    var birthDay = birthday.getDate();

    var age = calculateYear - birthYear;
    var ageMonth = calculateMonth - birthMonth;
    var ageDay = calculateDay - birthDay;

    if (ageMonth < 0 || (ageMonth == 0 && ageDay < 0)) {
        age = parseInt(age) - 1;
    }

    return age;
}

function isOverEighteen(str) {
    return calculateAge(str) >= 18;
}

module.exports.checkRegisterCredentials = function(user, callback) {
    var errors = [];

    if (!user.gender) {
        errors.push('Please select your gender');
    }

    if (!user.interest) {
        errors.push('Please select your interest');
    }

    if (isEmpty(user.username)) {
        errors.push('Please enter a username');
    }

    if (!isEmail(user.email)) {
        errors.push('Please enter a university email');
    }

    if (!isLength(user.password, { min: 8, max: 50 })) {
        errors.push('Please enter a password between 8 and 50 characters');
    }

    if (!hasLowerCase(user.password)) {
        errors.push('Please include at least one lowercase letter');
    }

    if (!hasUpperCase(user.password)) {
        errors.push('Please include at least one uppercase letter');
    }

    if (!hasNumber(user.password)) {
        errors.push('Please include at least one number');
    }

    // if (!hasSpecialCharacter(user.password)) {
    //     errors.push('Please include at least one special character');
    // }

    if (!isSame(user.password, user.passwordVerification)) {
        errors.push('Please make sure the passwords match');
    }

    if (!isOverEighteen(user.birthday)) {
        errors.push('Please make sure you are over 18');
    }

    callback(errors);
};

module.exports.checkLoginCredentials = function(user, callback) {
    var errors = [];

    if (isEmpty(user.username)) {
        errors.push('Please enter a username');
    }

    if (!isLength(user.password, { min: 8, max: 50 })) {
        errors.push('Please enter a password between 8 and 50 characters');
    }

    if (!hasLowerCase(user.password)) {
        errors.push('Please include at least one lowercase letter');
    }

    if (!hasUpperCase(user.password)) {
        errors.push('Please include at least one uppercase letter');
    }

    if (!hasNumber(user.password)) {
        errors.push('Please include at least one number');
    }

    callback(errors);
};
