'use strict';

// server.js

// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

mongoose.connect('mongodb://localhost:27017'); // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/www')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());


// define model =================
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

//Games
var Game = mongoose.model('Game', {
    imageUrl: String,
    correctItem: String,
    incorrectItem: String,
});

//Users
var User = mongoose.model('User', {
    name: String,
    password: String,
    friends: [ObjectId],
    userGames: [ObjectId],
    receivedGames: [ObjectId],
    receivedRequests: [ObjectId],
    sentRequests: [ObjectId]
});

//get game
app.get('/api/games/:game_id', function(req, res) {
    Game.findOne({
        _id: req.params.game_id
    }, function(err, game) {
        if (err) {
            res.send(err);
        }
        if (game) {
            // doc may be null if no document matched
            res.send(game);
        } else {
            res.send({
                error: 'game not found'
            });
        }
    });
});

//add game
app.post('/api/games', function(req, res) {
    Game.create({
        imageUrl: req.body.imageUrl,
        correctItem: req.body.correctItem,
        incorrectItem: req.body.incorrectItem,
    }, function(err, game) {
        if (err) {
            res.send(err);
        }
        User.findByIdAndUpdate(
            req.body.user_id, {
                $push: {
                    'userGames': game._id
                }
            }, {
                safe: true,
                upsert: true
            },
            function(err, user) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(user.userGames);
                }
            }
        );

    });

});

//remove game
app.delete('/api/games/:game_id', function(req, res) {
    Game.remove({
        _id: req.params.game_id
    }, function(err, game) {
        if (err) {
            res.send(err);
        }
        Game.find(function(err, game) {
            if (err) {
                res.send(err);
            }
            res.json(game);
        });
    });
});


//create user
app.post('/api/users', function(req, res) {
    User.findOne({
        'name': req.body.name
    }, function(err, user) {
        if (err) {
            res.send(err);
        }
        if (user) {
            res.send({
                error: 'user already exists'
            });
        } else {
            User.create({
                name: req.body.name,
                password: req.body.password,
                friends: [],
                userGames: [],
                receivedGames: [],
                receivedRequests: [],
                sentRequests: []
            }, function(err, user) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(user);
                }
            });
        }
    });
});

//login
app.put('/api/users', function(req, res) {
    User.findOne({
        'name': req.body.name
    }, function(err, user) {
        if (err) {
            res.send(err);
        }
        if (user) {
            // doc may be null if no document matched
            if (user.password == req.body.password) {
                res.send(user);
            } else {
                res.send({
                    error: 'incorrect password'
                });
            }
        } else {
            res.send({
                error: 'user not found'
            });
        }
    });
});

// get user
app.get('/api/users/:user_id', function(req, res) {
    User.findOne({
        _id: req.params.user_id
    }, function(err, user) {
        if (err) {
            res.send(err);
        }
        if (user) {
            // doc may be null if no document matched
            res.send(user);
        } else {
            res.send({
                error: 'user not found'
            });
        }
    });
});

// search user by name
app.put('/api/users/:user_name', function(req, res) {
    User.findOne({
        name: req.params.user_name
    }, function(err, user) {
        if (err) {
            res.send(err);
        }
        if (user) {
            // doc may be null if no document matched
            res.send(user);
        } else {
            res.send({
                error: 'no matches for that username'
            });
        }
    });
});

//get user games
app.get('/api/users/:user_id/user_games', function(req, res) {
    User.findOne({
        _id: req.params.user_id
    }, function(err, user) {
        if (err) {
            res.send(err);
        }
        if (user) {
            // doc may be null if no document matched
            //IF THE CURRENT USER OR A FRIEND OF CURRENT USER
            res.send(user.userGames);
        } else {
            res.send({
                error: 'user not found'
            });
        }
    });
});


// get recieved games
app.get('/api/users/:user_id/received_games', function(req, res) {
    User.findOne({
        _id: req.params.user_id
    }, function(err, user) {
        if (err) {
            res.send(err);
        }
        if (user) {
            // doc may be null if no document matched
            res.send(user.receivedGames);
        } else {
            res.send({
                error: 'user not found'
            });
        }
    });
});

//get friends
app.get('/api/users/:user_id/friends', function(req, res) {
    User.findOne({
        _id: req.params.user_id
    }, function(err, user) {
        if (err) {
            res.send(err);
        }
        if (user) {
            // doc may be null if no document matched
            res.send(user.friends);
        } else {
            res.send({
                error: 'user not found'
            });
        }
    });
});

//get sent friend requests
app.get('/api/users/:user_id/sent_requests', function(req, res) {
    User.findOne({
        _id: req.params.user_id
    }, function(err, user) {
        if (err) {
            res.send(err);
        }
        if (user) {
            // doc may be null if no document matched
            res.send(user.sentRequests);
        } else {
            res.send({
                error: 'user not found'
            });
        }
    });
});

//get received friend requests
app.get('/api/users/:user_id/received_requests', function(req, res) {
    User.findOne({
        _id: req.params.user_id
    }, function(err, user) {
        if (err) {
            res.send(err);
        }
        if (user) {
            // doc may be null if no document matched
            res.send(user.receivedRequests);
        } else {
            res.send({
                error: 'user not found'
            });
        }
    });
});

//send friend request
//CHECK IF ALREADY FRIEND?
app.post('/api/users/:user_id/send_request', function(req, res) {
    User.findByIdAndUpdate(
        req.params.user_id, {
            $push: {
                'sentRequests': req.body.friend_id
            }
        }, {
            safe: true,
            upsert: true
        },
        function(err, user) {
            if (err) {
                res.send(err);
            } else {
                User.findByIdAndUpdate(
                    req.body.friend_id, {
                        $push: {
                            'receivedRequests': req.params.user_id
                        }
                    }, {
                        safe: true,
                        upsert: true
                    },
                    function(err, friend) {
                        if (err) {
                            res.send(friend);
                        } else {
                            res.send(user);
                        }
                    }
                );
            }
        }
    );
});

//accept friend request
app.post('/api/users/:user_id/accept_request', function(req, res) {
    User.findByIdAndUpdate(
        req.params.user_id, {
            $pull: {
                'receivedRequests': req.body.friend_id
            },
            $push: {
                'friends': req.body.friend_id
            }
        }, {
            safe: true,
            upsert: true
        },
        function(err, model) {
            if (err) {
                res.send(err);
            } else {
                User.findByIdAndUpdate(
                    req.body.friend_id, {
                        $pull: {
                            'sentRequests': req.params.user_id
                        },
                        $push: {
                            'friends': req.params.user_id
                        }
                    }, {
                        safe: true,
                        upsert: true
                    },
                    function(err, model) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send(null);
                        }
                    }
                );
            }
        }
    );
});



// listen (start app with node server.js) ======================================
app.listen(8080);
console.log('App listening on port 8080');
