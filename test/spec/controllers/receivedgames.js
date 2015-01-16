'use strict';

describe('Controller: ReceivedgamesCtrl', function () {

  // load the controller's module
  beforeEach(module('chickenbreadApp'));

  var ReceivedgamesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReceivedgamesCtrl = $controller('ReceivedgamesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
