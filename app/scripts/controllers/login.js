'use strict';

/**
 * @ngdoc function
 * @name chickenbreadApp.controller:LoginctrlCtrl
 * @description
 * # LoginctrlCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
    .controller('LoginCtrl', function($scope, $location, user) {
        $scope.onClick = function() {
            user.login($scope.username, $scope.password, function(user) {
            	if(!user.error){
            		$location.path('/home');
            	}
            });
        };
    });
