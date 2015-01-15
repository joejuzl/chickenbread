'use strict';

describe('Controller: UsersearchCtrl', function () {

  // load the controller's module
  beforeEach(module('chickenbreadApp'));

  var UsersearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsersearchCtrl = $controller('UsersearchCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
