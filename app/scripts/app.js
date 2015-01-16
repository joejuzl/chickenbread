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
    ])
    .config(function($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('start', {
                url: '/',
                templateUrl: '',
                controller: 'StartCtrl'
            })
            .state('welcome', {
                url: '/welcome',
                templateUrl: 'views/welcome.html',
                controller: 'WelcomeCtrl'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'views/signup.html',
                controller: 'SignupCtrl'
            })
            .state('create', {
                url: '/create',
                templateUrl: 'views/create.html',
                controller: 'CreateCtrl'
            })
            .state('mygames', {
                url: '/mygames',
                templateUrl: 'views/mygames.html',
                controller: 'MygamesCtrl'
            })
            .state('receivedgames', {
                url: '/receivedgames',
                templateUrl: 'views/receivedgames.html',
                controller: 'ReceivedgamesCtrl'
            })
            .state('play', {
                url: '/play/:game_id',
                templateUrl: 'views/play.html',
                controller: 'PlayCtrl'
            })
            .state('game', {
                url: '/game',
                templateUrl: 'views/game.html',
                controller: 'GameCtrl'
            })
            .state('friends', {
                url: '/friends',
                templateUrl: 'views/friends.html',
                controller: 'FriendsCtrl'
            })
            .state('myfriends', {
                url: '/myfriends',
                templateUrl: 'views/myfriends.html',
                controller: 'MyfriendsCtrl'
            })
            .state('person', {
                url: '/person',
                templateUrl: 'views/person.html',
                controller: 'PersonCtrl'
            })
            .state('usersearch', {
                url: '/usersearch',
                templateUrl: 'views/usersearch.html',
                controller: 'UsersearchCtrl'
            })
            .state('requests', {
                url: '/requests',
                templateUrl: 'views/requests.html',
                controller: 'RequestsCtrl'
            }).state('send', {
                url: '/send/:game_id',
                templateUrl: 'views/send.html',
                controller: 'SendCtrl'
            });


    })
    .constant("config", {
        "url": "http://10.69.50.55:8080",
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
