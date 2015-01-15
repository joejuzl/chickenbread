'use strict';

/**
 * @ngdoc function
 * @name chickenbreadApp.controller:FriendsCtrl
 * @description
 * # FriendsCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
    .controller('FriendsCtrl', function($scope, $location) {
        $scope.changeView = function(page) {
            $location.path('/' + page);
        };
    });
