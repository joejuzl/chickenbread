'use strict';

/**
 * @ngdoc function
 * @name chickenbreadApp.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
    .controller('CreateCtrl', function($scope, $location, game) {
        $scope.onClick = function() {
            game.addGame($scope.url, $scope.is, $scope.not, function(games) {
                console.log(games);
                if(!games.error){
            		$location.path('/mygames');
            	}
            	else{
            		$scope.message = user.error;
            	}
            });
        };
    });
