'use strict';

/**
 * @ngdoc service
 * @name chickenbreadApp.game
 * @description
 * # game
 * Service in the chickenbreadApp.
 */
angular.module('chickenbreadApp')
    .service('game', function($http, config, error, user) {

        return {
            //add game for user, return all users games
            addGame: function(url, is, not, callback) {
                user.getId(function(id) {
                    $http.post(config.url + '/api/games', {
                            imageUrl: url,
                            correctItem: is,
                            incorrectItem: not,
                            user_id: id
                        })
                        .success(function(games) {
                            callback(games);
                        })
                        .error(function(e) {
                            error.log(e);
                        });
                });
            },
            getGame: function(id, callback) {
                $http.get(config.url + '/api/games/' + id)
                    .success(function(game) {
                        callback(game);
                    })
                    .error(function(e) {
                        error.log(e);
                    });
            }
        };
    });
