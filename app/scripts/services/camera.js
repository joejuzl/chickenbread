'use strict';

/**
 * @ngdoc service
 * @name chickenbreadApp.camera
 * @description
 * # camera
 * Service in the chickenbreadApp.
 */
angular.module('chickenbreadApp')
    .factory('camera', ['$q', function($q) {
        var Camera = navigator.camera;



        var getPicture = function(options) {
            var q = $q.defer();
            Camera.getPicture(function(result) {
                // Do any magic you need
                q.resolve(result);
            }, function(err) {
                q.reject(err);
            }, options);

            return q.promise;
        };
        return {
            takePicture: function() {
                var options = {
                    sourceType: Camera.PictureSourceType.CAMERA,
                    destinationType: Camera.DestinationType.DATA_URL
                };
                return getPicture(options);
            },
            selectPicture: function() {
                var options = {
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    destinationType: Camera.DestinationType.DATA_URL
                };
                return getPicture(options);
            }

        };
    }]);
