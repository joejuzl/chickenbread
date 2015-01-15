'use strict';

/**
 * @ngdoc function
 * @name chickenbreadApp.controller:GamelistCtrl
 * @description
 * # GamelistCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
    .controller('MygamesCtrl', function($scope, user, game) {
        user.getUserGames(function(gameIds) {
            var games = gameIds;
            $scope.games = [];
            games.forEach(function(id) {
                game.getGame(id, function(g) {
                    $scope.games.push(g);
                });
            });
        });
    });
