'use strict';

/**
 * @ngdoc function
 * @name chickenbreadApp.controller:WelcomeCtrl
 * @description
 * # WelcomeCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
  .controller('WelcomeCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
