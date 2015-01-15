'use strict';

/**
 * @ngdoc service
 * @name chickenbreadApp.error
 * @description
 * # error
 * Service in the chickenbreadApp.
 */
angular.module('chickenbreadApp')
  .service('error', function () {
    	return{
    		log: function(msg){
    			console.log(msg);
    		}
    	};
  });
