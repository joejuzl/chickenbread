'use strict';

/**
 * @ngdoc service
 * @name chickenbreadApp.game
 * @description
 * # game
 * Factory in the chickenbreadApp.
 */
angular.module('chickenbreadApp')
  .factory('game', function($q, $timeout, asset) {
    var getResult = function(side) {
      var left = side === 'left' ? true : false;
      if (isLeft === left) {
        resultMessage = winMessage;
      } else {
        resultMessage = loseMessage;
      }
    };
    var resetGame = function() {
      resultMessage = '';
    };
    var newGame = function(){
      var nextGame = asset.getNextGame();
      currentAsset= nextGame.imagePath;
      leftType = nextGame.item1;
      rightType = nextGame.item2;
      isLeft = nextGame.isLeft;
    };

    var isLeft ;
    var winMessage = 'You Win!';
    var loseMessage = 'You Lose!';
    var leftType;
    var rightType;
    var resultMessage = '';
    var currentAsset;

    newGame();

    return {
      resolveGame: function(side) {
        var defer = $q.defer();
        getResult(side);
        newGame();
        $timeout(function() {
          resetGame();
          defer.resolve();
        }, 2000);
        return defer.promise;
      },
      nextGame: newGame,
      getResultMessage: function() {
        return resultMessage;
      },
      getLeftType: function() {
        return leftType;
      },
      getRightType: function() {
        return rightType;
      },
      getCurrentAsset: function() {
        return currentAsset;
      }
    };
  });
