'use strict';
/*global console: false, angular: false */
/**
 * @ngdoc function
 * @name chickenbreadApp.controller:PlayCtrl
 * @description
 * # PlayCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
    .controller('PlayCtrl', function($scope, $stateParams, game) {
        var id = $stateParams.game_id;
        game.getGame(id, function(game) {
            $scope.game = game;
            $scope.games = [];
            $scope.games.push($scope.game);
        });



        $scope.cardSwipedLeft = function(index) {
            console.log('left');
        };


        $scope.cardSwipedRight = function(index) {
            console.log('right');
        };

        $scope.cardDestroyed = function(index) {
            console.log('destroyed');
        };

        $scope.cardPartialSwipe = function(index) {
            console.log('destroyed');
        };

    });