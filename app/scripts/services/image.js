'use strict';

/**
 * @ngdoc service
 * @name chickenbreadApp.imageUpload
 * @description
 * # imageUpload
 * Service in the chickenbreadApp.
 */
angular.module('chickenbreadApp')
    .service('image', function($http, config, error, user) {
        return {
            //add game for user, return all users games
            upload: function(data, callback) {
                user.getId(function(id) {
                    $http.post(config.url + '/api/image', {
                            imageUrl: data
                        })
                        .success(function(imageUrl) {
                            callback(imageUrl);
                        })
                        .error(function(e) {
                            error.log(e);
                        });
                });
            }
        };
    });