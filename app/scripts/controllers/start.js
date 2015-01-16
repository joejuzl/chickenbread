'use strict';

/**
 * @ngdoc function
 * @name chickenbreadApp.controller:StartCtrl
 * @description
 * # StartCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
    .controller('StartCtrl', function($scope, $location, user) {
        user.getId(function(id) {
            if (id) {
                $location.path('/home');
            } else{
            	$location.path('/welcome');
            }
        });
    });
