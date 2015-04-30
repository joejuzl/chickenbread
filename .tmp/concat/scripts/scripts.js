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
  'ngTouch',
  'ionic.contrib.ui.tinderCards'
]).config([
  '$urlRouterProvider',
  '$stateProvider',
  function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('start', {
      url: '/',
      templateUrl: '',
      controller: 'StartCtrl'
    }).state('welcome', {
      url: '/welcome',
      templateUrl: 'views/welcome.html',
      controller: 'WelcomeCtrl'
    }).state('home', {
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
      abstract: true,
      url: '/create',
      templateUrl: 'views/create.html',
      controller: 'CreateCtrl'
    }).state('create.imagetype', {
      url: '/imagetype',
      templateUrl: 'views/create-imagetype.html'
    }).state('create.submiturl', {
      url: '/submiturl',
      templateUrl: 'views/create-submiturl.html'
    }).state('create.viewimage', {
      url: '/viewimage',
      templateUrl: 'views/create-viewimage.html'
    }).state('create.is', {
      url: '/is',
      templateUrl: 'views/create-is.html'
    }).state('create.aint', {
      url: '/aint',
      templateUrl: 'views/create-aint.html'
    }).state('create.submit', {
      url: '/submit',
      templateUrl: 'views/create-submit.html'
    }).state('mygames', {
      url: '/mygames',
      templateUrl: 'views/mygames.html',
      controller: 'MygamesCtrl'
    }).state('receivedgames', {
      url: '/receivedgames',
      templateUrl: 'views/receivedgames.html',
      controller: 'ReceivedgamesCtrl'
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
    }).state('myfriends', {
      url: '/myfriends',
      templateUrl: 'views/myfriends.html',
      controller: 'MyfriendsCtrl'
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
    }).state('send', {
      url: '/send/:game_id',
      templateUrl: 'views/send.html',
      controller: 'SendCtrl'
    }).state('test', {
      url: '/test',
      templateUrl: 'views/play.html',
      controller: 'TestCtrl'
    });
  }
]).constant('config', { 'url': 'http://10.22.153.176:8080' }).config([
  '$compileProvider',
  function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);
  }
]);
var PhoneGapInit = function () {
  this.boot = function () {
    angular.bootstrap(document, ['chickenbreadApp']);
  };
  if (window.cordova !== undefined) {
    document.addEventListener('deviceready', function () {
      this.boot();
    });
  } else {
    console.log('Cordova not found, booting Angular manually');
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
        user.getId(function (id) {
          $http.post(config.url + '/api/games', {
            imageUrl: url,
            correctItem: is,
            incorrectItem: not,
            user_id: id
          }).success(function (games) {
            callback(games);
          }).error(function (e) {
            error.log(e);
          });
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
/*global localStorage: false, angular: false */
/**
 * @ngdoc service
 * @name chickenbreadApp.user
 * @description
 * # user
 * Service in the chickenbreadApp.
 */
angular.module('chickenbreadApp').service('user', [
  '$http',
  'error',
  'config',
  function ($http, error, config) {
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
          localStorage.setItem('user_id', user._id);
          callback(user);
        }).error(function (e) {
          error.log(e);
        });
      },
      logout: function () {
        localStorage.removeItem('user_id');
      },
      createUser: function (username, password, callback) {
        $http.post(config.url + '/api/users', {
          name: username,
          password: hashCode(password)
        }).success(function (user) {
          localStorage.setItem('user_id', user._id);
          callback(user);
        }).error(function (e) {
          error.log(e);
        });
      },
      getId: function (callback) {
        callback(localStorage.getItem('user_id'));
      },
      getUserGames: function (callback) {
        $http.get(config.url + '/api/users/' + localStorage.getItem('user_id') + '/user_games').success(function (games) {
          callback(games);
        }).error(function (e) {
          error.log(e);
        });
      },
      getReceivedGames: function (callback) {
        $http.get(config.url + '/api/users/' + localStorage.getItem('user_id') + '/received_games').success(function (games) {
          callback(games);
        }).error(function (e) {
          error.log(e);
        });
      },
      getFriends: function (callback) {
        $http.get(config.url + '/api/users/' + localStorage.getItem('user_id') + '/friends').success(function (friends) {
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
        $http.post(config.url + '/api/users/' + localStorage.getItem('user_id') + '/send_request', { friend_id: friend_id }).success(function (user) {
          callback(user);
        }).error(function (e) {
          error.log(e);
        });
      },
      acceptFriend: function (friend_id, callback) {
        $http.post(config.url + '/api/users/' + localStorage.getItem('user_id') + '/accept_request', { friend_id: friend_id }).success(function (user) {
          callback(user);
        }).error(function (e) {
          error.log(e);
        });
      },
      getRequests: function (callback) {
        $http.get(config.url + '/api/users/' + localStorage.getItem('user_id') + '/received_requests').success(function (requests) {
          callback(requests);
        }).error(function (e) {
          error.log(e);
        });
      },
      sendGame: function (friend_id, game_id, callback) {
        $http.post(config.url + '/api/users/' + localStorage.getItem('user_id') + '/send_game', {
          friend_id: friend_id,
          game_id: game_id
        }).success(function () {
          callback();
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
  '$location',
  '$state',
  '$timeout',
  'game',
  'camera',
  'error',
  'image',
  function ($scope, $location, $state, $timeout, game, camera, error, image) {
    $scope.image = {
      url: null,
      is: null,
      aint: null
    };
    $state.go('create.imagetype');
    $scope.takePhoto = function () {
      camera.takePicture().then(function (imageData) {
        uploadImage(imageData);
      }, function (err) {
        error.log(err);
      });
    };
    $scope.selectPhoto = function () {
      camera.selectPicture().then(function (imageData) {
        uploadImage(imageData);
      }, function (err) {
        error.log(err);
      });
    };
    var uploadImage = function (imageData) {
      image.upload(imageData, function (imageUrl) {
        $scope.imageUrl = imageUrl;
        $state.go('create.viewimage');
      });
    };
    $scope.confirmImage = function () {
      $state.go('create.is');
    };
    $scope.submitGame = function () {
      game.addGame($scope.image.url, $scope.image.is, $scope.image.aint, function (games) {
        console.log(games);
        if (!games.error) {
          $location.path('/mygames');
        } else {
          $scope.message = games.error;
        }
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
angular.module('chickenbreadApp').controller('MygamesCtrl', [
  '$scope',
  'user',
  'game',
  function ($scope, user, game) {
    user.getUserGames(function (gameIds) {
      var games = gameIds;
      $scope.games = [];
      $scope.showButtons = [];
      games.forEach(function (id) {
        game.getGame(id, function (g) {
          $scope.games.push(g);
          $scope.showButtons.push(false);
        });
      });
    });
    $scope.onClick = function (index) {
      $scope.showButtons.map(function (a, i, ar) {
        ar[i] = false;
      });
      $scope.showButtons[index] = true;
    };
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
  function ($scope) {
  }
]);
'use strict';
/*global console: false, angular: false */
/**
 * @ngdoc function
 * @name chickenbreadApp.controller:PlayCtrl
 * @description
 * # PlayCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp').controller('PlayCtrl', [
  '$scope',
  '$stateParams',
  'game',
  function ($scope, $stateParams, game) {
    var id = $stateParams.game_id;
    game.getGame(id, function (game) {
      $scope.game = game;
      $scope.games = [];
      $scope.games.push($scope.game);
    });
    $scope.cardSwipedLeft = function (index) {
      console.log('left');
    };
    $scope.cardSwipedRight = function (index) {
      console.log('right');
    };
    $scope.cardDestroyed = function (index) {
      console.log('destroyed');
    };
    $scope.cardPartialSwipe = function (index) {
    };
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
  'user',
  function ($scope, $location, user) {
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
  function ($scope) {
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
angular.module('chickenbreadApp').controller('MyfriendsCtrl', [
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
'use strict';
/**
 * @ngdoc function
 * @name chickenbreadApp.controller:WelcomeCtrl
 * @description
 * # WelcomeCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp').controller('WelcomeCtrl', [
  '$scope',
  'user',
  function ($scope, user) {
    user.logout();
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name chickenbreadApp.controller:StartCtrl
 * @description
 * # StartCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp').controller('StartCtrl', [
  '$scope',
  '$location',
  'user',
  function ($scope, $location, user) {
    user.getId(function (id) {
      if (id) {
        $location.path('/home');
      } else {
        $location.path('/welcome');
      }
    });
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name chickenbreadApp.controller:SendCtrl
 * @description
 * # SendCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp').controller('SendCtrl', [
  '$scope',
  '$stateParams',
  '$location',
  'user',
  function ($scope, $stateParams, $location, user) {
    var game_id = $stateParams.game_id;
    console.log(game_id);
    user.getFriends(function (friendIds) {
      var friends = friendIds;
      $scope.friends = [];
      $scope.showButtons = [];
      friends.forEach(function (id) {
        user.getUser(id, function (u) {
          $scope.friends.push(u);
          $scope.showButtons.push(false);
        });
      });
    });
    $scope.onClick = function (index, e) {
      $scope.hide(e);
      $scope.showButtons[index] = true;
    };
    $scope.hide = function (e) {
      $scope.showButtons.map(function (a, i, ar) {
        ar[i] = false;
      });
      e.stopPropagation();
    };
    $scope.send = function (index) {
      user.sendGame($scope.friends[index]._id, game_id, function () {
        $location.path('/mygames');
      });
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name chickenbreadApp.controller:ReceivedgamesCtrl
 * @description
 * # ReceivedgamesCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp').controller('ReceivedgamesCtrl', [
  '$scope',
  'user',
  'game',
  function ($scope, user, game) {
    user.getReceivedGames(function (gameIds) {
      var games = gameIds;
      $scope.games = [];
      $scope.showButtons = [];
      games.forEach(function (id) {
        game.getGame(id, function (g) {
          $scope.games.push(g);
          $scope.showButtons.push(false);
        });
      });
    });
    $scope.onClick = function (index) {
      $scope.showButtons.map(function (a, i, ar) {
        ar[i] = false;
      });
      $scope.showButtons[index] = true;
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name chickenbreadApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the chickenbreadApp
 */
angular.module('chickenbreadApp').controller('TestCtrl', [
  '$scope',
  function ($scope) {
    $scope.game1 = {
      correctItem: 'cat',
      incorrectItem: 'dog',
      imageUrl: 'http://i.huffpost.com/gen/964776/thumbs/o-CATS-KILL-BILLIONS-facebook.jpg'
    };
    $scope.game2 = {
      correctItem: 'chicken',
      incorrectItem: 'bread',
      imageUrl: 'http://news.ucdavis.edu/photos_images/news_images/03_2011/chicken_lg.jpg'
    };
    $scope.games = [];
    $scope.games.push($scope.game1);
    $scope.games.push($scope.game2);
    $scope.cardSwipedLeft = function (index) {
      console.log('left');
    };
    $scope.cardSwipedRight = function (index) {
      console.log('right');
    };
    $scope.cardDestroyed = function (index) {
      console.log('destroyed');
    };
    $scope.cardPartialSwipe = function (index) {
    };
  }
]);
'use strict';
/**
 * @ngdoc service
 * @name chickenbreadApp.camera
 * @description
 * # camera
 * Service in the chickenbreadApp.
 */
angular.module('chickenbreadApp').factory('camera', [
  '$q',
  function ($q) {
    var Camera = navigator.camera;
    var getPicture = function (options) {
      var q = $q.defer();
      Camera.getPicture(function (result) {
        // Do any magic you need
        q.resolve(result);
      }, function (err) {
        q.reject(err);
      }, options);
      return q.promise;
    };
    return {
      takePicture: function () {
        var options = {
            sourceType: Camera.PictureSourceType.CAMERA,
            destinationType: Camera.DestinationType.DATA_URL
          };
        return getPicture(options);
      },
      selectPicture: function () {
        var options = {
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: Camera.DestinationType.DATA_URL
          };
        return getPicture(options);
      }
    };
  }
]);
'use strict';
/**
 * @ngdoc service
 * @name chickenbreadApp.imageUpload
 * @description
 * # imageUpload
 * Service in the chickenbreadApp.
 */
angular.module('chickenbreadApp').service('image', [
  '$http',
  'config',
  'error',
  'user',
  function ($http, config, error, user) {
    return {
      upload: function (data, callback) {
        user.getId(function (id) {
          $http.post(config.url + '/api/image', { imageData: data }).success(function (imageUrl) {
            callback(imageUrl);
          }).error(function (e) {
            error.log(e);
          });
        });
      }
    };
  }
]);