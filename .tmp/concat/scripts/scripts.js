'use strict';
/**
 * @ngdoc overview
 * @name chickenbreadApp
 * @description
 * # chickenbreadApp
 *
 * Main module of the application.
 */
angular.module('chickenbreadApp', [
  'ionic',
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
]).config([
  '$urlRouterProvider',
  '$stateProvider',
  function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    }).state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    }).state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html',
      controller: 'SignupCtrl'
    }).state('create', {
      url: '/create',
      templateUrl: 'views/create.html',
      controller: 'CreateCtrl'
    }).state('gameslist', {
      url: '/gamelist',
      templateUrl: 'views/gamelist.html',
      controller: 'GamelistCtrl'
    }).state('play', {
      url: '/play/:game_id',
      templateUrl: 'views/play.html',
      controller: 'PlayCtrl'
    }).state('game', {
      url: '/game',
      templateUrl: 'views/game.html',
      controller: 'GameCtrl'
    }).state('friends', {
      url: '/friends',
      templateUrl: 'views/friends.html',
      controller: 'FriendsCtrl'
    }).state('friendlist', {
      url: '/friendlist',
      templateUrl: 'views/friendlist.html',
      controller: 'FriendlistCtrl'
    }).state('person', {
      url: '/person',
      templateUrl: 'views/person.html',
      controller: 'PersonCtrl'
    }).state('usersearch', {
      url: '/usersearch',
      templateUrl: 'views/usersearch.html',
      controller: 'UsersearchCtrl'
    }).state('requests', {
      url: '/requests',
      templateUrl: 'views/requests.html',
      controller: 'RequestsCtrl'
    });
  }
]).constant('config', { 'url': 'http://10.69.50.55:8080' });
var PhoneGapInit = function () {
  this.boot = function () {
    angular.bootstrap(document, ['chickenbreadApp']);
  };
  if (window.phonegap !== undefined) {
    document.addEventListener('deviceready', function () {
      this.boot();
    });
  } else {
    console.log('PhoneGap not found, booting Angular manually');
    this.boot();
  }
};
angular.element(document).ready(function () {
  new PhoneGapInit();
});
'use strict';
/**
 * @ngdoc function
 * @name chickenbreadApp.controller:LoginctrlCtrl
 * @description
 * # LoginctrlCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp').controller('LoginCtrl', [
  '$scope',
  '$location',
  'user',
  function ($scope, $location, user) {
    $scope.onClick = function () {
      user.login($scope.username, $scope.password, function (user) {
        if (!user.error) {
          $location.path('/home');
        }
      });
    };
  }
]);
'use strict';
/**
 * @ngdoc service
 * @name chickenbreadApp.error
 * @description
 * # error
 * Service in the chickenbreadApp.
 */
angular.module('chickenbreadApp').service('error', function () {
  return {
    log: function (msg) {
      console.log(msg);
    }
  };
});
'use strict';
/**
 * @ngdoc service
 * @name chickenbreadApp.game
 * @description
 * # game
 * Service in the chickenbreadApp.
 */
angular.module('chickenbreadApp').service('game', [
  '$http',
  'config',
  'error',
  'user',
  function ($http, config, error, user) {
    return {
      addGame: function (url, is, not, callback) {
        $http.post(config.url + '/api/games', {
          imageUrl: url,
          correctItem: is,
          incorrectItem: not,
          user_id: user.getId()
        }).success(function (games) {
          callback(games);
        }).error(function (e) {
          error.log(e);
        });
      },
      getGame: function (id, callback) {
        $http.get(config.url + '/api/games/' + id).success(function (game) {
          callback(game);
        }).error(function (e) {
          error.log(e);
        });
      }
    };
  }
]);
'use strict';
/**
 * @ngdoc service
 * @name chickenbreadApp.user
 * @description
 * # user
 * Service in the chickenbreadApp.
 */
