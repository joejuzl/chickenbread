'use strict';

/**
 * @ngdoc function
 * @name chickenbreadApp.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
  .controller('CreateCtrl', function($scope, $location, asset) {
    $scope.left = true;
    $scope.submit = function() {
      console.log($scope.left);
      asset.submitGame($scope.item1, $scope.item2, $scope.image, $scope.left);
      $scope.item1 = $scope.item2 = $scope.image = ''; 
    };
    $scope.beginGame = function() {
      $location.path('/game');
    };
  });
