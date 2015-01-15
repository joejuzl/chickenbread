'use strict';

/**
 * @ngdoc service
 * @name chickenbreadApp.user
 * @description
 * # user
 * Service in the chickenbreadApp.
 */
angular.module('chickenbreadApp')
    .service('user', function($http, $cookies, error, config) {

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
                        $cookies.user_id = user._id;
                        callback(user);
                    })
                    .error(function(e) {
                        error.log(e);
                    });
            },
            createUser: function(username, password, callback) {
                $http.post(config.url + '/api/users', {
                        name: username,
                        password: hashCode(password)
                    })
                    .success(function(user) {
                        $cookies.user_id = user._id;
                        callback(user);
                    })
                    .error(function(e) {
                        error.log(e);
                    });
            },
            getId: function(callback) {
                callback($cookies.user_id);
            },
            getUserGames: function(callback) {
                $http.get(config.url + '/api/users/' + $cookies.user_id + '/user_games')
                    .success(function(games) {
                        callback(games);
                    })
                    .error(function(e) {
                        error.log(e);
                    });
            },
            getFriends: function(callback) {
                $http.get(config.url + '/api/users/' + $cookies.user_id + '/friends')
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
                $http.post(config.url + '/api/users/' + $cookies.user_id + '/send_request', {
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
                $http.post(config.url + '/api/users/' + $cookies.user_id + '/accept_request', {
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
                $http.get(config.url + '/api/users/' + $cookies.user_id + '/received_requests')
                    .success(function(requests) {
                        callback(requests);
                    })
                    .error(function(e) {
                        error.log(e);
                    });
            },
        };
    });
