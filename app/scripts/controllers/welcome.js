'use strict';

/**
 * @ngdoc function
 * @name chickenbreadApp.controller:WelcomeCtrl
 * @description
 * # WelcomeCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
  .controller('WelcomeCtrl', function ($scope, user) {
  		user.logout();
  });
