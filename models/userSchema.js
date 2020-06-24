var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    gender: String,
    interest: String,
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    hash: String,
    birthday: String
});

module.exports = mongoose.model('User', UserSchema);
