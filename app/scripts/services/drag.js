'use strict';

/**
 * @ngdoc service
 * @name chickenbreadApp.drag
 * @description
 * # drag
 * Factory in the chickenbreadApp.
 */
angular.module('chickenbreadApp')
  .factory('drag', function() {
    var onDragClass = 'image-on-drag';
    var offDragClass = 'image-off-drag';
    var imageClass = offDragClass;

    return {
      onDragBegin: function() {
        imageClass = onDragClass;
      },
      onDragEnd: function() {
        imageClass = offDragClass;
      },
      getImageClass: function() {
        return imageClass;
      }
    };
  });
