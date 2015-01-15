'use strict';

describe('Controller: FriendlistCtrl', function () {

  // load the controller's module
  beforeEach(module('chickenbreadApp'));

  var FriendlistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FriendlistCtrl = $controller('FriendlistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
