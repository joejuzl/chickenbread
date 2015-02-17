'use strict';

/**
 * @ngdoc function
 * @name chickenbreadApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
    .controller('TestCtrl', function($scope) {
        $scope.game1 = {
            correctItem: "cat",
            incorrectItem: "dog",
            imageUrl: "http://i.huffpost.com/gen/964776/thumbs/o-CATS-KILL-BILLIONS-facebook.jpg"
        };
        $scope.game2 = {
            correctItem: "chicken",
            incorrectItem: "bread",
            imageUrl: "http://news.ucdavis.edu/photos_images/news_images/03_2011/chicken_lg.jpg"
        };
        $scope.games = [];
        $scope.games.push($scope.game1);
        $scope.games.push($scope.game2);



        $scope.cardSwipedLeft = function(index) {
            console.log('left');
        };


        $scope.cardSwipedRight = function(index) {
            console.log('right');
        };

        $scope.cardDestroyed = function(index) {
            console.log('destroyed');
        };

        $scope.cardPartialSwipe = function(index) {
            //console.log(index);
        };

    });
