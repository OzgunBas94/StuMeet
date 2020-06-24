var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var session = require('express-session');

var app = express();

var db = require('./controllers/database');
var validate = require('./helpers/validate');
var security = require('./helpers/security');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use('/views', express.static(__dirname + '/views'));
app.use('/css', express.static(path.join(__dirname, '/public/stylesheets')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/public/javascripts')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/img', express.static(path.join(__dirname,'/img')));

var port = process.env.PORT || 8080;
var router = express.Router();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/secure', restrict, function(req, res) {
    res.sendFile(__dirname + '/views/secure.html');
});

app.get('/next', restrict, function(req, res) {
    res.sendFile(__dirname + '/views/registration.html');
});

router.use(function(req, res, next) {
    next();
});

router.route('/nextRegister').get(function(req, res) {
    res.status(200).send('/next');
});

router.route('/register').post(function(req, res) {
    var registerUser = req.body;
    validate.checkRegisterCredentials(registerUser, function(errors) {
        if (errors.length !== 0) {
            res.status(409).send(errors);
        } else {
            security.encrypt(registerUser.password, function(hash) {
                delete registerUser.password;
                delete registerUser.passwordVerification;
                registerUser.hash = hash;
                db.createUser(registerUser, function(error) {
                    if (error) {
                        res.status(409).send(error);
                    } else {
                        res.status(201).send({ msg: 'User has been successfully registered' });
                    }
                });
            });
        }
    });
});

router.route('/login').get(function(req, res) {
    var loginUser = {
        username: req.query.username,
        password: req.query.password
    };
    validate.checkLoginCredentials(loginUser, function(errors) {
        if (errors.length !== 0) {
            res.status(409).send(errors);
        } else {
            db.findUser(loginUser.username, function(error, dbUser) {
                if (error) {
                    res.status(409).send(error);
                } else {
                    security.check(loginUser.password, dbUser[0].hash, function(registered) {
                        if (registered) {
                            req.session.user = dbUser[0].username;
                            res.status(200).send('/secure');
                        } else {
                            res.status(500).send({ msg: 'Password given does not match' });
                        }
                    })
                }
            });
        }
    });
});

router.route('/logout').get(function(req, res) {
    req.session.destroy(function(error) {
        res.status(200).send('/');
    });
});

function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied';
        res.redirect('/');
    }
}

app.use('/api', router);
app.listen(port);
console.log("Server is running on port " + port);
