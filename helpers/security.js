'use strict';

var bcrypt = require('bcryptjs');

const saltRounds = 10;

module.exports.encrypt = function(password, callback) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            callback(hash);
        });
    });
};

module.exports.check = function(password, hash, callback) {
    bcrypt.compare(password, hash, function(err, res) {
        callback(res);
    });
};
