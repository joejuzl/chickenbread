'use strict';

/**
 * @ngdoc function
 * @name chickenbreadApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp')
    .controller('MainCtrl', function($scope, $location, asset) {
        $scope.click = function() {
            $location.path('/create');
        };
        var response = asset.testApi();
        response.success(function(data, status, headers, config) {
            $scope.data =  data[0].item1;
        });
    });
