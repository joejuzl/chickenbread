'use strict';

/**
 * @ngdoc function
 * @name chickenbreadApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
  .controller('GameCtrl', function ($scope, $location) {
  	$scope.changeView = function(page){
  		$location.path('/'+page);
  	};
  });