angular.module('chickenbreadApp').service('user', [
  '$http',
  '$cookies',
  'error',
  'config',
  function ($http, $cookies, error, config) {
    function hashCode(str) {
      var hash = 0, i, chr, len;
      if (str.length === 0)
        return hash;
      for (i = 0, len = str.length; i < len; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;  // Convert to 32bit integer
      }
      return hash;
    }
    return {
      login: function (username, password, callback) {
        $http.put(config.url + '/api/users', {
          name: username,
          password: hashCode(password)
        }).success(function (user) {
          $cookies.user_id = user._id;
          callback(user);
        }).error(function (e) {
          error.log(e);
        });
      },
      createUser: function (username, password, callback) {
        $http.post(config.url + '/api/users', {
          name: username,
          password: hashCode(password)
        }).success(function (user) {
          $cookies.user_id = user._id;
          callback(user);
        }).error(function (e) {
          error.log(e);
        });
      },
      getId: function (callback) {
        callback($cookies.user_id);
      },
      getUserGames: function (callback) {
        $http.get(config.url + '/api/users/' + $cookies.user_id + '/user_games').success(function (games) {
          callback(games);
        }).error(function (e) {
          error.log(e);
        });
      },
      getFriends: function (callback) {
        $http.get(config.url + '/api/users/' + $cookies.user_id + '/friends').success(function (friends) {
          callback(friends);
        }).error(function (e) {
          error.log(e);
        });
      },
      getUser: function (id, callback) {
        $http.get(config.url + '/api/users/' + id).success(function (user) {
          callback(user);
        }).error(function (e) {
          error.log(e);
        });
      },
      searchUser: function (user_name, callback) {
        $http.put(config.url + '/api/users/' + user_name).success(function (users) {
          callback(users);
        }).error(function (e) {
          error.log(e);
        });
      },
      addFriend: function (friend_id, callback) {
        $http.post(config.url + '/api/users/' + $cookies.user_id + '/send_request', { friend_id: friend_id }).success(function (user) {
          callback(user);
        }).error(function (e) {
          error.log(e);
        });
      },
      acceptFriend: function (friend_id, callback) {
        $http.post(config.url + '/api/users/' + $cookies.user_id + '/accept_request', { friend_id: friend_id }).success(function (user) {
          callback(user);
        }).error(function (e) {
          error.log(e);
        });
      },
      getRequests: function (callback) {
        $http.get(config.url + '/api/users/' + $cookies.user_id + '/received_requests').success(function (requests) {
          callback(requests);
        }).error(function (e) {
          error.log(e);
        });
      }
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name chickenbreadApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp').controller('SignupCtrl', [
  '$scope',
  '$location',
  'user',
  function ($scope, $location, user) {
    $scope.onClick = function () {
      user.createUser($scope.username, $scope.password, function (user) {
        console.log(user);
        if (!user.error) {
          $location.path('/home');
        } else {
          $scope.message = user.error;
        }
      });
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name chickenbreadApp.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp').controller('CreateCtrl', [
  '$scope',
  'game',
  function ($scope, game) {
    $scope.onClick = function () {
      game.addGame($scope.url, $scope.is, $scope.not, function (games) {
        console.log(games);
      });
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name chickenbreadApp.controller:GamelistCtrl
 * @description
 * # GamelistCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp').controller('GamelistCtrl', [
  '$scope',
  'user',
  'game',
  function ($scope, user, game) {
    user.getUserGames(function (gameIds) {
      var games = gameIds;
      $scope.games = [];
      games.forEach(function (id) {
        game.getGame(id, function (g) {
          $scope.games.push(g);
        });
      });
    });
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name chickenbreadApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp').controller('GameCtrl', [
  '$scope',
  '$location',
  function ($scope, $location) {
    $scope.changeView = function (page) {
      $location.path('/' + page);
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name chickenbreadApp.controller:PlayCtrl
 * @description
 * # PlayCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp').controller('PlayCtrl', [
  '$scope',
  'game',
  '$routeParams',
  function ($scope, game, $routeParams) {
    $scope.game = null;  // game.getGame($routeParams.game_id, function(g){
                         // 	$scope.game = g;
                         // });
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name chickenbreadApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp').controller('HomeCtrl', [
  '$scope',
  '$location',
  function ($scope, $location) {
    $scope.changeView = function (page) {
      $location.path('/' + page);
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name chickenbreadApp.controller:FriendsCtrl
 * @description
 * # FriendsCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp').controller('FriendsCtrl', [
  '$scope',
  '$location',
  function ($scope, $location) {
    $scope.changeView = function (page) {
      $location.path('/' + page);
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name chickenbreadApp.controller:FriendlistCtrl
 * @description
 * # FriendlistCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp').controller('FriendlistCtrl', [
  '$scope',
  'user',
  function ($scope, user) {
    user.getFriends(function (friendIds) {
      var friends = friendIds;
      $scope.friends = [];
      friends.forEach(function (id) {
        user.getUser(id, function (u) {
          $scope.friends.push(u);
        });
      });
    });
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name chickenbreadApp.controller:PersonCtrl
 * @description
 * # PersonCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp').controller('PersonCtrl', [
  '$scope',
  function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name chickenbreadApp.controller:UsersearchCtrl
 * @description
 * # UsersearchCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp').controller('UsersearchCtrl', [
  '$scope',
  '$location',
  '$timeout',
  'user',
  function ($scope, $location, $timeout, user) {
    var id;
    $scope.search = function () {
      //make dynamic search as text is input?
      user.searchUser($scope.username, function (result) {
        if (!result.error) {
          id = result._id;
          $scope.msg = result.name;
          $scope.showAddButton = true;
        } else {
          $scope.msg = result.error;
        }
      });
    };
    $scope.addFriend = function () {
      $scope.showAddButton = false;
      $scope.msg = 'request sent';
      user.addFriend(id, function () {
        $timeout(function () {
          $location.path('/friends');
        }, 500);
      });
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name chickenbreadApp.controller:RequestsCtrl
 * @description
 * # RequestsCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp').controller('RequestsCtrl', [
  '$scope',
  '$timeout',
  'user',
  function ($scope, $timeout, user) {
    user.getRequests(function (requestIds) {
      console.log(requestIds);
      var requests = requestIds;
      $scope.requests = [];
      requests.forEach(function (id) {
        user.getUser(id, function (u) {
          $scope.requests.push(u);
        });
      });
    });
    $scope.accept = function (index) {
      var id = $scope.requests[index]._id;
      $scope.requests[index].name = 'accepted';
      user.acceptFriend(id, function () {
        $timeout(function () {
          $scope.requests.splice(index, 1);
        }, 500);
      });
    };
  }
]);