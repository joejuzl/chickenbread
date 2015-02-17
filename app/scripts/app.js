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
        'ionic.contrib.ui.tinderCards',
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
                abstract: true,
                url: '/create',
                templateUrl: 'views/create.html',
                controller: 'CreateCtrl'
            })
            .state('create.imagetype', {
                url: '/imagetype',
                templateUrl: 'views/create-imagetype.html'
            })
            .state('create.submiturl', {
                url: '/submiturl',
                templateUrl: 'views/create-submiturl.html',
            })
            .state('create.viewimage', {
                url: '/viewimage',
                templateUrl: 'views/create-viewimage.html',
            })
            .state('create.is', {
                url: '/is',
                templateUrl: 'views/create-is.html',
            })
            .state('create.aint', {
                url: '/aint',
                templateUrl: 'views/create-aint.html',
            })
            .state('create.submit', {
                url: '/submit',
                templateUrl: 'views/create-submit.html',
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
            }).state('test', {
                url: '/test',
                templateUrl: 'views/play.html',
                controller: 'TestCtrl'
            });


    })


.constant("config", {
    "url": "http://192.168.0.5:8080",
})

.config(['$compileProvider', function($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);
}]);



var PhoneGapInit = function() {
    this.boot = function() {
        angular.bootstrap(document, ['chickenbreadApp']);
    };

    if (window.cordova !== undefined) {
        document.addEventListener('deviceready', function() {
            this.boot();
        });
    } else {
        console.log('Cordova not found, booting Angular manually');
        this.boot();
    }
};

angular.element(document).ready(function() {
    new PhoneGapInit();
});
