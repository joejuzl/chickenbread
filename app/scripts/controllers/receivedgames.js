'use strict';

/**
 * @ngdoc function
 * @name chickenbreadApp.controller:ReceivedgamesCtrl
 * @description
 * # ReceivedgamesCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
    .controller('ReceivedgamesCtrl', function($scope, user, game) {
        user.getReceivedGames(function(gameIds) {
            var games = gameIds;
            $scope.games = [];
            $scope.showButtons = [];
            games.forEach(function(id) {
                game.getGame(id, function(g) {
                    $scope.games.push(g);
                    $scope.showButtons.push(false);
                });
            });
        });



        $scope.onClick = function(index) {
            $scope.showButtons.map(function(a, i, ar) {
                ar[i] = false;
            });
            $scope.showButtons[index] = true;
        };
    });
