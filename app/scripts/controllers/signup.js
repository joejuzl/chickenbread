'use strict';

/**
 * @ngdoc function
 * @name chickenbreadApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
    .controller('SignupCtrl', function($scope, $location, user) {
        $scope.onClick = function() {
            user.createUser($scope.username, $scope.password, function(user) {
                console.log(user);
            	if(!user.error){
            		$location.path('/home');
            	}
            	else{
            		$scope.message = user.error;
            	}
            });
        };
    });
