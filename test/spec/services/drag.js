'use strict';

describe('Service: drag', function () {

  // load the service's module
  beforeEach(module('chickenbreadApp'));

  // instantiate service
  var drag;
  beforeEach(inject(function (_drag_) {
    drag = _drag_;
  }));

  it('should do something', function () {
    expect(!!drag).toBe(true);
  });

});
