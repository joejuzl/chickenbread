'use strict';

/**
 * @ngdoc function
 * @name chickenbreadApp.controller:SendCtrl
 * @description
 * # SendCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
    .controller('SendCtrl', function($scope, $stateParams, $location, user) {
        var game_id = $stateParams.game_id;
        console.log(game_id);
        user.getFriends(function(friendIds) {
            var friends = friendIds;
            $scope.friends = [];
            $scope.showButtons = [];
            friends.forEach(function(id) {
                user.getUser(id, function(u) {
                    $scope.friends.push(u);
                    $scope.showButtons.push(false);
                });
            });
        });

        $scope.onClick = function(index, e) {
            $scope.hide(e);
            $scope.showButtons[index] = true;
        };

        $scope.hide = function(e) {
            $scope.showButtons.map(function(a, i, ar) {
                ar[i] = false;
            });
            e.stopPropagation();
        };

        $scope.send = function(index) {
            user.sendGame($scope.friends[index]._id,game_id, function(){
                $location.path('/mygames');
            });
        };


    });
