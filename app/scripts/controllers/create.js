'use strict';

/**
 * @ngdoc function
 * @name chickenbreadApp.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
    .controller('CreateCtrl', function($scope, $location, $state, $timeout, game, camera, error, image) {

        $scope.image = {
            url: null,
            is: null,
            aint: null
        };

        console.log('reloaded');

        $scope.takePhoto = function() {
            camera.takePicture().then(function(imageData) {
                uploadImage(imageData);
            }, function(err) {
                error.log(err);
            });
        };
        $scope.selectPhoto = function() {
            camera.selectPicture().then(function(imageData) {
                uploadImage(imageData);
            }, function(err) {
                error.log(err);
            });
        };

        var uploadImage = function(imageData) {
            image.upload(imageData, function(imageUrl) {
                $scope.imageUrl = imageUrl;
                $state.go('create.viewimage');
            });
        };

        $scope.confirmImage = function() {
            $state.go('create.is');
        };


        $scope.submitGame = function() {
            game.addGame($scope.imageUrl, $scope.is, $scope.aint, function(games) {
                console.log(games);
                if (!games.error) {
                    $location.path('/mygames');
                } else {
                    $scope.message = games.error;
                }
            });
        };



    });
