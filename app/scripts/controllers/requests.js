'use strict';

/**
 * @ngdoc function
 * @name chickenbreadApp.controller:RequestsCtrl
 * @description
 * # RequestsCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
    .controller('RequestsCtrl', function($scope, $timeout, user) {
        user.getRequests(function(requestIds) {
            console.log(requestIds);
            var requests = requestIds;
            $scope.requests = [];
            requests.forEach(function(id) {
                user.getUser(id, function(u) {
                    $scope.requests.push(u);
                });
            });
        });

        $scope.accept = function(index) {
        	var id = $scope.requests[index]._id;
        	$scope.requests[index].name = "accepted";
        	user.acceptFriend(id, function() {
                $timeout(function() {
                    $scope.requests.splice(index, 1);
                }, 500);
            });
        };


    });
