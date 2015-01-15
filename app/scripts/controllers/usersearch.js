'use strict';

/**
 * @ngdoc function
 * @name chickenbreadApp.controller:UsersearchCtrl
 * @description
 * # UsersearchCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
    .controller('UsersearchCtrl', function($scope, $location, $timeout, user) {
        var id;
        $scope.search = function() {
            //make dynamic search as text is input?
            user.searchUser($scope.username, function(result) {
                if (!result.error) {
                    id = result._id;
                    $scope.msg = result.name;
                    $scope.showAddButton = true;
                } else {
                    $scope.msg = result.error;
                }
            });
        };
        $scope.addFriend = function() {
            $scope.showAddButton = false;
            $scope.msg = "request sent";
            user.addFriend(id, function() {
                $timeout(function() {
                    $location.path('/friends');
                }, 500);
            });


        };
    });
