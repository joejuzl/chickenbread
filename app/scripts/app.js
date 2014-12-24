'use strict';

/**
 * @ngdoc overview
 * @name chickenbreadApp
 * @description
 * # chickenbreadApp
 *
 * Main module of the application.
 */
angular
    .module('chickenbreadApp', [
        'ionic',
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngDraggable',
        'mobile-angular-ui'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/game', {
                templateUrl: 'views/game.html',
                controller: 'GameCtrl'
            })
            .when('/create', {
                templateUrl: 'views/create.html',
                controller: 'CreateCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .constant("config", {
        "url": "http://10.22.155.158:8080",
    });


var PhoneGapInit = function() {
    this.boot = function() {
        angular.bootstrap(document, ['chickenbreadApp']);
    };

    if (window.phonegap !== undefined) {
        document.addEventListener('deviceready', function() {
            this.boot();
        });
    } else {
        console.log('PhoneGap not found, booting Angular manually');
        this.boot();
    }
};

angular.element(document).ready(function() {
    new PhoneGapInit();
});
