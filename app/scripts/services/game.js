'use strict';

/**
 * @ngdoc service
 * @name chickenbreadApp.game
 * @description
 * # game
 * Service in the chickenbreadApp.
 */
angular.module('chickenbreadApp')
    .service('game', function(config, error) {

        return {
            addGame: function(url, is, not) {
                $http.post(config.url + '/api/games', {
                        imageUrl: url,
                        correctItem: is,
                        incorrectItem: not,
                    })
                    .success(function() {
                        //do
                    })
                    .error(function(e) {
                        error.log(e);
                    });
            },
            getGame: function(id) {

            }
        };
    });
