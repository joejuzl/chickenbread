'use strict';

/**
 * @ngdoc service
 * @name chickenbreadApp.asset
 * @description
 * # asset
 * Factory in the chickenbreadApp.
 */
angular.module('chickenbreadApp')
    .factory('asset', function($http, config) {

        var gamesArray;
        if (localStorage.games !== undefined) {
            gamesArray = JSON.parse(localStorage.games);
        } else {
            console.log('reset local storage');
            gamesArray = [];
            localStorage.games = JSON.stringify(gamesArray);
        }
        var index = 0;






        return {
            submitGame: function(item1, item2, imagePath, isLeft) {
                gamesArray.push({
                    item1: item1,
                    item2: item2,
                    imagePath: imagePath,
                    isLeft: isLeft
                });
                localStorage.games = JSON.stringify(gamesArray);
            },
            getNextGame: function() {
                var nextGame = gamesArray[index];
                index = (index + 1) % gamesArray.length;
                return nextGame;
            },
            testApi: function() {
                return $http.post(config.url + '/api/games', {
                    item1: 'hello',
                    item2: 'wagwan',
                    imageUrl: 'ohdear'
                });
            }
        };
    });
