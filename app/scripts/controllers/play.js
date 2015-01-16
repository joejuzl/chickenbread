'use strict';

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
        game.getGame(id, function(game){
        	$scope.game = game;
        });

    });
