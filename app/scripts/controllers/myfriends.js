'use strict';

/**
 * @ngdoc function
 * @name chickenbreadApp.controller:FriendlistCtrl
 * @description
 * # FriendlistCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
    .controller('MyfriendsCtrl', function($scope, user) {
        user.getFriends(function(friendIds) {
            var friends = friendIds;
            $scope.friends = [];
            friends.forEach(function(id) {
                user.getUser(id, function(u) {
                    $scope.friends.push(u);
                });
            });
        });
    });
