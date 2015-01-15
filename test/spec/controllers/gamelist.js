'use strict';

describe('Controller: GamelistCtrl', function () {

  // load the controller's module
  beforeEach(module('chickenbreadApp'));

  var GamelistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GamelistCtrl = $controller('GamelistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
