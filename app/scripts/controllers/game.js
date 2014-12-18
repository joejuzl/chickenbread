'use strict';

/**
 * @ngdoc function
 * @name chickenbreadApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
  .controller('GameCtrl', function($scope, $timeout, game, drag) {

    $scope.imagePath = game.getCurrentAsset;
    $scope.showImage = true;
    $scope.leftItem = game.getLeftType;
    $scope.rightItem = game.getRightType;
    $scope.resultMessage = game.getResultMessage;
    $scope.imageClass = drag.getImageClass;
    game.nextGame();

    $scope.onDrop = function(data) {
      $scope.showImage = false;
      var promise = game.resolveGame(data);
      promise.then(function() {
        $scope.showImage = true;
      });
    };

    $scope.onDragBegin = function() {
      drag.onDragBegin();
    };

    $scope.onDragEnd = function() {
      drag.onDragEnd();
    };

  });
