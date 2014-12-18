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

app.use(express.static(__dirname + '/app')); // set the static files location /public/img will be /img for users
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
var Game = mongoose.model('Game', {
    item1: String,
    item2: String,
    imageUrl: String
});

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all todos
app.get('/api/games', function(req, res) {

    // use mongoose to get all todos in the database
    Game.find(function(err, games) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }


        res.json(games); // return all todos in JSON format
    });
});

// create todo and send back all todos after creation
app.post('/api/games', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Game.create({
        item1: req.body.item1,
        item2: req.body.item2,
        imageUrl: req.body.imageUrl
    }, function(err, game) {
        if (err) {
            res.send(err);
        }

        // get and return all the todos after you create another
        Game.find(function(err, games) {
            if (err) {
                res.send(err);
            }
            res.json(games);
        });
    });

});

// delete a todo
app.delete('/api/games/:game_id', function(req, res) {
    Game.remove({
        _id: req.params.game_id
    }, function(err, game) {
        if (err) {
            res.send(err);
        }

        // get and return all the todos after you create another
        Game.find(function(err, game) {
            if (err) {
                res.send(err);
            }
            res.json(game);
        });
    });
});



// listen (start app with node server.js) ======================================
app.listen(8080);
console.log('App listening on port 8080');
