'use strict';
/*global localStorage: false, angular: false */
/**
 * @ngdoc service
 * @name chickenbreadApp.user
 * @description
 * # user
 * Service in the chickenbreadApp.
 */
angular.module('chickenbreadApp')
    .service('user', function($http, error, config) {

        function hashCode(str) {
            var hash = 0,
                i, chr, len;
            if (str.length === 0) return hash;
            for (i = 0, len = str.length; i < len; i++) {
                chr = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        }

        return {
            login: function(username, password, callback) {
                $http.put(config.url + '/api/users', {
                        name: username,
                        password: hashCode(password)
                    })
                    .success(function(user) {
                        localStorage.setItem('user_id', user._id);
                        callback(user);
                    })
                    .error(function(e) {
                        error.log(e);
                    });
            },
            logout: function() {
                localStorage.removeItem('user_id');
            },
            createUser: function(username, password, callback) {
                $http.post(config.url + '/api/users', {
                        name: username,
                        password: hashCode(password)
                    })
                    .success(function(user) {
                        localStorage.setItem('user_id', user._id);
                        callback(user);
                    })
                    .error(function(e) {
                        error.log(e);
                    });
            },
            getId: function(callback) {
                callback(localStorage.getItem('user_id'));
            },
            getUserGames: function(callback) {
                $http.get(config.url + '/api/users/' + localStorage.getItem('user_id') + '/user_games')
                    .success(function(games) {
                        callback(games);
                    })
                    .error(function(e) {
                        error.log(e);
                    });
            },
            getReceivedGames: function(callback) {
                $http.get(config.url + '/api/users/' + localStorage.getItem('user_id') + '/received_games')
                    .success(function(games) {
                        callback(games);
                    })
                    .error(function(e) {
                        error.log(e);
                    });
            },
            getFriends: function(callback) {
                $http.get(config.url + '/api/users/' + localStorage.getItem('user_id') + '/friends')
                    .success(function(friends) {
                        callback(friends);
                    })
                    .error(function(e) {
                        error.log(e);
                    });
            },
            getUser: function(id, callback) {
                $http.get(config.url + '/api/users/' + id)
                    .success(function(user) {
                        callback(user);
                    })
                    .error(function(e) {
                        error.log(e);
                    });
            },
            searchUser: function(user_name, callback) {
                $http.put(config.url + '/api/users/' + user_name)
                    .success(function(users) {
                        callback(users);
                    })
                    .error(function(e) {
                        error.log(e);
                    });
            },
            addFriend: function(friend_id, callback) {
                $http.post(config.url + '/api/users/' + localStorage.getItem('user_id') + '/send_request', {
                        friend_id: friend_id
                    })
                    .success(function(user) {
                        callback(user);
                    })
                    .error(function(e) {
                        error.log(e);
                    });
            },
            acceptFriend: function(friend_id, callback) {
                $http.post(config.url + '/api/users/' + localStorage.getItem('user_id') + '/accept_request', {
                        friend_id: friend_id
                    })
                    .success(function(user) {
                        callback(user);
                    })
                    .error(function(e) {
                        error.log(e);
                    });
            },
            getRequests: function(callback) {
                $http.get(config.url + '/api/users/' + localStorage.getItem('user_id') + '/received_requests')
                    .success(function(requests) {
                        callback(requests);
                    })
                    .error(function(e) {
                        error.log(e);
                    });
            },
            sendGame: function(friend_id, game_id, callback) {
                $http.post(config.url + '/api/users/' + localStorage.getItem('user_id') + '/send_game', {
                        friend_id: friend_id,
                        game_id: game_id
                    })
                    .success(function() {
                        callback();
                    })
                    .error(function(e) {
                        error.log(e);
                    });
            },
        };
    });
