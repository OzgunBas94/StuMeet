'use strict';

var mongoose = require('mongoose');
var User = require('../models/userSchema');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://StuMeet:stumeet123@ds145188.mlab.com:45188/stumeet');

module.exports.createUser = function(user, callback) {
    var newUser = new User({
        gender: user.gender,
        interest: user.interest,
        username: user.username,
        email: user.email,
        hash: user.hash,
        birthday: user.birthday
    });

    newUser.save(function(error) {
        if (error) {
            console.log(error);
        }
        callback(error);
    });
};

module.exports.findUser = function(username, callback) {
    User.find({ username: username }, function(error, user) {
        if (error) {
            console.log(error);
        }
        callback(error, user);
    });
};
